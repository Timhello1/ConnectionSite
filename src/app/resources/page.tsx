'use client';

import { Container, Typography, Box } from '@mui/material';

export default function ResourcesPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Resources
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Quick reference for game rules, house rules, and helpful resources for players.
        </Typography>
      </Box>
    </Container>
  );
}

