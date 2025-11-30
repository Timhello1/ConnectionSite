'use client';

import { Container, Typography, Box } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome, Adventurers
        </Typography>
        <Typography variant="h5" component="p" sx={{ mb: 4, fontStyle: 'italic' }}>
          "The journey begins where the map ends..."
        </Typography>
        <Typography variant="body1">
          Select an item from the sidebar to explore different sections of the campaign.
        </Typography>
      </Box>
    </Container>
  );
}