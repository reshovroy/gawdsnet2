import React from 'react'

import '../static/ProfileCard.css'
import { Consumer } from '../context'

const ProfileCard = (props) => {
  return (
    <Consumer>
      {value => {
        const { fname, category } = props.member
        return (
          <div className="ProfileCard" onClick={() => value.showProfile(props.member)}>
            <div className="ProfileCard_data">
              <div className="ProfileCard_imgBox">
                <img src={window.location.href + '/img/user-5.jpg'} className="ProfileCard_img"></img>
              </div>
              <div className="ProfileCard_name">{fname}</div>
            </div>
            <div className={`ProfileCard_category category-${category}`}>{category}</div>
          </div>
        )
      }}

    </Consumer>
  )
}

export default ProfileCard;