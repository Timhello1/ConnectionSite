'use client';

import { Suspense, useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import CharacterList from '../../components/characters/CharacterList';
import CharacterDetail from '../../components/characters/CharacterDetail';
import { Character } from '../../types/character';
import { useCharacters } from '../../hooks/useCharacters';

function CharactersContent() {
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

export default function CharactersPage() {
  return (
    <Suspense fallback={
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    }>
      <CharactersContent />
    </Suspense>
  );
}