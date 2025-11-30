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
      paper: 'rgba(254, 243, 199, 0.1)', // amber-50 with opacity
    },
    text: {
      primary: '#fef3c7', // amber-100
      secondary: '#fde68a', // amber-200
    },
  },
  typography: {
    fontFamily: [
      'var(--font-geist-sans)',
      'Arial',
      'Helvetica',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '4.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#fef3c7',
      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
      '@media (min-width:600px)': {
        fontSize: '5rem',
      },
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#fef3c7',
      '@media (min-width:600px)': {
        fontSize: '3rem',
      },
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 700,
      color: '#fef3c7',
    },
    h5: {
      color: '#fde68a',
      fontStyle: 'italic',
      fontFamily: 'serif',
    },
    h6: {
      color: '#fbbf24',
      fontFamily: 'helvetica',
    },
    body1: {
      fontSize: '1.125rem',
      lineHeight: 1.75,
      color: '#fde68a',
    },
    body2: {
      color: '#fde68a',
    },
  },
  components: {
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