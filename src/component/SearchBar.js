import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'

import '../static/SearchBar.css';
import { Context } from '../context'

const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}


class SearchBar extends Component {
  static contextType = Context;
  constructor() {
    super()
    this.state = {
      search_active: false,
      search_tab: "member",
      search_val: "",
      matched_skills: [],
      matched_members: [],
      //search_result: [],
    }
    this.skill_list = {}
    this.searched_term = "";
  }


  componentDidMount() {
    const { member_list } = this.context;
    if (member_list) {
      member_list.forEach((member, i) => {
        member.skills.forEach((skill, j) => {
          let mySkill = skill.replace(/ /g, '_');
          if (this.skill_list[mySkill]) this.skill_list[mySkill].push(member);
          else {
            this.skill_list[mySkill] = [];
            this.skill_list[mySkill].push(member);
          }
        })
      });
    }
  }

  onChange = (e) => {
    const value = e.target.value;
    this.setState({ search_val: value })
    this.throttledSearch(value)
    //search
  }

  changeSearch = (value) => {
    //console.log(Date.now())
    const { member_list } = this.context;
    if (value.length) {

      let matched_members = [];
      member_list.forEach(member => {
        let name = member.fname + ' ' + member.lname;
        let index = name.toLowerCase().indexOf(value.toLowerCase())
        if (index !== -1) {
          let memObj = {
            memberData: member,
            index: index
          }
          matched_members.push(memObj);
        }
      })
      matched_members = matched_members.sort((a, b) => a.index - b.index);
      this.setState({ matched_members: matched_members })

      //first get the skill props
      let matched_skills = [];
      Object.keys(this.skill_list).forEach((skill) => {
        let index = skill.toLowerCase().indexOf(value.toLowerCase().replace(/ /g, '_'))
        if (index !== -1) {
          let skillObj = {
            skillName: skill,
            index: index
          }
          matched_skills.push(skillObj)
        }
      })
      matched_skills = matched_skills.sort((a, b) => a.index - b.index);
      this.setState({ matched_skills: matched_skills })
    }
  }

  throttledSearch = throttle(this.changeSearch, 300);

  onSubmit = (e = null, search_result = []) => {
    if (e) e.preventDefault()
    if (search_result.length === 0) {
      if (this.state.search_tab === 'member') {
        search_result = this.state.matched_members.map(({ memberData }) => memberData);
      }
      else if (this.state.search_tab === 'skill') {
        this.state.matched_skills.forEach(({ skillName }) => {
          search_result.concat(this.skill_list[skillName])
        })
      }
      this.searched_term = this.state.search_val;
    }

    let result_years = {}
    search_result.forEach(member => {
      if (result_years[member.year]) result_years[member.year].push(member)
      else {
        result_years[member.year] = []
        result_years[member.year].push(member)
      }
    })
    this.context.searchUpdate(result_years);
    this.setState({ search_val: '', matched_skills: [], matched_members: [] })
    document.getElementsByClassName('SearchBar_input')[0].blur()
    document.getElementsByClassName('SearchBar_button')[0].blur()
    //document.getElementsByClassName('search_option').forEach(el => el.blur())
  }



  render() {

    let result_list = [];
    if (this.state.search_tab === 'member') {
      if (this.state.matched_members.length) {
        result_list = this.state.matched_members.map((member, i) => {

          let { index, memberData } = member;
          let { fname, lname, category } = memberData
          let name = fname + ' ' + lname;
          let search_length = this.state.search_val.length;
          let nameTag = (
            <span className="name">
              {name.substring(0, index)}<b>{name.substring(index, index + search_length)}</b>{name.substring(index + search_length)}
            </span>
          )
          return (
            <li
              className="people"
              key={i}
              onClick={() => {
                this.searched_term = memberData.fname + ' ' + memberData.lname;
                this.onSubmit(null, [memberData])
              }}
            >
              {nameTag}
              <span className={`skill skill-${category}`}>{category}</span>
            </li>
          )
        })
      }
      else {
        result_list = <li className="people"><span className="name">No members found</span></li>
      }
    }
    else {
      if (this.state.matched_skills.length) {
        result_list = this.state.matched_skills.map((skill, i) => {

          let { index, skillName } = skill;
          let search_length = this.state.search_val.length;
          skillName = skillName.replace(/_/g, ' ');
          let search_tag = (
            <span className="name">
              {skillName.substring(0, index)}<b>{skillName.substring(index, index + search_length)}</b>{skillName.substring(index + search_length)}
            </span>
          )

          return (
            <li
              className="people"
              key={i}
              onClick={() => {
                this.searched_term = skill.skillName;
                this.onSubmit(null, this.skill_list[skill.skillName])
              }}
            >
              {search_tag}
            </li>
          )
        })
      }
      else {
        result_list = <li className="people"><span className="name">No skills found</span></li>
      }
    }

    const results = (
      <CSSTransition
        classNames="overlay_fade"
        timeout={300}
        in={this.state.search_val.length > 0 && (this.state.matched_members.length > 0 || this.state.matched_skills.length > 0)}
        unmountOnExit
        mountOnEnter
      >
        <div className="SearchBar_result">
          <div className="SearchBar_overlay"  ></div>

          <div className="SearchBar_result_list">
            {
              (this.state.matched_members.length > 0 || this.state.matched_skills.length > 0) ? (
                <div className="SearchBar_people">
                  <div className="people_heading">
                    <div
                      className={`search_option ${(this.state.search_tab) === 'member' ? 'search_option_active' : ''}`}
                      id="search_people"
                      onClick={() => this.setState({ search_tab: 'member' })}
                    >members ({this.state.matched_members.length})</div>
                    <div
                      className={`search_option ${(this.state.search_tab) === 'skill' ? 'search_option_active' : ''}`}
                      id="search_skills"
                      onClick={() => this.setState({ search_tab: 'skill' })}
                    >skills ({this.state.matched_skills.length})</div>
                  </div>
                  <div className="people_list_box">
                    <ul className="people_list">
                      {result_list}
                    </ul>
                  </div>
                </div>

              ) : null
            }

          </div>
        </div>
      </CSSTransition>
    )

    return (
      <div className="SearchBar">
        {/*<div className="landpage_btn" onClick={this.props.toggleMain}></div>*/}
        <div className="SearchBar_gradient_box">
          <div className="SearchBar_gradient"></div>
        </div>

        <div className="SearchBar_form_container">

          <form className="SearchBar_form"
            onSubmit={this.onSubmit}
          >
            <input type="text"
              className="SearchBar_input"
              placeholder="Search Name, Skills"
              value={this.state.search_val}
              onChange={this.onChange}
            />
            <button type="submit" className="SearchBar_button"><div className="SearchBar_input_circle"></div></button>

          </form>

        </div>
        {results}
        <CSSTransition
          classNames="search_flip"
          in={this.context.active_tab === 'search'}
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
          <div className="SearchBar_term">Searched for " {this.searched_term} "</div>
        </CSSTransition>


      </div>
    )
  }
}

export default SearchBar;