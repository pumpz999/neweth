import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { useWallet } from '../../hooks/useWallet';
import { ethers } from 'ethers';
import { ChatContract } from '../../contracts/Chat';

const CHAT_ADDRESS = "0x...";

export function Chat({ listingId, userAddress }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { walletState } = useWallet();

  useEffect(() => {
    loadMessages();
  }, [listingId]);

  async function loadMessages() {
    if (!walletState.signer) return;
    
    const chat = new ChatContract(CHAT_ADDRESS, walletState.signer);
    const messages = await chat.getMessages(listingId);
    setMessages(messages);
  }

  async function sendMessage() {
    if (!newMessage.trim()) return;
    
    try {
      const chat = new ChatContract(CHAT_ADDRESS, walletState.signer);
      const tx = await chat.sendMessage(listingId, newMessage);
      await tx.wait();
      setNewMessage('');
      await loadMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  return (
    <div className="chat-container">
      <List className="messages-list">
        {messages.map((msg, i) => (
          <ListItem key={i}>
            <ListItemText
              primary={msg.sender === userAddress ? 'You' : msg.sender.slice(0, 6)}
              secondary={msg.content}
            />
          </ListItem>
        ))}
      </List>
      
      <div className="message-input">
        <TextField
          fullWidth
          variant="outlined"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button 
          variant="contained" 
          onClick={sendMessage}
          disabled={!walletState.isConnected}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
