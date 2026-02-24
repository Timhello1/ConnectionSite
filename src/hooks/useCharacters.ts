'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchCharacters } from '../lib/firebase/firestore';
import { mockCharacters } from '../data/mockCharacters';
import { Character } from '../types/character';

export function useCharacters() {
  const [characters, setCharacters] = useState<Character[]>(mockCharacters);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    const fromFirebase = await fetchCharacters();
    setCharacters(fromFirebase.length > 0 ? fromFirebase : mockCharacters);
    setLoading(false);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const fromFirebase = await fetchCharacters();
      if (!cancelled) {
        setCharacters(fromFirebase.length > 0 ? fromFirebase : mockCharacters);
      }
      if (!cancelled) setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { characters, loading, refetch };
}
