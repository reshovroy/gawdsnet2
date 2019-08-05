import React, { Component } from 'react'

export const Context = React.createContext();

const filterList = (state, action) => {
  let { member_list, active_list, active_tab } = state;
  active_tab = action;
  active_list = Object.create({})
  member_list.forEach(member => {
    if (member.category === action || action === 'all') {
      if (active_list[member.year]) active_list[member.year].push(member)
      else {
        active_list[member.year] = []
        active_list[member.year].push(member)
      }
    }
  })
  return {
    ...state,
    active_tab,
    active_list
  }
}

/*const searchList = (state, term) => {
  let { active_list, member_list } = state;
  active_list = {}
  member_list.forEach(member => {
    let name = member.fname + ' ' + member.lname;
    if (term.toLowerCase() === name.toLowerCase()) {
      if (active_list[member.year]) active_list[member.year].push(member)
      else {
        active_list[member.year] = []
        active_list[member.year].push(member)
      }
    }
  })
  return {
    ...state,
    active_list
  }
}*/


export class Provider extends Component {

  state = {
    member_list: [],
    active_tab: "all",
    active_list: {},
    updateList: action => this.setState(state => filterList(state, action)),
    active_profile: null,
    showProfile: (profile = null) => this.setState(state => { return { ...state, active_profile: profile } }),
    searchUpdate: (result) => this.setState(state => {
      if (Object.keys(result).length === 0) return { state }
      return { ...state, active_list: result, active_tab: "search" }
    })
  }

  componentDidMount() {

    fetch(window.location.href + '/mock_data.json')
      .then(res => res.json())
      .then(data => {
        let year_data = {}
        data.members.forEach(member => {
          if (year_data[member.year]) {
            year_data[member.year].push(member)
          } else {
            year_data[member.year] = [];
            year_data[member.year].push(member)
          }
        })

        this.setState({ member_list: data.members, active_list: year_data });
      })
      .catch(err => console.log(err))

  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer;
