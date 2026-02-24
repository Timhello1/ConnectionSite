'use client';

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  Typography,
  Paper,
  Chip,
  Button,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Link from 'next/link';
import { Character } from '../../types/character';

interface CharacterListProps {
  characters: Character[];
  selectedCharacter: Character | null;
  onSelectCharacter: (character: Character) => void;
  createCharacterHref?: string;
}

export default function CharacterList({
  characters,
  selectedCharacter,
  onSelectCharacter,
  createCharacterHref,
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

  const imageUrl = (c: Character) =>
    c.media?.type === 'image' && c.media?.url ? c.media.url : null;

  return (
    <Paper
      sx={{
        width: 280,
        minWidth: 280,
        height: '100%',
        borderRadius: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
          Characters
        </Typography>
        {createCharacterHref && (
          <Button
            component={Link}
            href={createCharacterHref}
            size="small"
            variant="outlined"
            startIcon={<PersonAddIcon />}
          >
            Create
          </Button>
        )}
      </Box>
      <List sx={{ flex: 1, overflow: 'auto', p: 1.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {characters.map((character) => {
          const url = imageUrl(character);
          const isSelected = selectedCharacter?.id === character.id;
          return (
            <ListItem key={character.id} disablePadding sx={{ listStyle: 'none' }}>
              <ListItemButton
                selected={isSelected}
                onClick={() => onSelectCharacter(character)}
                sx={{
                  p: 0,
                  borderRadius: 1.5,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: isSelected ? 'primary.main' : 'divider',
                  '&.Mui-selected': {
                    bgcolor: 'rgba(217, 119, 6, 0.12)',
                    borderColor: 'primary.main',
                    '&:hover': {
                      bgcolor: 'rgba(217, 119, 6, 0.18)',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.04)',
                  },
                }}
              >
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Placeholder / character image for list */}
                  <Box
                    sx={{
                      width: '100%',
                      aspectRatio: '4/3',
                      bgcolor: '#1c1917',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    {url ? (
                      <Box
                        component="img"
                        src={url}
                        alt={character.name}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <PersonIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
                    )}
                  </Box>
                  <Box sx={{ p: 1.5 }}>
                    <Typography variant="subtitle1" fontWeight={600} noWrap>
                      {character.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
                      <Typography variant="caption" color="text.secondary">
                        Level {character.level} {character.class}
                      </Typography>
                      <Chip
                        label={character.status}
                        size="small"
                        color={getStatusColor(character.status)}
                        sx={{ height: 20, fontSize: '0.7rem' }}
                      />
                    </Box>
                  </Box>
                </Box>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}
