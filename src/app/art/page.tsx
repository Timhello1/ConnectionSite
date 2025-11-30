'use client';

import { Container, Typography, Box } from '@mui/material';

export default function ArtPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Art & Media
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Gallery of character art, maps, and visual content from the campaign.
        </Typography>
      </Box>
    </Container>
  );
}

