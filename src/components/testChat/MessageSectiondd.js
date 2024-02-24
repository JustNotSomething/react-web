import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const MessageSection = (props) => {
  const senderUsername = jwtDecode(Cookies.get('jwtToken')).username;
  const receiverUsername = props.receiverUsername;
  const [chatHistory, setChatHistory] = useState([]);
  const [loadedCombinations, setLoadedCombinations] = useState([]);
  const [newChatHistorySend, setNewChatHistorySend] = useState([]);
  const [newChatHistoryReceived, setNewChatHistoryReceived] = useState([]);
  const [newArr, setNewArr] = useState([]);



  
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const combinationKey = `${senderUsername}-${receiverUsername}`;
        // Check if the combination has already been loaded
        if (!loadedCombinations.includes(combinationKey)) {
          const response = await fetch(`http://52.91.166.31:8080/api/chats/loadHistory?senderUsername=${senderUsername}&receiverUsername=${receiverUsername}`);
          const data = await response.json();
          setChatHistory(data);

          // Mark the combination as loaded
          setLoadedCombinations(prev => [...prev, combinationKey]);
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
  }, [senderUsername, receiverUsername, loadedCombinations]);

  // useEffect(() => {
  //   const fetchChatHistory = async () => {
  //     try {
  //       // Check if the combination has already been loaded
  //       if (!loadedCombinations.includes(`${senderUsername}-${receiverUsername}`)) {
  //         const response = await fetch(`http://52.91.166.31:8080/api/chats/loadHistory?senderUsername=${senderUsername}&receiverUsername=${receiverUsername}`);
  //         const data = await response.json();
  //         setChatHistory(data);
          
  //         // Mark the combination as loaded
  //         setLoadedCombinations(prev => [...prev, `${senderUsername}-${receiverUsername}`]);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching chat history:', error);
  //     }
  //   };

  //   fetchChatHistory();

  // }, [senderUsername, receiverUsername, loadedCombinations]);


  const clearHis = () =>
  {
    setChatHistory([]);
  }


  const clearNewArr = () =>
  {
    setNewArr([]);
  }





  // useEffect(() => {
  //   if (props.receivedMessageToShow) {
  //     const msg = { ...props.receivedMessageToShow, time: new Date() };
  //     const message = Object.values(msg)
  //       .filter(value => typeof value === 'string' && value !== msg.type)
  //       .join('');
  
  //     const updatedMsg = { message, type: msg.type, time: msg.time};
  //     /////

  //     //console.log(updatedMsg);
  //     ///
  //     setNewChatHistoryReceived(prevReceived => [...prevReceived, updatedMsg]);
  //   }
  // }, [props.receivedMessageToShow]);
  


  // useEffect(() => {
  //   if (props.messageToShow) {
  //     const msg = { ...props.messageToShow, time: new Date() };
  //     const message = Object.values(msg)
  //       .filter(value => typeof value === 'string' && value !== msg.type)
  //       .join('');
  
  //     const updatedMsg = { message, type: msg.type, time: msg.time };
  //     setNewChatHistoryReceived(prevSent => [...prevSent, updatedMsg]);
  //   }
  // }, [props.messageToShow]);

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
  
    // Use a set to keep track of unique times
    const uniqueTimesSet = new Set();
  
    // Filter out duplicates based on the time property with a tolerance for milliseconds
    const uniqueArr = sortedArr.filter((message) => {
      const messageTime = message.time;
      const hasDuplicate = Array.from(uniqueTimesSet).some(
        (uniqueTime) => Math.abs(messageTime - uniqueTime) < 1000 // Adjust the tolerance as needed
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
        
          {message.receiverUsername === senderUsername ? (
            <div className='message-block-small' key={index}>
              <div className='message-side-one-min'>
              

                {message.message}</div>
            </div>
          ) : (
            <div className='message-block-small-right' key={index}>
              <div className='message-side-two-min'>
              {message.message}</div>
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
