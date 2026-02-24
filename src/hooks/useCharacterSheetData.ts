'use client';

import { useState, useEffect } from 'react';
import { Character } from '../types/character';
import type { Item } from '../types/item';
import type { Spell } from '../types/spell';
import type { Ability } from '../types/ability';
import type { DndClass } from '../types/class';
import type { Subclass } from '../types/subclass';
import {
  fetchItemsByIds,
  fetchSpellsByIds,
  fetchAbilitiesByIds,
  fetchClassById,
  fetchSubclassById,
} from '../lib/firebase/firestore';

export interface CharacterSheetData {
  items: Item[];
  cantrips: Spell[];
  preparedSpells: Spell[];
  abilities: Ability[];
  dndClass: DndClass | null;
  subclass: Subclass | null;
}

export function useCharacterSheetData(character: Character | null) {
  const [data, setData] = useState<CharacterSheetData>({
    items: [],
    cantrips: [],
    preparedSpells: [],
    abilities: [],
    dndClass: null,
    subclass: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!character) {
      setData({
        items: [],
        cantrips: [],
        preparedSpells: [],
        abilities: [],
        dndClass: null,
        subclass: null,
      });
      return;
    }

    let cancelled = false;
    setLoading(true);

    (async () => {
      const [itemIds, cantripIds, preparedSpellIds, abilityIds, classId, subclassId] = [
        character.itemIds ?? [],
        character.cantripIds ?? [],
        character.preparedSpellIds ?? [],
        character.abilityIds ?? [],
        character.classId,
        character.subclassId,
      ];

      const [items, cantrips, preparedSpells, abilities, dndClass, subclass] = await Promise.all([
        fetchItemsByIds(itemIds),
        fetchSpellsByIds(cantripIds),
        fetchSpellsByIds(preparedSpellIds),
        fetchAbilitiesByIds(abilityIds),
        classId ? fetchClassById(classId) : Promise.resolve(null),
        subclassId ? fetchSubclassById(subclassId) : Promise.resolve(null),
      ]);

      if (!cancelled) {
        setData({
          items,
          cantrips,
          preparedSpells,
          abilities,
          dndClass,
          subclass,
        });
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [character?.id, character?.itemIds, character?.cantripIds, character?.preparedSpellIds, character?.abilityIds, character?.classId, character?.subclassId]);

  return { data, loading };
}
