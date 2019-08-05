import React, { Component } from 'react';
import { Transition } from 'react-transition-group';

import '../static/MainApp.css'

import SearchBar from './SearchBar'
import ProfileContainer from './ProfileContainer'
import CategoryTray from './CategoryTray'
import FullProfile from './FullProfile'
import { Consumer } from '../context'

class MainApp extends Component {
  render() {
    return (
      <div className="MainApp main_app">
        <SearchBar />
        <ProfileContainer />
        <CategoryTray />
        <Consumer>
          {value => (
            <Transition
              timeout={200}
              in={value.active_profile !== null}
              mountOnEnter
              unmountOnExit
            >
              {transitionState =>
                <FullProfile
                  profile={value.active_profile}
                  showProfile={value.showProfile}
                  transitionState={transitionState}
                />
              }
            </Transition>
          )
          }
        </Consumer>
      </div>
    );
  }
}

export default MainApp;
