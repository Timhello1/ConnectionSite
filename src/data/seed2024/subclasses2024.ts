/**
 * D&D 2024 SRD 5.2 – subclasses (linked to classes).
 */

import type { Subclass } from '../../types/subclass';

export const subclasses2024: Subclass[] = [
  { id: 'berserker', classId: 'barbarian', name: 'Berserker', levelGained: 3 },
  { id: 'lore', classId: 'bard', name: 'College of Lore', levelGained: 3 },
  { id: 'life', classId: 'cleric', name: 'Life Domain', levelGained: 3 },
  { id: 'land', classId: 'druid', name: 'Circle of the Land', levelGained: 3 },
  { id: 'champion', classId: 'fighter', name: 'Champion', levelGained: 3 },
  { id: 'open-hand', classId: 'monk', name: 'Way of the Open Hand', levelGained: 3 },
  { id: 'devotion', classId: 'paladin', name: 'Oath of Devotion', levelGained: 3 },
  { id: 'hunter', classId: 'ranger', name: 'Hunter', levelGained: 3 },
  { id: 'thief', classId: 'rogue', name: 'Thief', levelGained: 3 },
  { id: 'draconic', classId: 'sorcerer', name: 'Draconic Bloodline', levelGained: 3 },
  { id: 'fiend', classId: 'warlock', name: 'The Fiend', levelGained: 3 },
  { id: 'evocation', classId: 'wizard', name: 'School of Evocation', levelGained: 3 },
  // Extra options
  { id: 'beast-master', classId: 'ranger', name: 'Beast Master', levelGained: 3 },
  { id: 'battle-master', classId: 'fighter', name: 'Battle Master', levelGained: 3 },
];
