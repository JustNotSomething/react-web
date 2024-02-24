import React from 'react'
import ThirdProfileBlock from '../main/ThirdProfileBlock';
import { useState, useEffect } from 'react';
import './adminStyles.css';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import AdminUserBlock from './AdminUserBlock';
import axios from 'axios';


const Admin = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [friendArray, setFriendArray] = useState([]);
  const [usersAvatarsArray, setUsersAvatarsArray] = useState([]);


  const handleSearchChange = (newValue) => {
    setSearchQuery(newValue);

  };

  const filteredUsers = allUsers.filter((user) =>
  user.username.toLowerCase().includes(searchQuery.toLowerCase())
);


  

const fetchUserFriends = async () => {
  const token = Cookies.get('jwtToken');
  const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
  };

  try {
      const response = await fetch('http://52.91.166.31:8080/api/chats', {
          method: 'GET',
          headers: headers,
      });  
        const jsonData = await response.json();    
       
        setFriendArray(jsonData)
        console.log(friendArray);
     
  } catch (error) {
      console.error('Error:', error);
  }
  
};



  const fetchAllUsers = async () => {
    const token = Cookies.get('jwtToken');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch('http://52.91.166.31:8080/api/getAllUsers', {
        method: 'GET',
        headers: headers,
      });
      const jsonData = await response.json();

      setAllUsers(jsonData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchAllUsersAvatars = async () => {
    try {
      const token = Cookies.get('jwtToken');
  
      const response = await axios.get(`http://52.91.166.31:8080/api/getAllUsers/avatars`, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });
  
      setUsersAvatarsArray(response.data);
  
  
    } catch (error) {
      console.error('Error fetching avatars:', error);
    }
    
  };
 


  useEffect( () => {
    fetchAllUsers();
    fetchUserFriends();
    fetchAllUsersAvatars();
  }, []);


  const updateUsersAfter = () => {
    fetchAllUsers();
    fetchUserFriends();
    fetchAllUsersAvatars();
  };


  return (
    <div className='main-admin-block'>
      <ThirdProfileBlock/>
      <div className='admin-div'>
      <h1 className='admin-header'>Admin</h1>
      <div className='block-search-input-controll'>
          <input
            className='search'
            type='text'
            placeholder='Search...'
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        <div className='admin-users-manage'>
        {filteredUsers.map((user) => (
          <AdminUserBlock key={user.id} id={user.id} username={user.username} email={user.email} dateOfBirth={user.dateOfBirth} phone={user.phone}  friendArray={friendArray} updateUsersAfter={updateUsersAfter} usersAvatarsArray={usersAvatarsArray}/>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Admin
