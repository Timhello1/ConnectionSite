'use client';

import { Container, Typography, Box } from '@mui/material';

export default function PollsPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Polls & Surveys
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Vote on campaign decisions, session scheduling, and share your feedback.
        </Typography>
      </Box>
    </Container>
  );
}

