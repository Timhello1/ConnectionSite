/** D&D 2024 core ability scores and modifier */
export interface AbilityScore {
  score: number;
  modifier: number;
}

/** All six abilities (2024 PHB) */
export interface AbilityScores {
  strength: AbilityScore;
  dexterity: AbilityScore;
  constitution: AbilityScore;
  intelligence: AbilityScore;
  wisdom: AbilityScore;
  charisma: AbilityScore;
}

export type ProficiencyLevel = 'none' | 'proficient' | 'expertise';

export interface SavingThrow {
  ability: keyof AbilityScores;
  proficiency: ProficiencyLevel;
}

export type SkillKey =
  | 'acrobatics' | 'animalHandling' | 'arcana' | 'athletics' | 'deception'
  | 'history' | 'insight' | 'intimidation' | 'investigation' | 'medicine'
  | 'nature' | 'perception' | 'performance' | 'persuasion' | 'religion'
  | 'sleightOfHand' | 'stealth' | 'survival';

export interface Skill {
  key: SkillKey;
  ability: keyof AbilityScores;
  proficiency: ProficiencyLevel;
}

/** Combat & defense (2024) */
export interface CombatStats {
  armorClass: number;
  shieldBonus?: number;
  hitPointMax: number;
  hitPointCurrent: number;
  temporaryHitPoints?: number;
  hitDice: string;
  initiative: number;
  speed: number;
  deathSaveSuccesses: number;
  deathSaveFailures: number;
  proficiencyBonus: number;
}

/** Simple attack entry (can reference item id or be custom) */
export interface AttackEntry {
  name: string;
  itemId?: string; // ref to items collection
  attackBonus?: string;
  damage?: string;
  notes?: string;
}

export interface DiaryEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  type?: 'level-up' | 'event' | 'relationship' | 'item' | 'general';
}

/**
 * Character: stored in Firestore. References items, spells, abilities, class, subclass.
 * Portrait: external image URL only (no Firebase Storage). Paste a link from Imgur, imgbb, etc.
 */
export interface Character {
  id: string;
  name: string;
  level: number;
  status: 'active' | 'inactive' | 'deceased' | 'retired';
  /** Display name; prefer classId + subclassId for normalized data */
  class: string;
  specialization?: string;
  /** References: normalized tables */
  classId?: string;
  subclassId?: string;
  /** Item IDs from items collection (inventory/equipment) */
  itemIds?: string[];
  /** Spell IDs: cantrips known/prepared */
  cantripIds?: string[];
  /** Spell IDs: spells prepared or known */
  preparedSpellIds?: string[];
  /** Ability/feature IDs from abilities collection (class features, feats, species traits) */
  abilityIds?: string[];
  /** Species (2024; formerly race) */
  race?: string;
  background?: string;
  alignment?: string;
  experiencePoints?: number;
  playerName?: string;
  size?: string;
  /** Portrait: external URL only. Use Imgur, imgbb, or any public image link. */
  media?: {
    type: 'image' | 'video';
    url: string;
    alt?: string;
  };
  abilityScores?: AbilityScores;
  savingThrows?: SavingThrow[];
  skills?: Skill[];
  combat?: CombatStats;
  attacks?: AttackEntry[];
  spellcasting?: {
    spellSaveDC?: number;
    spellAttackBonus?: number;
    spellSlotsByLevel?: Record<number, number>;
  };
  armorProficiencies?: string[];
  toolProficiencies?: string[];
  languages?: string[];
  attunementSlots?: number;
  heroicInspiration?: boolean;
  passivePerception?: number;
  npcLinks?: { id: string; name: string; relationship: string }[];
  diaryEntries?: DiaryEntry[];
}
