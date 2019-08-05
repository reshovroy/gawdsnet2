import React, { Component } from 'react';

import '../static/ProfileContainer.css'

import { Consumer } from '../context'
import CardTray from './CardTray'

class ProfileContainer extends Component {
  render() {
    return (
      <div className="profile_container">
        <Consumer>
          {value =>
            Object.keys(value.active_list).map(m => (
              <CardTray
                key={m}
                year={m}
                members={value.active_list[m]}
              />
            ))
          }
        </Consumer>
      </div>
    );
  }
}

export default ProfileContainer;
