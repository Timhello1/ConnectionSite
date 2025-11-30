'use client';

import { Container, Typography, Box } from '@mui/material';

export default function CharactersPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Characters
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View your party members, their stories, abilities, and character development.
        </Typography>
      </Box>
    </Container>
  );
}

