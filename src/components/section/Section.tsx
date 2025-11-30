import { Container, Typography, Box } from '@mui/material';
import { ReactNode } from 'react';

interface SectionProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

export default function Section({
  title,
  subtitle,
  children,
  maxWidth = 'lg',
}: SectionProps) {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth={maxWidth}>
        {title && (
          <Typography variant="h2" component="h2" align="center" gutterBottom>
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 6 }}
          >
            {subtitle}
          </Typography>
        )}
        {children}
      </Container>
    </Box>
  );
}