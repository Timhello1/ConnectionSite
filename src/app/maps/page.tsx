'use client';

import { Container, Typography, Box } from '@mui/material';

export default function MapsPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Maps
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explore the lands, cities, and locations you'll journey through in this campaign.
        </Typography>
      </Box>
    </Container>
  );
}

