import React from 'react'

const PasswordInput = ({name, value, onChange}) => {
  return (
    <div className="floating-label">
    <input
      placeholder="Password"
      type="password"
      name={name}
      id={name}
      
      className="input-form"
      value={value}
      onChange={onChange}
      autoComplete="new-password"
    />
    <label className='label-form' htmlFor={name}>Password:</label>
    <div className="icon">
     
      <svg
        enableBackground="new 0 0 24 24"
        version="1.1"
        viewBox="0 0 24 24"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: "\n\t.st0{fill:none;}\n\t.st1{fill:#010101;}\n"
          }}
        />
        <rect className="st0" width={24} height={24} />
        <path className="st1" d="M19,21H5V9h14V21z M6,20h12V10H6V20z" />
        <path
          className="st1"
          d="M16.5,10h-1V7c0-1.9-1.6-3.5-3.5-3.5S8.5,5.1,8.5,7v3h-1V7c0-2.5,2-4.5,4.5-4.5s4.5,2,4.5,4.5V10z"
        />
       
      </svg>
    </div>
  </div>
  )
}

export default PasswordInput


