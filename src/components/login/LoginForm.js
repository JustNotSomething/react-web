import React, { useEffect, useState } from 'react';
import PasswordInput from '../shared/PasswordInput';
import '../shared/formStyles.css';
import LoginFooter from './LoginFooter';
import UserInput from '../shared/UserInput';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (Cookies.get('jwtToken')) {
      if (jwtDecode(Cookies.get('jwtToken')).role === 'ROLE_ADMIN') {
        setAuth(false);
        navigate('/admin');
      } else {
        setAuth(false);
        navigate('/main');
      }
    } else {
      setAuth(true);
    }
  }, [navigate]);


  useEffect(() => {
      setAuth(false);
  }, []);



  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://52.91.166.31:8080/api/login', {
        username,
        password,
      });

      const token = response.data['jwt-token'];

      if (token) {
        Cookies.set('jwtToken', token);
        setUsername('');
        setPassword('');

        if (jwtDecode(token).role === 'ROLE_ADMIN') {
          navigate('/admin');
        } else {
          navigate('/main');
        }
      } else {
        console.error('Invalid credentials');
        setAuth(true);
      }
    } catch (error) {
      console.log('Authentication failed', error);
    }                                       
  };

  return (
    <form className="log-in" autoComplete="off" onSubmit={handleSubmit}>
      <h4>
        <span>Login in</span>
      </h4>
      <p>Welcome back! Log in to your account to start chatting again:</p>
      {auth && <div className='error-msg-div'><span>Invalid Credentials</span></div>}
      
      <UserInput onChange={handleUsernameChange} />
      <PasswordInput onChange={handlePasswordChange} />
      <LoginFooter />
    </form>
  );
};

export default LoginForm;
