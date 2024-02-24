import React from 'react'

const UserInput = ({name, value, onChange}) => {
  return (
   
      <div className="floating-label">
    <input
      placeholder="Username"
      type="text"
      name={name}
      id={name}
      autoComplete="off"
      className="input-form"
      value={value}
      onChange={onChange}
    />
    <label className='label-form' htmlFor={name}>Username:</label>
    <div className="icon">
  
      <svg xmlns="http://www.w3.org/2000/svg" id="Outline"  width="512" height="512"   xmlSpace="preserve">
        <path d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z"/>
        <path d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z"/>
      </svg>
    </div>
  </div>

  )
}

export default UserInput
