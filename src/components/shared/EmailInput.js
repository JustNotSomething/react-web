

import React from 'react'

const EmailInput = ({name, value, onChange}) => {
  return (

     
    <div className="floating-label">
    <input
      placeholder="Email"
      type="email"
      name={name}
      id={name}
      autoComplete="off"
      className="input-form"
      value={value}
      onChange={onChange}
    />
    <label className='label-form' htmlFor={name}>Email:</label>
    <div className="icon">
     
      <svg
        enableBackground="new 0 0 100 100"
        version="1.1"
        viewBox="0 0 100 100"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style
          type="text/css"
          dangerouslySetInnerHTML={{ __html: "\n\t.st0{fill:none;}\n" }}
        />
        <g transform="translate(0 -952.36)">
          <path d="m17.5 977c-1.3 0-2.4 1.1-2.4 2.4v45.9c0 1.3 1.1 2.4 2.4 2.4h64.9c1.3 0 2.4-1.1 2.4-2.4v-45.9c0-1.3-1.1-2.4-2.4-2.4h-64.9zm2.4 4.8h60.2v1.2l-30.1 22-30.1-22v-1.2zm0 7l28.7 21c0.8 0.6 2 0.6 2.8 0l28.7-21v34.1h-60.2v-34.1z" />
        </g>
        <rect className="st0" width={100} height={100} />
      </svg>
    </div>



    </div>
      
  

  )
}

export default EmailInput
