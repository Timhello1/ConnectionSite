import { Grid, GridProps, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

interface FeatureGridProps {
  children: ReactNode;
  spacing?: GridProps['spacing'];
  sx?: SxProps<Theme>;
}

export default function FeatureGrid({ children, spacing = 3, sx }: FeatureGridProps) {
  return (
    <Grid container spacing={spacing} sx={sx}>
      {children}
    </Grid>
  );
}