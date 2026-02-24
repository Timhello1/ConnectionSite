'use client';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#d97706', // amber-600
      light: '#fbbf24', // amber-400
      dark: '#92400e', // amber-800
    },
    secondary: {
      main: '#fef3c7', // amber-100
      light: '#fffbeb', // amber-50
      dark: '#fde68a', // amber-200
    },
    background: {
      default: '#1c1917', // stone-900
      paper: '#292524', // stone-800 – solid, no tint
    },
    text: {
      primary: '#fafaf9',   // stone-50 – main content
      secondary: '#a8a29e', // stone-400 – muted, labels, inactive icons
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  typography: {
    fontFamily: [
      'var(--font-sans)',
      'system-ui',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '4.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#fafaf9',
      '@media (min-width:600px)': {
        fontSize: '5rem',
      },
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#fafaf9',
      '@media (min-width:600px)': {
        fontSize: '3rem',
      },
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 700,
      color: '#fafaf9',
    },
    h5: {
      color: '#a8a29e',
      fontStyle: 'italic',
      fontFamily: 'serif',
    },
    h6: {
      color: '#fafaf9',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1.125rem',
      lineHeight: 1.75,
      color: '#e7e5e4',
    },
    body2: {
      color: '#a8a29e',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#292524',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: 'none',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '& .MuiListItemIcon-root': {
            color: '#a8a29e',
            minWidth: 32,
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '& *::-webkit-scrollbar': {
            width: '10px',
            height: '10px',
          },
          '& *::-webkit-scrollbar-track': {
            background: '#1c1917',
            borderRadius: '5px',
          },
          '& *::-webkit-scrollbar-thumb': {
            background: '#d97706',
            borderRadius: '5px',
            border: '2px solid #1c1917',
            '&:hover': {
              background: '#fbbf24',
            },
          },
          scrollbarWidth: 'thin',
          scrollbarColor: '#d97706 #1c1917',
        },
      },
    },
  },
});