import React, { useState, useEffect } from 'react';
import MenuProfile from './MenuProfile';
import ProfileIcon from './ProfileIcon';
import ProfileInfo from './ProfileInfo';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import './mainStyles.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const ThirdProfileBlock = () => {
    const navigate = useNavigate();
    const token = Cookies.get('jwtToken');
    const userName = jwtDecode(token).username;
    const email = jwtDecode(token).email;
    const [userAvatar, setUserAvatar] = useState(null);

    const getUsersAvatar = async() =>{
      try {
        const token = Cookies.get('jwtToken');
        const response = await axios.get('http://52.91.166.31:8080/api/file/get/avatar', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          responseType: 'arraybuffer',
        });
  
        console.log(response);
  
      if (response.status === 200)
      {
        const blob = new Blob([response.data]);
        setUserAvatar(URL.createObjectURL(blob));
      }
      else{
        setUserAvatar('/img/profile-test-img.png');
      }
  
      } catch (error) {
        setUserAvatar('/img/profile-test-img.png');
  
        console.error('Error:', error);
      }
    }


    useEffect(() => {
      getUsersAvatar();
    }, [])

    
  return (
      <div className="profile-block search-profile-block">
        <MenuProfile/>
        <div className='profile-details'>
          <ProfileIcon  avatar={userAvatar}/>
          <ProfileInfo username={userName} email={email}/>
        </div>

      </div>
    )
  }


export default ThirdProfileBlock
