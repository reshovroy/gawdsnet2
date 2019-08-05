import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'

import '../static/FullProfile.css'

class FullProfile extends Component {

  state = {
    shrinked: false,
    scrolling: false,
    profile: null
  }

  onScroll = (e) => {
    if (window.innerWidth < 900) {
      const element = e.target;
      if (!this.state.scrolling) {
        this.setState({ scrolling: true })
        if (element.scrollTop > 0) {
          this.setState({ shrinked: true })
          element.scrollTop = 1;
          this.setState({ scrolling: false })
        }
        else {
          this.setState({ shrinked: false })
          this.setState({ scrolling: false })
        }
      }
    }

  }

  componentDidMount() {
    this.setState({ profile: this.props.profile })
  }

  render() {
    if (this.state.profile) {
      let { fname, lname, year, skills, category, about } = this.state.profile;
      return (
        <div className="FullProfile">
          <CSSTransition
            classNames="FullProfile_backdrop_anim"
            timeout={300}
            in={this.props.transitionState === 'entered'}
            mountOnEnter
            unmountOnExit
          >
            <div className="FullProfile_backdrop"></div>
          </CSSTransition>
          <CSSTransition
            classNames="FullProfile_card_anim"
            timeout={300}
            in={this.props.transitionState === 'entered'}
            mountOnEnter
            unmountOnExit
          >
            <div className="FullProfile_card">
              <div className={`FullProfile_banner ${this.state.shrinked ? 'shrinked' : ''}`}>
                <div className={`dev-category category category-${category}`}>{category}</div>
                <div className="FullProfile_image">
                  <div className="FullProfile_imageBox">
                    <img src={window.location.href + '/img/user-5.jpg'} alt="user-5" />
                  </div>
                </div>
                <div className="FullProfile_name">{fname + ' ' + lname}</div>
              </div>
              <div className="FullProfile_wrapper">
                <div className="FullProfile_content" onScroll={this.onScroll}>
                  <div className="FullProfile_social">
                    <div className="FullProfile_social_icon">
                      <svg style={{ fill: "#686262" }}>
                        <use xlinkHref={window.location.href + '/img/svg/github.svg#github'}></use>
                      </svg>
                    </div>
                    <div className="FullProfile_social_icon">
                      <svg style={{ fill: "#38BDF8" }}>
                        <use xlinkHref={window.location.href + '/img/svg/linkedin.svg#linkedin'}></use>
                      </svg>
                    </div>
                    <div className="FullProfile_social_icon">
                      <svg style={{ fill: "#669FD8" }}>
                        <use xlinkHref={window.location.href + '/img/svg/facebook.svg#facebook'}></use>
                      </svg>
                    </div>
                    <div className="FullProfile_social_icon">
                      <svg style={{ fill: "#CE4646" }}>
                        <use xlinkHref={window.location.href + '/img/svg/gmail.svg#gmail'}></use>
                      </svg>
                    </div>
                  </div>
                  <div className="FullProfile_profileData">
                    <div className="FullProfile_scrollTray">
                      <div className="FullProfile_skillbox">
                        <div className="FullProfile_skillHead">
                          <div className="skillset">Skillset</div>
                          <div className={`dev-category category category-${category}`}>{category}</div>
                        </div>
                        <div className="FullProfile_skillBody">
                          {
                            skills.map((skill, i) => <div key={i} className="FullProfile_skill">{skill}</div>)
                          }
                        </div>
                      </div>
                      <div className="FullProfile_skillbox">
                        <div className="FullProfile_skillHead">
                          <div className="skillset">About Me</div>
                        </div>
                        <div className="FullProfile_aboutBody">
                          {about}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>

            </div>
          </CSSTransition>

          <div className="back_button" onClick={() => this.props.showProfile()}>
            <svg style={{ fill: "#7966FF" }}>
              <use xlinkHref={window.location.href + '/img/svg/back.svg#back'}></use>
            </svg>
          </div>
        </div>
      )
    }
    else return null;
  }
}


export default FullProfile;