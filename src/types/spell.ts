/** D&D 2024: spell definition (own table, referenced by character) */

export type SpellSchool =
  | 'Abjuration'
  | 'Conjuration'
  | 'Divination'
  | 'Enchantment'
  | 'Evocation'
  | 'Illusion'
  | 'Necromancy'
  | 'Transmutation';

export interface Spell {
  id: string;
  name: string;
  level: number; // 0 = cantrip, 1-9
  school: SpellSchool;
  castingTime?: string; // e.g. "1 action"
  range?: string; // e.g. "60 feet"
  components?: string; // V, S, M
  duration?: string;
  description?: string;
  /** At higher levels / cantrip upgrade */
  atHigherLevels?: string;
  /** Optional image/icon URL (external) */
  imageUrl?: string;
  /** SRD 5.2: class list that can cast this spell */
  classes?: string[];
  concentration?: boolean;
  ritual?: boolean;
  /** Material component description */
  material?: string;
  /** Raw action type from SRD (action, bonusAction, reaction) */
  actionType?: string;
}
