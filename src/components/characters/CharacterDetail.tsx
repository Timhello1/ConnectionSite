'use client';

import { Box, Typography, Paper } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Character } from '../../types/character';
import { useCharacterSheetData } from '../../hooks/useCharacterSheetData';
import CharacterInfoSection from './CharacterInfoSection';
import CharacterLinksCarousel from '../../components/characters/CharacterLinksCarousel';
import CharacterDiarySection from './CharacterDiarySection';

interface CharacterDetailProps {
  character: Character | null;
}

export default function CharacterDetail({ character }: CharacterDetailProps) {
  const { data: sheetData } = useCharacterSheetData(character);

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
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        p: 3,
        gap: 3,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', flexShrink: 0 }}>
        {character.name}
        {character.class && ` the ${character.class}`}
      </Typography>

      {/* Portrait and key info in a compact row */}
      <Box sx={{ display: 'flex', gap: 3, flexShrink: 0, alignItems: 'flex-start' }}>
        <Paper
          sx={{
            width: 160,
            height: 200,
            overflow: 'hidden',
            borderRadius: 2,
            flexShrink: 0,
          }}
        >
          {character.media?.url && character.media.type === 'image' ? (
            <Box
              component="img"
              src={character.media.url}
              alt={character.media.alt || character.name}
              sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : character.media?.url && character.media.type === 'video' ? (
            <Box component="video" src={character.media.url} controls sx={{ width: '100%', height: '100%', display: 'block' }} />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#292524',
                color: 'text.secondary',
              }}
            >
              <PersonIcon sx={{ fontSize: 40 }} />
              <Typography variant="caption" sx={{ mt: 0.5 }}>
                No portrait
              </Typography>
              <Typography variant="caption" sx={{ fontSize: '0.65rem' }}>
                Add URL in creator
              </Typography>
            </Box>
          )}
        </Paper>

        {/* Inline summary: class, level, species, etc. */}
        <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexWrap: 'wrap', gap: 2, alignContent: 'flex-start' }}>
          <Box><Typography variant="caption" color="text.secondary">LEVEL</Typography><Typography variant="body2" fontWeight={600}>{character.level}</Typography></Box>
          <Box><Typography variant="caption" color="text.secondary">CLASS</Typography><Typography variant="body2" fontWeight={600}>{sheetData?.dndClass?.name ?? character.class}</Typography></Box>
          {sheetData?.subclass?.name && <Box><Typography variant="caption" color="text.secondary">SUBCLASS</Typography><Typography variant="body2" fontWeight={600}>{sheetData.subclass.name}</Typography></Box>}
          {character.race && <Box><Typography variant="caption" color="text.secondary">SPECIES</Typography><Typography variant="body2" fontWeight={600}>{character.race}</Typography></Box>}
          {character.playerName && <Box><Typography variant="caption" color="text.secondary">PLAYER</Typography><Typography variant="body2" fontWeight={600}>{character.playerName}</Typography></Box>}
          <Box><Typography variant="caption" color="text.secondary">STATUS</Typography><Typography variant="body2" fontWeight={600}>{character.status}</Typography></Box>
        </Box>
      </Box>

      {/* Full details: one scrollable column */}
      <CharacterInfoSection character={character} sheetData={sheetData} />

      <CharacterLinksCarousel character={character} />

      <CharacterDiarySection character={character} />
    </Box>
  );
}