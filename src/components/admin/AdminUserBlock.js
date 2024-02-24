import React from 'react'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';



const AdminUserBlock = ({id, username, email, dateOfBirth, phone, friendArray, updateUsersAfter, usersAvatarsArray}) => {
const [formattedDate, setFormattedDate] = useState('');

const [isFriend, setIsFriend] = useState(false);


const addFriend = async(userId) => {
    const token = Cookies.get('jwtToken');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    try {
      const response = await fetch(`http://52.91.166.31:8080/api/saveUser/${userId}`, {
        method: 'POST',
        headers: headers,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      updateUsersAfter();
      
    } catch (error) {
      console.error('Error saving user:', error);
    }
};


const handleAddClick = () => {
    
  
    addFriend(id);
  
};

 
const deleteFriend = async(userId) => {
    const token = Cookies.get('jwtToken');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    try {
      const response = await fetch(`http://52.91.166.31:8080/api/deleteUser/${userId}`, {
        method: 'POST',
        headers: headers,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
     
      updateUsersAfter();
     
    } catch (error) {
      console.error('Error deleting friend:', error);
    }
};



const handleRemoveClick = () => {
    
  
    deleteFriend(id);
  
};



const deleteUser = async(userId) => {
    const token = Cookies.get('jwtToken');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    try {
      const response = await fetch(`http://52.91.166.31:8080/api/deleteUserAccount/${userId}`, {
        method: 'POST',
        headers: headers,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
     
      updateUsersAfter();
     
    } catch (error) {
      console.error('Error deleting user:', error);
    }
};


const handleDeleteClick = () => {
    
  
    deleteUser(id);
  
};




const changeUserRole = async(userId) => {
    const token = Cookies.get('jwtToken');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    try {
      const response = await fetch(`http://52.91.166.31:8080/api/changeUserRole/${userId}`, {
        method: 'POST',
        headers: headers,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
     
      updateUsersAfter();
     
    } catch (error) {
      console.error('Error role changing:', error);
    }
};


const handleRoleClick = () =>
{

    changeUserRole(id);
}



useEffect(() =>{
    const date = new Date(dateOfBirth);

    const options = {day: '2-digit', month:'2-digit', year:'numeric'};

    const formattedDateString = date.toLocaleDateString('en-GB', options);

    setFormattedDate(formattedDateString);


    setIsFriend(friendArray.some((friend) => friend.id === id));

}, [dateOfBirth, friendArray, id]);


  return (
    <div className='user-card-profile-container'>
      <div className='user-role-indicator'>
        USER
      </div>
        <div className='user-card-avatar'>


        {usersAvatarsArray.find((avatar) => avatar.id === id) ? (
            <img
              src={`data:image/png;base64,${usersAvatarsArray.find((avatar) => avatar.id === id).avatar}`}
              alt={`Avatar of ${username}` } className='avatar-card-img'
            />
          ) : (
            <img src="/img/profile-test-img.png" alt="Fallback Avatar"  className='avatar-card-img'/>
          )}


        </div>
        <div className='user-card-info'>
            <h2 className='user-card-name'>
                {username}
            </h2>
            <span className='user-card-detail'>
                {email}
            </span>
            <span className='user-card-detail'>      
                {formattedDate}
            </span>
            <span className='user-card-detail'>{phone}</span>
        </div>
        <div className='user-card-btn-div'>
          
        {isFriend ? (
          <button className='user-card-btn1' onClick={handleRemoveClick}>Remove</button>
        ) : (
          <button className='user-card-btn1' onClick={handleAddClick}>
            Add
          </button>
        )}
            <button className='user-card-btn2' onClick={handleRoleClick}>Role</button>
            <button className='user-card-btn3' onClick={handleDeleteClick}>Delete</button>            
        </div>
    </div>
  )
}

export default AdminUserBlock
