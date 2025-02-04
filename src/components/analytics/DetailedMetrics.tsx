import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
} from '@mui/material';
import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import html2canvas from 'html2canvas';

interface Transaction {
  id: string;
  type: 'purchase' | 'sale' | 'deployment';
  amount: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
  address: string;
  fee: string;
  chain: 'ETH' | 'BNB';
}

interface DetailedMetricsProps {
  transactions: Transaction[];
}

export function DetailedMetrics({ transactions }: DetailedMetricsProps) {
  const handleScreenshot = () => {
    const element = document.getElementById('detailed-metrics');
    if (element) {
      html2canvas(element).then(canvas => {
        const link = document.createElement('a');
        link.download = 'detailed-metrics.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  return (
    <Paper sx={{ p: 3, mt: 3 }} id="detailed-metrics">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Activity size={20} />
          Detailed Analytics
        </Typography>
        <Button variant="contained" onClick={handleScreenshot}>
          Take Screenshot
        </Button>
      </Box>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Fee</TableCell>
              <TableCell>Chain</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {tx.type === 'purchase' ? (
                      <ArrowUpRight className="text-green-500" size={16} />
                    ) : (
                      <ArrowDownRight className="text-red-500" size={16} />
                    )}
                    {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                  </Box>
                </TableCell>
                <TableCell>{tx.amount} {tx.chain}</TableCell>
                <TableCell>
                  <Chip
                    label={tx.status}
                    size="small"
                    color={
                      tx.status === 'completed'
                        ? 'success'
                        : tx.status === 'pending'
                        ? 'warning'
                        : 'error'
                    }
                  />
                </TableCell>
                <TableCell>{tx.timestamp}</TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    {tx.address.slice(0, 6)}...{tx.address.slice(-4)}
                  </Typography>
                </TableCell>
                <TableCell>{tx.fee} {tx.chain}</TableCell>
                <TableCell>
                  <Chip label={tx.chain} color={tx.chain === 'ETH' ? 'primary' : 'secondary'} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
