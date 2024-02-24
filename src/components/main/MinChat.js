import React from 'react'

const MinChat = (props) => {
    const showChat = () => {
        props.onChatSelect(props.username, props.id);
      };

      const formatMessageTime = (timestamp) => {
        const options = {
          hour: 'numeric',
          minute: 'numeric',
        };
        const formattedTime = new Date(timestamp).toLocaleTimeString([], options);
        return formattedTime;
      };


  return (
    <div className='chat-min-block' onClick={showChat}>
        <div className='icon-block'>
            <div className='small-icon-block'>

            
            {props.chatAvatars.find((avatar) => avatar.id === props.id) ? (
            <img
              src={`data:image/png;base64,${props.chatAvatars.find((avatar) => avatar.id === props.id).avatar}`}
              alt={`Avatar of ${props.username}`}
            />
          ) : (
            <img src="/img/profile-test-img.png" alt="Fallback Avatar" />
          )}


        </div>
        </div>
        <div className='user-chat-min-info'>
            <p className='username-chat-min'>{props.username}</p>
            <p className='last-message-chat-min'>
            {
                props.last_message.length > 50 
                ? `${props.last_message.slice(0, 50)}...`
                : props.last_message
            }

            </p>
        </div>
        {
            props.not_read ? <div className='not-read-message-indicator'>
            314
            </div> : <div className='last-message-time'>
            {
              props.sentAt !== '' ?
              <span>{formatMessageTime(props.sentAt)}</span> : <></>
            }
            </div>
        }
      
    </div>
  )
}

export default MinChat
