import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper, Alert, Stepper, Step, StepLabel } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useCreateTokenMutation } from '../store/api';

interface TokenForm {
  name: string;
  symbol: string;
  supply: number;
  chain: 'ETH' | 'BNB';
  liquidity: number;
}

export default function TokenFactory() {
  const { control, handleSubmit, watch } = useForm<TokenForm>();
  const [createToken, { isLoading, isSuccess }] = useCreateTokenMutation();
  const [error, setError] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const chain = watch('chain');

  const steps = [
    'Token Details',
    'Liquidity Setup',
    'Review & Create'
  ];

  const onSubmit = async (data: TokenForm) => {
    try {
      await createToken(data).unwrap();
      setError(null);
      setActiveStep(0);
    } catch (err) {
      setError('Failed to create token');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Token Factory
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
                    label="Token Name"
                    fullWidth
                    variant="outlined"
                    helperText="Enter token name (3-20 characters)"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="symbol"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Token Symbol"
                    fullWidth
                    variant="outlined"
                    helperText="Enter token symbol (3-5 characters)"
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
            <Grid item xs={12} md={6}>
              <Controller
                name="supply"
                control={control}
                defaultValue={1000000}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Total Supply"
                    fullWidth
                    variant="outlined"
                    type="number"
                    helperText="Enter total token supply"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="liquidity"
                control={control}
                defaultValue={1}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={`Initial ${chain} Liquidity`}
                    fullWidth
                    variant="outlined"
                    type="number"
                    helperText={`Enter ${chain} amount for liquidity`}
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
                Fee: 0.5 {chain}
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
                Create Token
              </Button>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Box>
  );
}
