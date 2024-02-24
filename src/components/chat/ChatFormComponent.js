import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';


const ChatFormComponent = (props) => {
  const [formValue, setFormValue] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [stompClient, setStompClient] = useState(null);



  const handleSubmit = (event) => {
    
    event.preventDefault();
    if (isConnected && formValue !== '') {
      const dataToSend = {
        senderUsername: jwtDecode(Cookies.get('jwtToken')).username,
        receiverUsername: props.receiverUsername,
        message: formValue,

      };

      props.setWebSocketConnected(true);

      stompClient.send(`/app/send-message/${props.receiverUsername}`, {}, JSON.stringify(dataToSend));

      const sM = {...dataToSend, type:"send"};
      
      props.setMessage(sM);
    }
    setFormValue('');
  };


  const setStatusOnline = async() =>
  {
    try {
      const token = Cookies.get('jwtToken');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
  
      const response = await fetch('http://52.91.166.31:8080/api/status/online', {
        method: 'POST',
        headers: headers,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error setting status online:', error);
    }
  };



  
  const setStatusOffline = async() =>
  {
    try {
      const token = Cookies.get('jwtToken');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
  
      const response = await fetch('http://52.91.166.31:8080/api/status/offline', {
        method: 'POST',
        headers: headers,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error setting status offline:', error);
    }
  };



  useEffect(() => {


    const socket = new SockJS('http://52.91.166.31:8080/websocket-endpoint');
    const stompClient = over(socket);
    setStompClient(stompClient);

    const onConnect = () => {
      console.log('Connected to WebSocket');
      setIsConnected(true);
      

      setStatusOnline();

      stompClient.subscribe(`/user/${jwtDecode(Cookies.get('jwtToken')).username}/message`, (message) => {
        const messageData = JSON.parse(message.body);

        const rM = {...messageData, type:"received"}
        props.setReceivedMessage(rM);
        console.log('Received message:',rM);
      
      });
    };

    const onDisconnect = () => {
      console.log('Disconnected from WebSocket');
      setIsConnected(false);
      props.setWebSocketConnected(false);
      props.receiverUsername = '';
      setStatusOffline();
    };

   
    stompClient.connect({}, onConnect, onDisconnect);

    return () => {
      
      if (isConnected) {
        stompClient.disconnect();
      }
    };
  }, [isConnected, props.receiverUsername]);

  
  return (
    <div className='chat-form-component'>
      <form className='send-message-form' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Type your message here...'
          className='send-message-input'
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <input type='submit' value='Send' className='sendBtn' />
      </form>
    </div>
  );
};

export default ChatFormComponent;
