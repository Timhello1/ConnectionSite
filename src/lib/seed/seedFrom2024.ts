'use client';

import { saveSpell, saveClass, saveSubclass } from '../firebase/firestore';
import { getSpellsFromSrd52 } from '../../data/seed2024/loadSrd52Spells';
import { classes2024 } from '../../data/seed2024/classes2024';
import { subclasses2024 } from '../../data/seed2024/subclasses2024';

/** Load 2024 SRD 5.2 spells from srd-5.2-spells.json into Firestore. */
export async function seedSpells2024(
  onProgress?: (current: number, total: number, name: string) => void
): Promise<{ saved: number; failed: number }> {
  const spells = getSpellsFromSrd52();
  let saved = 0;
  let failed = 0;
  const total = spells.length;
  for (let i = 0; i < total; i++) {
    const spell = spells[i];
    onProgress?.(i + 1, total, spell.name);
    try {
      await saveSpell(spell);
      saved++;
    } catch {
      failed++;
    }
  }
  return { saved, failed };
}

/** Load 2024 SRD classes from app data into Firestore. */
export async function seedClasses2024(
  onProgress?: (current: number, total: number, name: string) => void
): Promise<{ saved: number; failed: number }> {
  let saved = 0;
  let failed = 0;
  const total = classes2024.length;
  for (let i = 0; i < total; i++) {
    const dndClass = classes2024[i];
    onProgress?.(i + 1, total, dndClass.name);
    try {
      await saveClass(dndClass);
      saved++;
    } catch {
      failed++;
    }
  }
  return { saved, failed };
}

/** Load 2024 SRD subclasses from app data into Firestore. */
export async function seedSubclasses2024(
  onProgress?: (current: number, total: number, name: string) => void
): Promise<{ saved: number; failed: number }> {
  let saved = 0;
  let failed = 0;
  const total = subclasses2024.length;
  for (let i = 0; i < total; i++) {
    const subclass = subclasses2024[i];
    onProgress?.(i + 1, total, subclass.name);
    try {
      await saveSubclass(subclass);
      saved++;
    } catch {
      failed++;
    }
  }
  return { saved, failed };
}
