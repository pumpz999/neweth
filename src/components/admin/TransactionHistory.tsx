import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { useGetTransactionsQuery } from '../../store/api';
import html2canvas from 'html2canvas';

export default function TransactionHistory() {
  const { data: transactions, isLoading, isError } = useGetTransactionsQuery();

  const handleScreenshot = () => {
    const element = document.getElementById('transaction-history');
    if (element) {
      html2canvas(element).then(canvas => {
        const link = document.createElement('a');
        link.download = 'transaction-history.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  return (
    <Box sx={{ p: 3 }} id="transaction-history">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Transaction History
        </Typography>
        <Button variant="contained" onClick={handleScreenshot}>
          Take Screenshot
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Currency</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Fee</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions?.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>{new Date(tx.timestamp).toLocaleString()}</TableCell>
                  <TableCell>{tx.type}</TableCell>
                  <TableCell>{tx.amount}</TableCell>
                  <TableCell>{tx.currency}</TableCell>
                  <TableCell>{tx.status}</TableCell>
                  <TableCell>{tx.fee}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
