import React from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { LifeBuoy, Mail, MessageSquare } from 'lucide-react';

export default function Support() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom>
        Support Center
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 4 }}>
        <Box>
          <Typography variant="h5" gutterBottom>
            <Mail size={24} style={{ marginRight: 8 }} />
            Contact Support
          </Typography>
          <form>
            <TextField
              fullWidth
              label="Your Email"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Subject"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Message"
              margin="normal"
              multiline
              rows={4}
              required
            />
            <Button 
              type="submit"
              variant="contained"
              sx={{ mt: 2 }}
            >
              Send Message
            </Button>
          </form>
        </Box>
        
        <Box>
          <Typography variant="h5" gutterBottom>
            <MessageSquare size={24} style={{ marginRight: 8 }} />
            Live Chat
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            Our support team is available 24/7 to assist you
          </Alert>
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
          >
            Start Live Chat
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
