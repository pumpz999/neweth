import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper, Alert, Stepper, Step, StepLabel } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useCreateNFTMutation } from '../store/api';

interface NFTForm {
  name: string;
  description: string;
  chain: 'ETH' | 'BNB';
  file: FileList;
  quantity: number;
}

export default function NFTStudio() {
  const { control, handleSubmit, watch } = useForm<NFTForm>();
  const [createNFT, { isLoading, isSuccess }] = useCreateNFTMutation();
  const [error, setError] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const chain = watch('chain');

  const steps = [
    'NFT Details',
    'Upload Media',
    'Review & Mint'
  ];

  const onSubmit = async (data: NFTForm) => {
    try {
      await createNFT(data).unwrap();
      setError(null);
      setActiveStep(0);
    } catch (err) {
      setError('Failed to create NFT');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        NFT Studio
      </Typography>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper sx={{ p: 3 }}>
        {activeStep === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="NFT Name"
                    fullWidth
                    variant="outlined"
                    helperText="Enter NFT name"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={4}
                    helperText="Enter NFT description"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={() => setActiveStep(1)}
                sx={{ mt: 2 }}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        )}

        {activeStep === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="file"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="file"
                    fullWidth
                    variant="outlined"
                    inputProps={{ accept: 'image/*,video/*' }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                onClick={() => setActiveStep(0)}
                sx={{ mr: 2, mt: 2 }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={() => setActiveStep(2)}
                sx={{ mt: 2 }}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        )}

        {activeStep === 2 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Review Details
              </Typography>
              <Typography variant="body1">
                Chain: {chain}
              </Typography>
              <Typography variant="body1">
                Fee: 0.3 {chain}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                onClick={() => setActiveStep(1)}
                sx={{ mr: 2, mt: 2 }}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading}
                sx={{ mt: 2 }}
              >
                Mint NFT
              </Button>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Box>
  );
}
