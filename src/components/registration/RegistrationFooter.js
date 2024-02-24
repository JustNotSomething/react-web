import React from 'react'
import { Link } from 'react-router-dom'
import ButtonForm from '../shared/ButtonForm'

const RegistrationFooter = () => {
  return (

    <div className='footer'>
        
    <ButtonForm text = {'Sign up'} />
    <Link to ='/login'  className='discrete' >
        Log in
   </Link>
    </div>
    
  )
}

export default RegistrationFooter
