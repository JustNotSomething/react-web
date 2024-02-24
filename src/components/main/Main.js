
import Chats from './Chats';
import ProfileBlock from './ProfileBlock';
import Chat from '../chat/Chat';
import './mainStyles.css'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';


import axios from 'axios';




const Main = () => {
  
  const[userId, setUserId] = useState('');
  const [username, setUsername] =  useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] =useState('');

  const [friendArray, setFriendArray] = useState([]);
  const [sectionsArray, setSectionsArray] = useState([]);
  const [userAvatar, setUserAvatar] = useState(null);
  const [friendAvatarsArray, setFriendAvatarsArray] = useState([]);


  const [lastMessage, setLastMessage] = useState([]);



  const getLastMessages = async () => {
    const token = Cookies.get('jwtToken');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch('http://52.91.166.31:8080/api/chats/getLastMessages', {
            method: 'GET',
            headers: headers,
        });  
          const jsonData = await response.json();    
          setLastMessage(jsonData);
      
    } catch (error) {
        console.error('Error:', error);
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


    const fetchUserChatSections = async () => {
      const token = Cookies.get('jwtToken');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      try {
        const response = await fetch('http://52.91.166.31:8080/api/sections', {
          method: 'GET',
          headers: headers,
        });

        const jsonData = await response.json();
        setSectionsArray(jsonData);
        console.log(sectionsArray);
      } catch (error) {
        console.error('Error:', error);
      }
    };


  const fetchUserProfile = async () => {
    const token = Cookies.get('jwtToken');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch('http://52.91.166.31:8080/api/profile', {
            method: 'GET',
            headers: headers,
        });

        if (response.ok) {
           
            const jsonData = await response.json();
            setUserId(jsonData.id);
            setUsername(jsonData.username);
            setEmail(jsonData.email);
            setPhone(jsonData.phone);
            setDateOfBirth(jsonData.dateOfBirth);

        } else {
            console.error('Failed to fetch user profile. Status:', response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};


const fetchUserFriendsAvatars = async () => {
  try {
    const token = Cookies.get('jwtToken');

    const response = await axios.get(`http://52.91.166.31:8080/api/chats/avatars`, {
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    });

    setFriendAvatarsArray(response.data);


  } catch (error) {
    console.error('Error fetching avatars:', error);
  }
  
};





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
        
     
  } catch (error) {
      console.error('Error:', error);
  }
  
};



    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleChatSelect = (username, user_id) => {

      setSelectedUser(username);
      setSelectedUserId(user_id);
    };


    const [optionTitle, setOptionTitle] = useState('All');
    const [optionUsers, setOptionUsers] = useState([]);

    const handleOptionTitleSelect = (title, users) => {

      setOptionTitle(title);
      setOptionUsers(users);
      console.log(optionUsers);
    };





    useEffect(() => {
      fetchUserProfile();
      fetchUserFriends();
      fetchUserChatSections();
      getUsersAvatar();
      fetchUserFriendsAvatars();
      getLastMessages();
    }, []);
    
    const updateUserFriends = () => {
      setSelectedUser(null);
      fetchUserFriends();
    };




  return (
  
    <div className="main-page-block">

      
      
    <ProfileBlock sectionsArray = {sectionsArray} getOptionTitle={handleOptionTitleSelect} username = {username} email={email} phone={phone} dateOfBirth={dateOfBirth} setOptionUsersAll={setOptionUsers} avatar={userAvatar}/>

    <Chats  chats={friendArray} section={optionTitle} onChatSelect={handleChatSelect} optionUsers={optionUsers} chatAvatars={friendAvatarsArray} lastMessages={lastMessage}/>

    <Chat chats={friendArray} status = {'online'} user = {selectedUser} user_id={selectedUserId} updateAfterRemoving={updateUserFriends} chatAvatars={friendAvatarsArray} getLastMessages={getLastMessages}/>
    </div>
 
  );
};
  

export default Main
