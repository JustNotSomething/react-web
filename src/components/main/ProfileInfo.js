import React from 'react'

const ProfileInfo = (props) => {
  return (
    <div className='profile-details-info'>
    <p>
        {props.username}
    </p>
    <p className='sm-text'>
        {props.email}
    </p>
  </div>
  )
}

export default ProfileInfo
