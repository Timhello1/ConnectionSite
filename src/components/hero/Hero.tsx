import { Box, Typography, Container } from '@mui/material';

interface HeroProps {
  title: string;
  subtitle?: string;
}

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        py: { xs: 8, md: 12 },
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h1" component="h1" gutterBottom>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="h5" component="p" sx={{ mt: 3 }}>
            {subtitle}
          </Typography>
        )}
      </Container>
    </Box>
  );
}