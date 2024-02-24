import React, { useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client, over } from 'stompjs';

function MyWebSocketComponent() {
  useEffect(() => {
    // Create a WebSocket connection using SockJS
    const socket = new SockJS('http://52.91.166.31:8080/websocket-endpoint');

    // Create a STOMP client over the WebSocket connection
    const stompClient = over(socket);

    // Connect to the WebSocket server
    stompClient.connect({}, () => {
      console.log('Connected to the WebSocket server');



      const testMessage = {
        content: 'Hello from the frontend!'
      };
      // Subscribe to a destination (e.g., a topic or queue)
     
      // Send a test message to the server
     

      stompClient.send('/app/my-endpoint', {}, JSON.stringify(testMessage));


      
      const subscription = stompClient.subscribe('/topic/my-topic', (message) => {
        console.log('Received message:', message.body);
      });


      // Clean up the connection when the component is unmounted
      return () => {
        stompClient.disconnect();
        console.log('Disconnected from the WebSocket server');
      };
    });
  }, []);

  return (
    <div>
      {/* JSX for your component */}
    </div>
  );
}

export default MyWebSocketComponent;
