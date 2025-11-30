'use client';

import { List, ListSubheader } from '@mui/material';
import { NavItemConfig } from './navItems';
import SidebarNavItem from './SidebarNavItem';

interface SidebarNavGroupProps {
  group: string;
  items: NavItemConfig[];
  activePath: string;
  onNavigate: (path: string) => void;
  sidebarOpen: boolean;
}

export default function SidebarNavGroup({
  group,
  items,
  activePath,
  onNavigate,
  sidebarOpen,
}: SidebarNavGroupProps) {
  return (
    <List 
      disablePadding
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: sidebarOpen ? 'stretch' : 'center',
      }}
    >
      {sidebarOpen && group !== 'Main' && (
        <ListSubheader
          disableSticky
          sx={{
            bgcolor: 'transparent',
            color: 'text.secondary',
            fontWeight: 600,
            textTransform: 'uppercase',
            fontSize: '0.75rem',
            letterSpacing: 1,
            pt: 2,
            pb: 1,
            px: 3,
            position: 'static',
          }}
        >
          {group}
        </ListSubheader>
      )}
      {items.map((item) => (
        <SidebarNavItem
          key={item.path}
          item={item}
          isActive={activePath === item.path}
          onClick={() => onNavigate(item.path)}
          sidebarOpen={sidebarOpen}
        />
      ))}
    </List>
  );
}