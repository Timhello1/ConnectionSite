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
}

export default function SidebarNavItem({
  item,
  isActive,
  onClick,
}: SidebarNavItemProps) {
  const IconComponent = item.icon;

  return (
    <ListItem disablePadding sx={{ px: 1.5 }}>
      <ListItemButton
        selected={isActive}
        onClick={onClick}
        sx={{
          borderRadius: 2,
          mb: 0.5,
          minHeight: 48,
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
            bgcolor: 'action.hover',
          },
          transition: 'all 0.2s ease',
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 40,
            color: isActive ? 'secondary.main' : 'text.secondary',
            transition: 'color 0.2s ease',
          }}
        >
          <IconComponent />
        </ListItemIcon>
        <ListItemText
          primary={item.title}
          primaryTypographyProps={{
            fontSize: '0.95rem',
            fontWeight: isActive ? 600 : 400,
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}