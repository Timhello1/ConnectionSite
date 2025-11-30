'use client';

import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import CustomScrollbar from '../scrollbar/CustomScrollbar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDrawerClose = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Header sidebarOpen={sidebarOpen} onToggle={handleDrawerToggle} />
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden', mt: '64px' }}>
        <Sidebar
          open={sidebarOpen}
          onToggle={handleDrawerToggle}
          onClose={handleDrawerClose}
          variant={isMobile ? 'temporary' : 'persistent'}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { 
              xs: '100%',
              md: sidebarOpen ? 'calc(100% - 280px)' : 'calc(100% - 64px)',
            },
            ml: { 
              xs: 0,
              md: sidebarOpen ? '280px' : '64px',
            },
            transition: 'all 0.3s ease',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CustomScrollbar>
            <Box sx={{ p: 3 }}>
              {children}
            </Box>
          </CustomScrollbar>
        </Box>
      </Box>
    </Box>
  );
}