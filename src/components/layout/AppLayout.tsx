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
  // Match the client structure exactly
  if (!mounted) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <Header sidebarOpen={true} onToggle={handleDrawerToggle} />
        <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden', mt: '64px', gap: 0 }}>
          <Sidebar
            open={true}
            onToggle={handleDrawerToggle}
            onClose={handleDrawerClose}
            variant="persistent"
          />
           <Box
          component="main"
          sx={{
            position: 'absolute',
            left: {
              xs: 0,
              md: sidebarOpen ? 280 : 64,
            },
            right: 0,
            top: 0,
            bottom: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            transition: 'left 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <CustomScrollbar>
            <Box sx={{ height: '100%', width: '100%' }}>
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
      <Box 
        sx={{ 
          display: 'flex', 
          flex: 1, 
          overflow: 'hidden', 
          mt: '64px', 
          gap: 0,
          position: 'relative',
        }}
      >
        {!isMobile && (
          <Sidebar
            open={sidebarOpen}
            onToggle={handleDrawerToggle}
            onClose={handleDrawerClose}
            variant="persistent"
          />
        )}
        {isMobile && (
          <Sidebar
            open={sidebarOpen}
            onToggle={handleDrawerToggle}
            onClose={handleDrawerClose}
            variant="temporary"
          />
        )}
         <Box
          component="main"
          sx={{
            position: 'absolute',
            left: {
              xs: 0,
              md: sidebarOpen ? 280 : 64,
            },
            right: 0,
            top: 0,
            bottom: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            transition: 'left 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <CustomScrollbar>
            <Box sx={{ height: '100%', width: '100%' }}>
              {children}
            </Box>
          </CustomScrollbar>
        </Box>
      </Box>
    </Box>
  );
}