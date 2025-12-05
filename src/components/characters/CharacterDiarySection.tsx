'use client';

import {
  Box,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import { Character } from '../../types/character';

interface CharacterDiarySectionProps {
  character: Character;
}

export default function CharacterDiarySection({ character }: CharacterDiarySectionProps) {
  const getTypeColor = (type?: string) => {
    switch (type) {
      case 'level-up':
        return 'success';
      case 'event':
        return 'info';
      case 'relationship':
        return 'warning';
      case 'item':
        return 'primary';
      default:
        return 'default';
    }
  };

  if (!character.diaryEntries || character.diaryEntries.length === 0) {
    return (
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" component="h3" gutterBottom>
          Change Diary
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" color="text.secondary">
          No diary entries yet.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" component="h3" gutterBottom>
        Change Diary
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List>
        {character.diaryEntries.map((entry) => (
          <ListItem
            key={entry.id}
            sx={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              px: 0,
              py: 2,
              borderBottom: 1,
              borderColor: 'divider',
              '&:last-child': {
                borderBottom: 0,
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, width: '100%' }}>
              <Typography variant="subtitle2" sx={{ flex: 1 }}>
                {entry.title}
              </Typography>
              {entry.type && (
                <Chip
                  label={entry.type}
                  size="small"
                  color={getTypeColor(entry.type)}
                  sx={{ height: 20, fontSize: '0.65rem' }}
                />
              )}
              <Typography variant="caption" color="text.secondary">
                {new Date(entry.date).toLocaleDateString()}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
              {entry.content}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}