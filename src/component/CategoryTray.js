import React, { Component } from 'react';

import '../static/CategoryTray.css'
import { Consumer } from '../context'

class CategoryTray extends Component {
  state = {
    active: "all"
  }

  handleClick = (value, e) => {
    this.setState({ active: value })
  }

  render() {
    return (
      <Consumer>
        {value => {
          return (<div className="CategoryTray">
            <div className="CategoryTray_options">
              {
                ["all", "backend", "frontend", "graphics", "mobile"].map((el) => {
                  return (
                    <div key={el} value={el}
                      className={`CategoryTray_category ${(value.active_tab === el) ? 'active' : ''}`}
                      onClick={() => {
                        value.updateList(el)
                      }}
                    >
                      <div className="CategoryTray_image">
                        <svg>
                          <use xlinkHref={window.location.href + `/img/svg/${el}.svg#${el}`}></use>
                        </svg>
                      </div>
                      <div className="CategoryTray_name">{el}</div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          )
        }}
      </Consumer>
    );
  }
}

export default CategoryTray;
