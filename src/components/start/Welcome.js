import React from 'react'
import './welcome.css'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {
const navigate = useNavigate();
   const signInHandle = () =>
   {
        navigate('/login');
   }
   
   const signUpHandle = () =>
   {
        navigate('/registration');
   }


  return (
    <div className='main-welcome-container'>
    
    <div className='welcome-container'>
    <div className='background-image'/>
    
  
  </div>
  <div className='welcome-text-container'>
    <div className='welcome-text'>
    <h2 >Welcome!</h2>
    <p className='p-welcome-text'>Connect with friends and colleagues seamlessly, share messages, and stay in the loop with real-time updates. Start chatting now and make every conversation memorable!</p>
    </div>
    <div className='welcome-buttons-div'>

    
    <button className="sign-in-welcome-btn" onClick={signInHandle}>Sign in</button>
    <button className="sign-in-welcome-btn" onClick={signUpHandle}>Sign up</button>

    
  </div>
    </div>
</div>
  )
}

export default Welcome
