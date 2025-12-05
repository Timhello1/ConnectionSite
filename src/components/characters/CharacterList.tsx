'use client';

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
  Chip,
} from '@mui/material';
import { Character } from '../../types/character';

interface CharacterListProps {
  characters: Character[];
  selectedCharacter: Character | null;
  onSelectCharacter: (character: Character) => void;
}

export default function CharacterList({
  characters,
  selectedCharacter,
  onSelectCharacter,
}: CharacterListProps) {
  const getStatusColor = (status: Character['status']) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'default';
      case 'deceased':
        return 'error';
      case 'retired':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Paper
      sx={{
        width: 300,
        height: '100%',
        borderRadius: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" component="h2">
          Characters
        </Typography>
      </Box>
      <List sx={{ flex: 1, overflow: 'auto', p: 0 }}>
        {characters.map((character) => (
          <ListItem key={character.id} disablePadding>
            <ListItemButton
              selected={selectedCharacter?.id === character.id}
              onClick={() => onSelectCharacter(character)}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'secondary.main',
                  '&:hover': {
                    bgcolor: 'primary.light',
                  },
                },
              }}
            >
              <ListItemText
                primary={character.name}
                secondary={
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 0.5 }}>
                    <Typography variant="caption">
                      Level {character.level} {character.class}
                    </Typography>
                    <Chip
                      label={character.status}
                      size="small"
                      color={getStatusColor(character.status)}
                      sx={{ height: 18, fontSize: '0.65rem' }}
                    />
                  </Box>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}