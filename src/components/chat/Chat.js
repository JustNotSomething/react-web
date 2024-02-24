import React, { useState, useEffect } from 'react';
import './chat_styles.css';
import ChatHeader from './ChatHeader';
import MessageSection from './MessageSection';
import ChatFormComponent from './ChatFormComponent';


const Chat = (props) => {
  const [message, setMessage] = useState([]);
  const [receivedMessage, setReceivedMessage] = useState([]);
  const [webSocketConnected, setWebSocketConnected] = useState(false);


  const handleFormSubmit = (formValue) => {
    setMessage(formValue);
  };







  return (
    <div className='main-chat-block'>
      {props.user !== null ? (
        <>
          <ChatHeader
            status={props.status}
            user={props.user}
            user_id={props.user_id}
            updateAfterRemoving={props.updateAfterRemoving}
            chatAvatars={props.chatAvatars}
            chats = {props.chats}
          />
          <MessageSection messageToShow={message} receivedMessageToShow={receivedMessage} receiverUsername={props.user} 
          webSocketConnected={webSocketConnected} getLastMessages={props.getLastMessages}
          
          />


          <ChatFormComponent onFormSubmit={handleFormSubmit} setMessage={setMessage} receiverUsername={props.user} setReceivedMessage={setReceivedMessage}
          setWebSocketConnected={setWebSocketConnected}
          />

         
        
        </>
      ) : (
        <></>
      )}
      <div> {props.someMsg}</div>
    </div>
  );
};

export default Chat;
