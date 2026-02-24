/** D&D 2024: item types for equipment, weapons, armor, magic items */

export type ItemType =
  | 'weapon'
  | 'armor'
  | 'shield'
  | 'tool'
  | 'wondrous'
  | 'potion'
  | 'scroll'
  | 'container'
  | 'other';

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  description?: string;
  /** Requires attunement (2024: 3 slots per character) */
  attunement?: boolean;
  weight?: number; // pounds
  /** For weapons: damage dice e.g. "2d6" */
  damage?: string;
  /** For weapons: damage type e.g. "slashing" */
  damageType?: string;
  /** For armor: AC base */
  armorClass?: number;
  /** For weapons: properties e.g. ["Versatile", "Martial"] */
  properties?: string[];
  /** Rarity for magic items */
  rarity?: 'common' | 'uncommon' | 'rare' | 'very rare' | 'legendary';
  /** Optional image URL (external link; no Firebase Storage) */
  imageUrl?: string;
}
