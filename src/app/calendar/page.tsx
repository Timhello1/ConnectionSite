'use client';

import { Container, Typography, Box } from '@mui/material';

export default function CalendarPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Session Calendar
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Schedule upcoming sessions, track availability, and coordinate with your party.
        </Typography>
      </Box>
    </Container>
  );
}

