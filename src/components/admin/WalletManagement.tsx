import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper, Alert } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useUpdateWalletsMutation } from '../../store/api';

interface WalletForm {
  wallet1: string;
  wallet2: string;
}

export default function WalletManagement() {
  const { control, handleSubmit } = useForm<WalletForm>();
  const [updateWallets, { isLoading, isSuccess }] = useUpdateWalletsMutation();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: WalletForm) => {
    try {
      await updateWallets(data).unwrap();
      setError(null);
    } catch (err) {
      setError('Failed to update wallets');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Wallet Management
      </Typography>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="wallet1"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Primary Wallet Address"
                    fullWidth
                    variant="outlined"
                    helperText="Will receive 70% of fees"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="wallet2"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Secondary Wallet Address"
                    fullWidth
                    variant="outlined"
                    helperText="Will receive 30% of fees"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{ mt: 2 }}
              >
                Save Wallets
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}
