'use client';

import { Container, Typography, Box } from '@mui/material';

export default function OneShotsPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          One Shot Ideas
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Collection of one-shot adventure ideas, side quests, and special event concepts.
        </Typography>
      </Box>
    </Container>
  );
}

