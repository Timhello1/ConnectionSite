'use client';

import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';

interface HeaderProps {
  sidebarOpen?: boolean;
  onToggle?: () => void;
}

export default function Header({ sidebarOpen = true, onToggle }: HeaderProps) {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: '100%',
        left: 0,
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="toggle sidebar"
          onClick={onToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Connection Compendium
        </Typography>
        <Button
          color="inherit"
          startIcon={<LoginIcon />}
          sx={{ ml: 2 }}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}