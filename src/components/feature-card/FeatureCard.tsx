import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: string;
  onClick?: () => void;
  children?: ReactNode;
}

export default function FeatureCard({
  title,
  description,
  icon,
  onClick,
  children,
}: FeatureCardProps) {
  const content = (
    <CardContent>
      {icon && (
        <Typography variant="h3" component="div" sx={{ mb: 2 }}>
          {icon}
        </Typography>
      )}
      <Typography variant="h3" component="h3" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
      {children}
    </CardContent>
  );

  if (onClick) {
    return (
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardActionArea onClick={onClick} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {content}
        </CardActionArea>
      </Card>
    );
  }

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {content}
    </Card>
  );
} 