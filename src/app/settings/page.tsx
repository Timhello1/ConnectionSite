'use client';

import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

export default function SettingsPage() {
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Paper sx={{ p: 4, height: '100%', borderRadius: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <SettingsIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h3" component="h1">
              Settings
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            This is a placeholder page for application settings. 
            Configuration options will be available here in the future.
          </Typography>
          <Divider sx={{ my: 3 }} />
          <List>
            <ListItem>
              <ListItemText
                primary="Theme & Appearance"
                secondary="Customize the look and feel of the application"
              />
            </ListItem>
          </List>
        </Paper>
    </Box>
  );
}

