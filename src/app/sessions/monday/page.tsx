'use client';

import { Container, Typography, Box } from '@mui/material';

export default function MondaySessionsPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Monday Sessions
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Session notes, recaps, and important moments from the Monday group's adventures.
        </Typography>
      </Box>
    </Container>
  );
}

