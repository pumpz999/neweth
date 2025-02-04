import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper, Alert, Tabs, Tab } from '@mui/material';
import { Settings as SettingsIcon, AccountBalanceWallet, Paid, History } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { useUpdateSettingsMutation } from '../store/api';
import { useTheme } from '@mui/material/styles';
import WalletManagement from '../components/admin/WalletManagement';
import FeeSettings from '../components/admin/FeeSettings';
import TransactionHistory from '../components/admin/TransactionHistory';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function Admin() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', height: '100vh' }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: 'divider', minWidth: 200 }}
      >
        <Tab label="Wallet Management" icon={<AccountBalanceWallet />} />
        <Tab label="Fee Settings" icon={<Paid />} />
        <Tab label="Transaction History" icon={<History />} />
      </Tabs>

      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <TabPanel value={value} index={0}>
          <WalletManagement />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FeeSettings />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TransactionHistory />
        </TabPanel>
      </Box>
    </Box>
  );
}
