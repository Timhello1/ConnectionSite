'use client';

import { Typography, Box, Avatar, Paper } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../contexts/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Paper
        sx={{
          p: 4,
          height: '100%',
          borderRadius: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
        }}
      >
          <Avatar
            sx={{
              width: 120,
              height: 120,
              bgcolor: 'primary.light',
              color: 'primary.dark',
            }}
          >
            <AccountCircleIcon sx={{ fontSize: 80 }} />
          </Avatar>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Profile
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {user?.email || 'Not logged in'}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              This is a placeholder page for the user profile. 
              Profile customization and settings will be available here in the future.
            </Typography>
          </Box>
        </Paper>
    </Box>
  );
}

