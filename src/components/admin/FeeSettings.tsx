import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Paper, Alert, CircularProgress, TextField } from '@mui/material';
import { useGetFeesQuery, useUpdateFeesMutation } from '../../store/api';

export default function FeeSettings() {
  const { data: fees, isLoading, isError } = useGetFeesQuery();
  const [updateFees, { isLoading: isUpdating }] = useUpdateFeesMutation();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formValues, setFormValues] = useState({
    ethTokenFee: 0,
    ethNFTFee: 0,
    bnbTokenFee: 0,
    bnbNFTFee: 0,
    p2pFee: 0
  });

  useEffect(() => {
    if (fees) {
      setFormValues({
        ethTokenFee: fees.ethTokenFee,
        ethNFTFee: fees.ethNFTFee,
        bnbTokenFee: fees.bnbTokenFee,
        bnbNFTFee: fees.bnbNFTFee,
        p2pFee: fees.p2pFee
      });
    }
  }, [fees]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      await updateFees(formValues).unwrap();
      setError(null);
      setSuccess(true);
    } catch (err) {
      setError('Failed to update fees');
      setSuccess(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        999leads.com Fee Settings
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="ETH Token Fee (%)"
              name="ethTokenFee"
              value={formValues.ethTokenFee}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="ETH NFT Fee (%)"
              name="ethNFTFee"
              value={formValues.ethNFTFee}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="BNB Token Fee (%)"
              name="bnbTokenFee"
              value={formValues.bnbTokenFee}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="BNB NFT Fee (%)"
              name="bnbNFTFee"
              value={formValues.bnbNFTFee}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="P2P Trade Fee (%)"
              name="p2pFee"
              value={formValues.p2pFee}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={isUpdating}
            >
              Update Fees
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
