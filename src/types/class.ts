/** D&D 2024: class definition (own table) – class statistics and reference */

export interface ClassStatistics {
  hitDice: string; // e.g. "d10"
  primaryAbility: string; // e.g. "Strength"
  savingThrowProficiencies: string[]; // e.g. ["Strength", "Constitution"]
  armorProficiencies: string[]; // Light, Medium, Heavy, Shields
  weaponProficiencies: string[];
  skillCount: number; // number of skills to choose
  skillChoices?: string[]; // list of skills to choose from
}

export interface DndClass {
  id: string;
  name: string;
  description?: string;
  statistics: ClassStatistics;
  /** Level at which subclass is chosen */
  subclassLevel?: number;
}
