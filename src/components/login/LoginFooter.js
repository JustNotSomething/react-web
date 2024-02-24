import React from 'react'
import { Link } from 'react-router-dom'
import ButtonForm from '../shared/ButtonForm'

const LoginFooter = () => {
  return (

    <div className='footer'>
        
    <ButtonForm text = {'Log in'} />

    <Link to ='/registration'  className='discrete' >
        Sign up
   </Link>
    </div>
    
  )
}

export default LoginFooter
