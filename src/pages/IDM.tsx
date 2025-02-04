import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Fingerprint, ShieldCheck, UserPlus, UserCheck } from 'lucide-react';

export default function IDM() {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Create Identity',
      description: 'Create new blockchain-based identity on ETH or BNB chain',
      icon: <UserPlus size={32} />,
      path: '/idm/create'
    },
    {
      title: 'Verified Templates',
      description: 'Choose from 100+ pre-verified identity templates',
      icon: <ShieldCheck size={32} />,
      path: '/idm/templates'
    },
    {
      title: 'My Identities',
      description: 'Manage your existing blockchain identities',
      icon: <UserCheck size={32} />,
      path: '/idm/my-identities'
    }
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom>
        Identity Management
      </Typography>
      
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s'
                }
              }}
              onClick={() => navigate(feature.path)}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {feature.icon}
                  <Typography variant="h5" sx={{ ml: 2 }}>
                    {feature.title}
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
