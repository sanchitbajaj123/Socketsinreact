import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your server URL

const App = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        // Listen for messages from the server
        socket.on('message', (data) => {
            console.log('Message from server:', data);
            setMessages((prev) => [...prev, data]);
        });

        // Listen for broadcast data
        socket.on('broadcastData', (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.disconnect(); // Clean up on unmount
        };
    }, [input]);

    const sendMessage = () => {
        socket.emit('sendData', input);
        setInput('');
    };

    return (
        <div>
            <h1>Socket.IO Chat</h1>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default App;
