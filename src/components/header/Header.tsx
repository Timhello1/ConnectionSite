'use client';

import { AppBar, Toolbar, Typography, IconButton, Button, Box, Avatar, Menu, MenuItem, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import LoginDialog from '../auth/LoginDialog';

interface HeaderProps {
  sidebarOpen?: boolean;
  onToggle?: () => void;
}

export default function Header({ sidebarOpen = true, onToggle }: HeaderProps) {
  const { user, logout } = useAuth();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [accountMenuAnchor, setAccountMenuAnchor] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleLogout = async () => {
    setAccountMenuAnchor(null);
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleProfileClick = () => {
    setAccountMenuAnchor(null);
    router.push('/profile');
  };

  const handleSettingsClick = () => {
    setAccountMenuAnchor(null);
    router.push('/settings');
  };

  return (
    <>
      <AppBar position="fixed" elevation={0}>
        <Toolbar sx={{ minHeight: { xs: 56 }, px: { xs: 1, sm: 2 } }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="toggle sidebar"
            onClick={onToggle}
            sx={{ mr: 1.5 }}
          >
            <MenuIcon sx={{ fontSize: 24 }} />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'inherit',
            }}
          >
            Connection Compendium
          </Typography>
          {user ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                color="inherit"
                onClick={(e) => setAccountMenuAnchor(e.currentTarget)}
                aria-label="account menu"
                sx={{
                  p: 0.75,
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.06)',
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: '#57534e',
                    color: '#fafaf9',
                  }}
                >
                  <AccountCircleIcon sx={{ fontSize: 22 }} />
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={accountMenuAnchor}
                open={Boolean(accountMenuAnchor)}
                onClose={() => setAccountMenuAnchor(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                slotProps={{
                  paper: {
                    sx: {
                      mt: 1.5,
                      minWidth: 160,
                      borderRadius: 1.5,
                      border: '1px solid',
                      borderColor: 'divider',
                    },
                  },
                }}
              >
                <MenuItem onClick={handleProfileClick}>
                  <ListItemIcon><AccountCircleIcon fontSize="small" /></ListItemIcon>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleSettingsClick}>
                  <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
                  Log out
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button
              color="inherit"
              variant="text"
              size="medium"
              startIcon={<LoginIcon sx={{ fontSize: 20 }} />}
              onClick={() => setLoginDialogOpen(true)}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.06)' },
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <LoginDialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
      />
    </>
  );
}