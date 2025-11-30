'use client';

import { Container, Typography, Box } from '@mui/material';

export default function NPCsPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          NPCs & Organizations
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Directory of important NPCs, factions, and organizations you've encountered.
        </Typography>
      </Box>
    </Container>
  );
}

