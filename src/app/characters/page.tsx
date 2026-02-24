'use client';

import { Box, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import CharacterList from '../../components/characters/CharacterList';
import CharacterDetail from '../../components/characters/CharacterDetail';
import { Character } from '../../types/character';
import { useCharacters } from '../../hooks/useCharacters';

export default function CharactersPage() {
  const searchParams = useSearchParams();
  const { characters, loading, refetch } = useCharacters();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  useEffect(() => {
    if (searchParams.get('new') === '1') {
      refetch();
    }
  }, [searchParams, refetch]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', width: '100%', display: 'flex', overflow: 'hidden' }}>
      <CharacterList
        characters={characters}
        selectedCharacter={selectedCharacter}
        onSelectCharacter={setSelectedCharacter}
        createCharacterHref="/characters/new"
      />
      <CharacterDetail character={selectedCharacter} />
    </Box>
  );
}