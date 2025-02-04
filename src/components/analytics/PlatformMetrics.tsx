import React from 'react';
import { Box, Paper, Typography, Grid, Skeleton } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Users, FileCode, DollarSign } from 'lucide-react';
import { useTheme } from '@mui/material/styles';

interface PlatformMetricsProps {
  userStats?: {
    total: number;
    active: number;
    new: number;
  };
  templateStats?: {
    data: Array<{
      name: string;
      value: number;
      color: string;
    }>;
  };
  revenueStats?: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  loading?: boolean;
}

export function PlatformMetrics({
  userStats,
  templateStats,
  revenueStats,
  loading = false,
}: PlatformMetricsProps) {
  const theme = useTheme();

  const renderSkeleton = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Skeleton variant="rectangular" height={40} />
      <Skeleton variant="rectangular" height={40} />
      <Skeleton variant="rectangular" height={40} />
    </Box>
  );

  return (
    <Grid container spacing={3} sx={{ mt: 1 }}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3, height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Users size={20} />
            <Typography variant="h6">User Statistics</Typography>
          </Box>
          {loading ? renderSkeleton() : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Total Users
                </Typography>
                <Typography variant="h4">{userStats?.total ?? 0}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Active Users
                </Typography>
                <Typography variant="h5">{userStats?.active ?? 0}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  New Users (30d)
                </Typography>
                <Typography variant="h5">{userStats?.new ?? 0}</Typography>
              </Box>
            </Box>
          )}
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3, height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <FileCode size={20} />
            <Typography variant="h6">Template Distribution</Typography>
          </Box>
          {loading ? (
            <Skeleton variant="rectangular" height={200} />
          ) : (
            <Box sx={{ width: '100%', height: 200 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={templateStats?.data ?? []}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                  >
                    {templateStats?.data?.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: '4px',
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          )}
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3, height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <DollarSign size={20} />
            <Typography variant="h6">Revenue Overview</Typography>
          </Box>
          {loading ? renderSkeleton() : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Daily Revenue
                </Typography>
                <Typography variant="h4">${revenueStats?.daily ?? 0}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Weekly Revenue
                </Typography>
                <Typography variant="h5">${revenueStats?.weekly ?? 0}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Monthly Revenue
                </Typography>
                <Typography variant="h5">${revenueStats?.monthly ?? 0}</Typography>
              </Box>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
