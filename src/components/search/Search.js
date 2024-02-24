import React, { useState, useEffect } from 'react';
import SecondProfileBlock from '../main/SecondProfileBlock';
import './search.css';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import UserBlock from './UserBlock';
import axios from 'axios';


const Search = () => {
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [allUsers, setAllUsers] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [userAvatar, setUserAvatar] = useState(null);
  const [allAvatars, setAllAvatars] = useState([]);

  const handleSearchChange = (newValue) => {
    setSearchQuery(newValue);

  };


  const fetchAvatars = async() => {
    try {
      const token = Cookies.get('jwtToken');

      const response = await axios.get(`http://52.91.166.31:8080/api/getUsers/avatars`, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });
  
      setAllAvatars(response.data);
      console.log(response.data);

    } catch (error) {
      console.error('Error fetching avatars:', error);
    }
  }
  




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


  const fetchAllUsers = async () => {
    const token = Cookies.get('jwtToken');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch('http://52.91.166.31:8080/api/getUsers', {
        method: 'GET',
        headers: headers,
      });
      const jsonData = await response.json();

      setAllUsers(jsonData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    setUsername(jwtDecode(Cookies.get('jwtToken')).username);
    setEmail(jwtDecode(Cookies.get('jwtToken')).email);
    fetchAllUsers();
    getUsersAvatar();
    fetchAvatars();
  }, []);

  const updateUsersAfterAddFriend = () => {
    fetchAllUsers();
  };
  const filteredUsers = allUsers.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='search-main-block'>
      <SecondProfileBlock avatar={userAvatar}/>
      <div className='block-search-users'>
        <div className='block-search-input-controll'>
          <input
            className='search'
            type='text'
            placeholder='Search...'
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        
         
        <div className='all-users-block'>
        {filteredUsers.map((user) => (
            <UserBlock
              key={user.id}
              user={user}
              onUpdateUsers={updateUsersAfterAddFriend}
              avatars = {allAvatars}
            />
          ))}
        </div>
      </div>
    </div>
  
  );
};

export default Search;
