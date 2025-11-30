'use client';

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { NavItemConfig } from './navItems';

interface SidebarNavItemProps {
  item: NavItemConfig;
  isActive: boolean;
  onClick: () => void;
  sidebarOpen: boolean;
}

export default function SidebarNavItem({
  item,
  isActive,
  onClick,
  sidebarOpen,
}: SidebarNavItemProps) {
  const IconComponent = item.icon;

  return (
    <ListItem 
      disablePadding 
      sx={{ 
        px: sidebarOpen ? 1.5 : 0,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <ListItemButton
        selected={isActive}
        onClick={onClick}
        sx={{
          borderRadius: sidebarOpen ? 2 : 2,
          mb: sidebarOpen ? 0.5 : 0.5,
          minHeight: sidebarOpen ? 48 : 48,
          height: sidebarOpen ? 48 : 48,
          justifyContent: sidebarOpen ? 'flex-start' : 'center',
          alignItems: 'center',
          px: sidebarOpen ? 2 : 0,
          py: sidebarOpen ? 1 : 0,
          mx: sidebarOpen ? 0 : 0.5,
          width: sidebarOpen ? '100%' : 48,
          maxWidth: sidebarOpen ? '100%' : 48,
          transition: 'all 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
          '&.Mui-selected': {
            bgcolor: 'primary.main',
            color: 'secondary.main',
            '&:hover': {
              bgcolor: 'primary.light',
            },
            '& .MuiListItemIcon-root': {
              color: 'secondary.main',
            },
          },
          '&:hover': {
            bgcolor: sidebarOpen ? 'action.hover' : 'rgba(217, 119, 6, 0.1)',
          },
        }}
        title={!sidebarOpen ? item.title : undefined}
      >
        <ListItemIcon
          sx={{
            minWidth: sidebarOpen ? 40 : 0,
            width: sidebarOpen ? 40 : '100%',
            justifyContent: 'center',
            alignItems: 'center',
            color: isActive ? 'secondary.main' : 'text.secondary',
            transition: 'all 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            marginRight: sidebarOpen ? 1 : 0,
            marginLeft: sidebarOpen ? 0 : 0,
          }}
        >
          <IconComponent fontSize="medium" />
        </ListItemIcon>
        <ListItemText
          primary={item.title}
          primaryTypographyProps={{
            fontSize: '0.95rem',
            fontWeight: isActive ? 600 : 400,
          }}
          sx={{
            opacity: sidebarOpen ? 1 : 0,
            width: sidebarOpen ? 'auto' : 0,
            overflow: 'hidden',
            transition: 'opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1) 0s, width 0.9s cubic-bezier(0.4, 0, 0.2, 1) 0s',
            whiteSpace: 'nowrap',
            margin: 0,
            flex: sidebarOpen ? 1 : 0,
            visibility: sidebarOpen ? 'visible' : 'hidden',
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}