'use client';

import { Container, Typography, Box } from '@mui/material';

export default function LorePage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Lore
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Dive into the world's rich history, cultures, and the stories that shape your adventure.
        </Typography>
      </Box>
    </Container>
  );
}

