import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import '../static/CardTray.css'

import ProfileCard from './ProfileCard';

class CardTray extends Component {
  componentDidUpdate() {
    document.getElementsByClassName('profile_container')[0].scrollTop = 0;
  }
  render() {
    return (
      <div className="CardTray">
        <div className="CardTray_container">
          <div className="CardTray_data">
            <div className="CardTray_batch">Batch</div>
            <div className="CardTray_year">{this.props.year}</div>
          </div>
        </div>
        <div className="CardTray_profileBlock">

          {
            <TransitionGroup className="CardTray_ScrollTray">
              {this.props.members.map((member, i) => (
                <CSSTransition
                  key={i}
                  classNames="profile_card_anim"
                  timeout={200}
                >
                  <ProfileCard member={member} onProfileClick={this.props.onProfileClick} />
                </CSSTransition>
              )
              )}
            </TransitionGroup>

          }

        </div>
      </div>
    );
  }
}

export default CardTray;
