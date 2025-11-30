'use client';

import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import CustomScrollbar from '../scrollbar/CustomScrollbar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Check if mobile after mount
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 960; // md breakpoint
      setIsMobile(isMobileView);
      setSidebarOpen(!isMobileView);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDrawerClose = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Render a simple placeholder during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <Header sidebarOpen={true} onToggle={handleDrawerToggle} />
        <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden', mt: '64px' }}>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              width: '100%',
              ml: 0,
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