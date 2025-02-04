import React from 'react';
import { Box, Grid, Paper, Typography, Button, useTheme } from '@mui/material';
import {
  BarChart,
  Activity,
  Users,
  DollarSign,
  FileCode,
  ShieldCheck,
  Zap,
  TrendingUp,
  MessageSquare,
  Coins,
  Image,
  Wallet,
  Smartphone,
  Database,
  Lock,
  Globe,
  Settings,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectWallet } from '../store/slices/walletSlice';

const services = [
  {
    title: 'Token Factory',
    description: 'Create ERC20/BEP20 tokens with automatic liquidity provision',
    icon: Coins,
    color: '#4ECDC4',
    path: '/token-factory',
    features: [
      'ETH/BNB token creation',
      'Custom tokenomics',
      'Automatic liquidity',
      'Fee: 0.5 ETH/BNB'
    ]
  },
  {
    title: 'NFT Studio',
    description: 'Create and publish NFTs directly to marketplaces',
    icon: Image,
    color: '#FF6B6B',
    path: '/nft-studio',
    features: [
      'ERC721/ERC1155 support',
      'Batch minting',
      'Marketplace publishing',
      'Fee: 0.3 ETH/BNB'
    ]
  },
  {
    title: 'DeFi Integrations',
    description: 'Access DEXs, lending, and yield farming',
    icon: Wallet,
    color: '#45B7D1',
    path: '/defi',
    features: [
      'Swap tokens',
      'Provide liquidity',
      'Yield farming',
      'No extra fees'
    ]
  },
  {
    title: 'Smart Contracts',
    description: 'Deploy pre-audited templates',
    icon: FileCode,
    color: '#96CEB4',
    path: '/templates',
    features: [
      '100+ verified templates',
      'Multi-chain support',
      'One-click deployment',
      'Fee: 0.1 ETH/BNB'
    ]
  },
  {
    title: 'Web3 Services',
    description: 'Access premium blockchain tools',
    icon: Smartphone,
    color: '#FFD166',
    path: '/services',
    features: [
      'IPFS storage',
      'ENS management',
      'Multichain bridges',
      'Fee: 0.05 ETH/BNB'
    ]
  },
  {
    title: 'Analytics',
    description: 'Track platform metrics',
    icon: Database,
    color: '#6B5B95',
    path: '/analytics',
    features: [
      'Real-time stats',
      'Transaction history',
      'Revenue tracking',
      'Free'
    ]
  }
];

export default function Dashboard() {
  const theme = useTheme();
  const navigate = useNavigate();
  const wallet = useSelector(selectWallet);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <Box>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 2,
            background: 'linear-gradient(135deg, rgba(78,205,196,0.1), rgba(255,107,107,0.1))',
            backdropFilter: 'blur(10px)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
            Web3 Platform
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
            Your Gateway to Blockchain Development
          </Typography>
          {!wallet.isConnected && (
            <Button
              variant="contained"
              size="large"
              startIcon={<Zap />}
              onClick={() => {/* Connect wallet */}}
              sx={{
                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FF8585, #65E6DE)',
                },
              }}
            >
              Connect Wallet to Get Started
            </Button>
          )}
        </Box>
      </motion.div>

      {/* Services Grid */}
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Our Services
      </Typography>
      <Grid container spacing={3}>
        {services.map((service, index) => (
          <Grid item xs={12} md={4} key={service.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                scale={1.02}
                transitionSpeed={2000}
              >
                <Paper
                  sx={{
                    p: 3,
                    height: '100%',
                    cursor: 'pointer',
                    background: `linear-gradient(135deg, ${service.color}11, ${service.color}22)`,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: `0 8px 20px ${service.color}33`,
                    },
                  }}
                  onClick={() => navigate(service.path)}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${service.color}22, ${service.color}44)`,
                        color: service.color,
                      }}
                    >
                      <service.icon size={32} />
                    </Box>
                    <Typography variant="h5" gutterBottom>
                      {service.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {service.description}
                    </Typography>
                    <Box sx={{ textAlign: 'left', width: '100%', mt: 2 }}>
                      {service.features.map((feature, i) => (
                        <Box key={i} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                          <ShieldCheck size={16} color={service.color} />
                          <Typography variant="body2">{feature}</Typography>
                        </Box>
                      ))}
                    </Box>
                    <Button
                      variant="outlined"
                      sx={{
                        mt: 2,
                        color: service.color,
                        borderColor: service.color,
                        '&:hover': {
                          borderColor: service.color,
                          background: `${service.color}11`,
                        },
                      }}
                    >
                      Get Started
                    </Button>
                  </Box>
                </Paper>
              </Tilt>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
