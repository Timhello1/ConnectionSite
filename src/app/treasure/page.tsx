'use client';

import { Container, Typography, Box } from '@mui/material';

export default function TreasurePage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Treasure & Loot
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track magical items, treasure, and rewards discovered throughout your adventures.
        </Typography>
      </Box>
    </Container>
  );
}

