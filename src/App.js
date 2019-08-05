import React, { Component } from 'react';
import { Consumer } from './context'
import { CSSTransition } from 'react-transition-group'
import './App.css';

import Landing from './component/Landing';
import SVGFill from './component/SVGFill';
import { Provider } from './context'
import MainApp from './component/MainApp'

class App extends Component {

  state = {
    wave: null,
    main_active: true
  }

  waveLoaded = (wave) => {
    this.setState({ wave: wave })
  }

  toggleMain = () => {
    this.state.wave.reverse();
    this.state.wave.play();
    this.setState(state => ({ main_active: !state.main_active }))
  }

  render() {
    return (
      <Provider>
        <div className="App">
          {/*<Landing wave={this.state.wave} toggleMain={this.toggleMain} />
          <SVGFill waveLoaded={this.waveLoaded} />*/}
          <Consumer>
            {value => {
              if (value.member_list.length) return (
                <CSSTransition
                  classNames="main_app-fade"
                  in={this.state.main_active}
                  timeout={1300}
                  mountOnEnter
                >
                  <MainApp toggleMain={this.toggleMain} wave={this.state.wave} />
                </CSSTransition>
              )
              else return null

            }}
          </Consumer>

        </div>
      </Provider>
    );
  }
}

export default App;
