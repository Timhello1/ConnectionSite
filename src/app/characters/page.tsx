'use client';

import { Box } from '@mui/material';
import { useState } from 'react';
import CharacterList from '../../components/characters/CharacterList';
import CharacterDetail from '../../components/characters/CharacterDetail';
import { Character } from '../../types/character';
import { mockCharacters } from '../../data/mockCharacters';

export default function CharactersPage() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    mockCharacters[0] || null
  );

  return (
    <Box sx={{ height: '100%', width: '100%', display: 'flex', overflow: 'hidden' }}>
      <CharacterList
        characters={mockCharacters}
        selectedCharacter={selectedCharacter}
        onSelectCharacter={setSelectedCharacter}
      />
      <CharacterDetail character={selectedCharacter} />
    </Box>
  );
}