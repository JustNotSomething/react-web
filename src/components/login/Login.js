import React from 'react'
import LoginForm from './LoginForm'
import LoginImage from './LoginImage'


const Login = () => {


  return (
<div className='form-block' style={{ display: 'flex', alignItems: 'center' }}>
    <div className='login-center-block'> 
      
        <LoginImage/>
        <LoginForm/>
     </div>
    </div>
  )
}

export default Login
