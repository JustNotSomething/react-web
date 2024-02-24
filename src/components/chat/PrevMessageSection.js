import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const MessageSection = (props) => {
  const senderUsername = jwtDecode(Cookies.get('jwtToken')).username;
  const receiverUsername = props.receiverUsername;
  const [chatHistory, setChatHistory] = useState([]);
  const [newChatHistorySend, setNewChatHistorySend] = useState([]);
  const [newChatHistoryReceived, setNewChatHistoryReceived] = useState([]);
  const [newArr, setNewArr] = useState([]);



  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`http://52.91.166.31:8080/api/chats/loadHistory?senderUsername=${senderUsername}&receiverUsername=${receiverUsername}`);
        const data = await response.json();
        setChatHistory(data);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };
   
    fetchChatHistory();

  }, [senderUsername, receiverUsername]);

  useEffect(() => {
    if (props.messageToShow) {
      const msg = { ...props.messageToShow, time: new Date() };
     
      setNewChatHistorySend((prevSent) => [...prevSent, msg]);
    }
  }, [props.messageToShow]);

  useEffect(() => {
    if (props.receivedMessageToShow) {
      const msg = { ...props.receivedMessageToShow, time: new Date() };
     
      setNewChatHistoryReceived((prevReceived) => [...prevReceived, msg]);
    }
  }, [props.receivedMessageToShow]);


  useEffect(() => {
    const mergedArr = [...newChatHistoryReceived, ...newChatHistorySend];
    const sortedArr = mergedArr.sort((a, b) => new Date(a.time) - new Date(b.time));
  

    const uniqueTimesSet = new Set();
  

    const uniqueArr = sortedArr.filter((message) => {
      const messageTime = message.time;
      const hasDuplicate = Array.from(uniqueTimesSet).some(
        (uniqueTime) => Math.abs(messageTime - uniqueTime) < 1000 
      );
  
      if (!hasDuplicate) {
        uniqueTimesSet.add(messageTime);
        return true;
      }
      return false;
    });
    
    setNewArr(uniqueArr);
  }, [newChatHistoryReceived, newChatHistorySend]);
  
  return (
    <div className='message-section'>
      {chatHistory.map((message, index) => (
        <React.Fragment key={index}>
         {console.log("History loads")}
          {message.receiverUsername === senderUsername ? (
            <div className='message-block-small' key={index}>
              <div className='message-side-one-min'>{message.message}</div>
            </div>
          ) : (
            <div className='message-block-small-right' key={index}>
              <div className='message-side-two-min'>{message.message}</div>
            </div>
          )}
        </React.Fragment>
      ))}
 
{newArr.length > 0 && newArr.map((message, index) => ( 
      <React.Fragment key={index}>
            
        { message.type === 'received' ? (
          <div className='message-block-small' key={index}>
            
            {message.senderUsername === receiverUsername && message.message  && (
              <div className='message-side-one-min'>
                 
                {message.message}</div>
            )}
          </div>
        ) : ( 
          <div className='message-block-small-right' key={index}>
          
            {message.receiverUsername === receiverUsername && message.message && (
              <div className='message-side-two-min'>
                
                {message.message}</div>
            )}
          </div>
        )}
      </React.Fragment>
    ))}
    </div>
  );
};

export default MessageSection;
