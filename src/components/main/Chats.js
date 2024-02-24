import React from 'react'
import { useState, useEffect } from 'react';
import MinChat from './MinChat';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';


const Chats = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const senderUsername = jwtDecode(Cookies.get('jwtToken')).username;



  
    const handleSearchChange = (newValue) => {
        
        setSearchQuery(newValue);
      
        
        console.log(newValue);
      };
 

  return (
    <div className='chat-block'>
    <div className='chat-type-section'>
    <div className='section-icon'>
    
    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"  width="37" height="37">
    <path d="m9.499,24c.02,0-.02.002,0,0h0Zm9.501-13c1.654,0,3,1.346,3,3s-1.346,3-3,3-3-1.346-3-3,1.346-3,3-3Zm-2,3c0,1.103.897,2,2,2s2-.897,2-2-.897-2-2-2-2,.897-2,2Zm-15,0c0-1.654,1.346-3,3-3s3,1.346,3,3-1.346,3-3,3-3-1.346-3-3Zm1,0c0,1.103.897,2,2,2s2-.897,2-2-.897-2-2-2-2,.897-2,2Zm2,5C2.438,19,.291,20.91.003,23.444c-.031.274.166.522.44.553.267.032.522-.165.554-.44.229-2.027,1.951-3.556,4.003-3.556s3.773,1.529,4.003,3.556c.029.255.245.444.496.444.274-.031.529-.282.498-.556-.288-2.534-2.436-4.444-4.997-4.444Zm18.5,5c-.02.002.02,0,0,0h0Zm.497-.556c-.288-2.534-2.436-4.444-4.997-4.444s-4.709,1.91-4.997,4.444c-.031.274.166.522.44.553.272.032.521-.165.554-.44.229-2.027,1.951-3.556,4.003-3.556s3.773,1.529,4.003,3.556c.029.255.246.444.497.444.274-.031.528-.282.497-.556Zm-9.303-14.444l-2.02,1.746c-.19.169-.432.254-.673.254-.243,0-.487-.086-.682-.259l-1.977-1.741h-.344c-1.654,0-3-1.346-3-3v-3c0-1.654,1.346-3,3-3h6c1.654,0,3,1.346,3,3v3c0,1.654-1.346,3-3,3h-.306Zm-.187-1h.492c1.103,0,2-.897,2-2v-3c0-1.103-.897-2-2-2h-6c-1.103,0-2,.897-2,2v3c0,1.103.897,2,2,2h.532c.122,0,.239.044.33.125l2.12,1.868,2.198-1.871c.091-.078.207-.122.327-.122Z"/>
    </svg>

    </div>
    
    <div className='section-text'>
    <h2>{`${props.section}` }</h2> 
    
    <p className='chat-section-count'>
    {
        props.chats.length
    } Conversations
    </p> 
    
    </div>
    </div>

    <div className='search-chat-min'>
    <input className='search'
            type='text'
            placeholder='Search...'
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}/>
    </div>

    
    <div className='conversations-section'>
    {
      props.optionUsers.length !== 0
      ? props.chats
          .filter(chat => props.optionUsers.includes(chat.username))
          .filter((chat) => chat.username.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(chat => (
            <MinChat
              username={chat.username}
              key={chat.username}
              last_message={
                props.lastMessages.find(
                  message =>
                    (message.receiverUsername === chat.username && message.senderUsername === senderUsername) ||
                    (message.senderUsername === chat.username && message.receiverUsername === senderUsername)
                )
                  ? props.lastMessages.find(
                      message =>
                        (message.receiverUsername === chat.username && message.senderUsername === senderUsername) ||
                        (message.senderUsername === chat.username && message.receiverUsername === senderUsername)
                    ).message
                  : ''
              }
              not_read={chat.not_read}
              onChatSelect={props.onChatSelect}
              id={chat.id}
              chatAvatars={props.chatAvatars}
              sentAt={
                props.lastMessages.find(
                  message =>
                    (message.receiverUsername === chat.username && message.senderUsername === senderUsername) ||
                    (message.senderUsername === chat.username && message.receiverUsername === senderUsername)
                )
                  ? props.lastMessages.find(
                      message =>
                        (message.receiverUsername === chat.username && message.senderUsername === senderUsername) ||
                        (message.senderUsername === chat.username && message.receiverUsername === senderUsername)
                    ).sentAt
                  : ''

              }
            />
          ))
      : props.chats.filter((chat) => chat.username.toLowerCase().includes(searchQuery.toLowerCase())).map(chat => (
          <MinChat
            username={chat.username}
            key={chat.username}
            last_message={
              props.lastMessages.find(
                message =>
                  (message.receiverUsername === chat.username && message.senderUsername === senderUsername) ||
                  (message.senderUsername === chat.username && message.receiverUsername === senderUsername)
              )
                ? props.lastMessages.find(
                    message =>
                      (message.receiverUsername === chat.username && message.senderUsername === senderUsername) ||
                      (message.senderUsername === chat.username && message.receiverUsername === senderUsername)
                  ).message
                : ''
            }
            not_read={chat.not_read}
            onChatSelect={props.onChatSelect}
            id={chat.id}
            chatAvatars={props.chatAvatars}
            sentAt={
              props.lastMessages.find(
                message =>
                  (message.receiverUsername === chat.username && message.senderUsername === senderUsername) ||
                  (message.senderUsername === chat.username && message.receiverUsername === senderUsername)
              )
                ? props.lastMessages.find(
                    message =>
                      (message.receiverUsername === chat.username && message.senderUsername === senderUsername) ||
                      (message.senderUsername === chat.username && message.receiverUsername === senderUsername)
                  ).sentAt
                : ''
            }
          />
        ))
    
    }
    </div>
    
    </div>
  )
}

export default Chats
