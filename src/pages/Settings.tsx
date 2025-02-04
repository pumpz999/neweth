import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper, Alert } from '@mui/material';
import { Save, Settings as SettingsIcon } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { useUpdateSettingsMutation } from '../store/api';
import { useTheme } from '@mui/material/styles';

interface SettingsForm {
  defiApiKey: string;
  dexApiKey: string;
  chainlinkApiKey: string;
  theGraphApiKey: string;
  ipfsApiKey: string;
  walletConnectProjectId: string;
}

export default function Settings() {
  const theme = useTheme();
  const { control, handleSubmit } = useForm<SettingsForm>();
  const [updateSettings, { isLoading, isSuccess }] = useUpdateSettingsMutation();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: SettingsForm) => {
    try {
      await updateSettings(data).unwrap();
      setError(null);
    } catch (err) {
      setError('Failed to update settings');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <SettingsIcon fontSize="large" />
        Platform Settings
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {isSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Settings updated successfully!
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="defiApiKey"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="DeFi API Key"
                    fullWidth
                    variant="outlined"
                    helperText="Required for DeFi integrations"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="dexApiKey"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="DEX API Key"
                    fullWidth
                    variant="outlined"
                    helperText="Required for DEX integrations"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="chainlinkApiKey"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Chainlink API Key"
                    fullWidth
                    variant="outlined"
                    helperText="Required for price feeds"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="theGraphApiKey"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="The Graph API Key"
                    fullWidth
                    variant="outlined"
                    helperText="Required for blockchain data indexing"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="ipfsApiKey"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="IPFS API Key"
                    fullWidth
                    variant="outlined"
                    helperText="Required for decentralized storage"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="walletConnectProjectId"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="WalletConnect Project ID"
                    fullWidth
                    variant="outlined"
                    helperText="Required for wallet connections"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<Save />}
                disabled={isLoading}
                sx={{ mt: 2 }}
              >
                Save Settings
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}
