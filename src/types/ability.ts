/** D&D 2024: ability / feature (class feature, species trait, feat) – own table */

export type AbilitySource = 'class' | 'subclass' | 'species' | 'feat' | 'background' | 'other';

export interface Ability {
  id: string;
  name: string;
  source: AbilitySource;
  /** Optional link to class/subclass/species id for filtering */
  sourceId?: string;
  description?: string;
  /** Level gained (for class features) */
  levelGained?: number;
  /** Uses per rest, etc. */
  uses?: string;
}
