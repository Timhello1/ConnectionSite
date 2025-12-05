'use client';

import { Box, Typography, Paper } from '@mui/material';
import { Character } from '../../types/character';
import CharacterInfoSection from './CharacterInfoSection';
import CharacterLinksCarousel from '../../components/characters/CharacterLinksCarousel';
import CharacterDiarySection from './CharacterDiarySection';

interface CharacterDetailProps {
  character: Character | null;
}

export default function CharacterDetail({ character }: CharacterDetailProps) {
  if (!character) {
    return (
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Select a character to view details
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        p: 3,
        gap: 3,
      }}
    >
      {/* Top Row: Character Picture and Character Details side by side */}
      <Box sx={{ display: 'flex', gap: 3, flexShrink: 0 }}>
        {/* Character Picture */}
        <Paper
          sx={{
            width: { xs: '100%', sm: 400 },
            height: 400,
            overflow: 'hidden',
            borderRadius: 2,
            flexShrink: 0,
          }}
        >
          {character.media ? (
            character.media.type === 'image' ? (
              <Box
                component="img"
                src={character.media.url}
                alt={character.media.alt || character.name}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            ) : (
              <Box
                component="video"
                src={character.media.url}
                controls
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'block',
                }}
              />
            )
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                No media available
              </Typography>
            </Box>
          )}
        </Paper>

        {/* Character Details */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <CharacterInfoSection character={character} />
        </Box>
      </Box>

      {/* Middle Row: NPC Links Carousel */}
      <Box sx={{ flexShrink: 0 }}>
        <CharacterLinksCarousel character={character} />
      </Box>

      {/* Bottom Row: Character Diary */}
      <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
        <CharacterDiarySection character={character} />
      </Box>
    </Box>
  );
}