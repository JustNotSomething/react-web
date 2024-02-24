import React from 'react'
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom'; 


const UserBlock = ({user,  onUpdateUsers, avatars}) => {
const navigate = useNavigate();


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
  
      onUpdateUsers();
      
    } catch (error) {
      console.error('Error saving user:', error);
    }
};


const handleAddClick = () => {
    
  
    addFriend(user.id);
};



  return (
    <div className='some-user-block'>
       
    <div className='icon-block'>
        <div className='small-icon-block'>
        {avatars.find((avatar) => avatar.id === user.id) ? (
            <img
              src={`data:image/png;base64,${avatars.find((avatar) => avatar.id === user.id).avatar}`}
              alt={`Avatar of ${user.username}`}
            />
          ) : (
            <img src="/img/profile-test-img.png" alt="Fallback Avatar" />
          )}

    </div>
    </div>
    <div className='username-search-block'>
           {user.username}
    </div>
    <div className='email-search-block'>
            {user.email}
    </div>
    
    <div className='null-empty-div'></div>

    <button className="bookmarkBtn" onClick={handleAddClick}>
    <span className="IconContainer"> 
        <svg viewBox="0 0 384 512" height="0.9em" className="icon-w"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path></svg>
    </span>
    <p className="text-p">Add</p>
    </button>

    </div>
  )
}

export default UserBlock
