import React from 'react'

import '../shared/formStyles.css';
import EmailInput from '../shared/EmailInput';
import UserInput from  '../shared/UserInput';
import PasswordInput from '../shared/PasswordInput';
import PhoneInput from '../shared/PhoneInput';
import DateInput from '../shared/DateInput';
import RegistrationFooter from './RegistrationFooter';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({
    username: '',
    email : '', 
    password: '',
    phone: '',
    dateOfBirth: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    console.log('Updated userData:', userData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log('Submitting userData:', userData);
  
      await axios.post('http://52.91.166.31:8080/api/registration', userData);
      
      setUserData({
        username: '',
        email: '',
        password: '',
        phone: '',
        dateOfBirth: '',
      });
      navigate('/login');
    } catch (error) {
      console.error('Error submitting registration:', error);
    }
  };



  return (
    <form onSubmit={handleSubmit} className="sign-up" autoComplete="off">
        <h4>
        <span>Registration</span>
        </h4>
        <UserInput name = "username" value={userData.username} onChange={handleInputChange}/>
        <DateInput  name = "dateOfBirth" value={userData.dateOfBirth} onChange={handleInputChange}/>
        <PhoneInput  name = "phone" value={userData.phone} onChange={handleInputChange}/>
        <EmailInput  name = "email" value={userData.email} onChange={handleInputChange}/>
        <PasswordInput  name = "password" value={userData.password} onChange={handleInputChange}/>
        <RegistrationFooter/>
    
    </form>
  )
}

export default RegistrationForm

