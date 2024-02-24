import React from 'react'
import Cookies from 'js-cookie';

const ChatHeader = (props) => {

 
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
  
     
      
      props.updateAfterRemoving();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
};


const handleAddClick = () => {
    deleteFriend(props.user_id);
};

  return (
    <div className='chat-type-section user-title-chat'>
    <div className='section-icon'>
    <div className='icon-block'>
        <div className='small-icon-block'>

        {props.chatAvatars.find((avatar) => avatar.id === props.user_id) ? (
            <img
              src={`data:image/png;base64,${props.chatAvatars.find((avatar) => avatar.id === props.user_id).avatar}`}
              alt={`Avatar of ${props.username}`}
            />
          ) : (
            <img src="/img/profile-test-img.png" alt="Fallback Avatar" />
          )}

    </div>
    </div>
    </div>
    <div className='section-text'>
        <h2>{props.user}</h2>
        <div className='user-satus-indicator'>
            
        <div style={props.chats.find((user) => (user.id === props.user_id)).is_online !== false ? {backgroundColor:'red'} : {backgroundColor : 'grey'}} 
        
        className='status-indicator'/>
       

          {
            props.chats.find((user) => (user.id === props.user_id)).is_online === false ? 
            <p  className='chat-section-count'>Offline</p> : <p  className='chat-section-count'>Online</p>
          }
          
         
        </div>
    </div>


<div className='btn-container-header'>
    <button className="custom-btn" onClick={handleAddClick}>
  <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" className="custom-icon">
    <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
  </svg>
</button>

</div>

  </div>
  )
}

export default ChatHeader
