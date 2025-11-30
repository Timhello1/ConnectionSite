'use client';

import {
  Drawer,
  Box,
  Typography,
} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { navItems } from './navItems';
import SidebarNavGroup from './SidebarNavGroup';
import CustomScrollbar from '../scrollbar/CustomScrollbar';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
  onClose?: () => void;
  variant?: 'permanent' | 'persistent' | 'temporary';
}

export default function Sidebar({ open, onToggle, onClose, variant = 'persistent' }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    if (onClose) {
      onClose();
    }
  };

  // Group items by category
  const groupedItems = navItems.reduce((acc, item) => {
    const group = item.group || 'Other';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(item);
    return acc;
  }, {} as Record<string, typeof navItems>);

  const drawerContent = (
    <Box
      sx={{
        width: 280,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        pt: 1,
        overflow: 'hidden',
      }}
    >
      {/* Navigation List - Scrollable */}
      {open && (
        <Box 
          sx={{ 
            flex: 1, 
            overflow: 'hidden', 
            minHeight: 0,
          }}
        >
          <CustomScrollbar>
            {Object.entries(groupedItems).map(([group, items]) => (
              <SidebarNavGroup
                key={group}
                group={group}
                items={items}
                activePath={pathname}
                onNavigate={handleNavigation}
              />
            ))}
          </CustomScrollbar>
        </Box>
      )}

      {/* Footer - Fixed at bottom */}
      {open && (
        <Box
          sx={{
            p: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
            textAlign: 'center',
            flexShrink: 0,
            bgcolor: 'background.paper',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontStyle: 'italic',
            }}
          >
            "May your dice roll high"
          </Typography>
        </Box>
      )}
    </Box>
  );

  if (variant === 'permanent' || variant === 'persistent') {
    return (
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: open ? 280 : 64,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            borderRight: 'none',
            boxShadow: 2,
            transition: 'width 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
            width: open ? 280 : 64,
            overflowX: 'hidden',
            overflowY: 'hidden',
            top: 0,
            height: '100%',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose || onToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          boxShadow: 3,
          transition: 'transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}