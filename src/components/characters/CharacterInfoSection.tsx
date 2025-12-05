'use client';

import { Box, Typography, Paper, Divider } from '@mui/material';
import { Character } from '../../types/character';

interface CharacterInfoSectionProps {
  character: Character;
}

export default function CharacterInfoSection({ character }: CharacterInfoSectionProps) {
  const InfoRow = ({ label, value }: { label: string; value: string | number }) => (
    <Box sx={{ width: { xs: '100%', sm: '50%' }, mb: 2 }}>
      <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
        {label}
      </Typography>
      <Typography variant="body1" sx={{ mt: 0.5 }}>
        {value}
      </Typography>
    </Box>
  );

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" component="h3" gutterBottom>
        General Information
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <InfoRow label="Name" value={character.name} />
        <InfoRow label="Level" value={character.level} />
        <InfoRow label="Class" value={character.class} />
        {character.specialization && (
          <InfoRow label="Specialization" value={character.specialization} />
        )}
        <InfoRow label="Status" value={character.status} />
      </Box>
    </Paper>
  );
}