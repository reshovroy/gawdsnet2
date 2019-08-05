import React, { Component } from 'react'

import '../static/Landing.css';

class Landing extends Component {

  toggleMain = (e) => {
    console.log("hello")
    if (this.props.wave) {
      this.props.toggleMain();
    }
  }

  render() {
    return (
      <div className="landing">
        <button onClick={this.toggleMain} style={{ zIndex: 400 }}>down</button>
      </div>
    )
  }
}

export default Landing;