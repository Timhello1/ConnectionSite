/**
 * Default values and helpers for new D&D 2024 characters.
 */

import type { AbilityScores, CombatStats, Character } from '../types/character';

export function abilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function makeAbilityScore(score: number): { score: number; modifier: number } {
  return { score, modifier: abilityModifier(score) };
}

export function defaultAbilityScores(scores: number[] = [10, 10, 10, 10, 10, 10]): AbilityScores {
  const [strength, dexterity, constitution, intelligence, wisdom, charisma] = scores;
  return {
    strength: makeAbilityScore(strength),
    dexterity: makeAbilityScore(dexterity),
    constitution: makeAbilityScore(constitution),
    intelligence: makeAbilityScore(intelligence),
    wisdom: makeAbilityScore(wisdom),
    charisma: makeAbilityScore(charisma),
  };
}

/** Default combat stats for level 1. hitDice e.g. "d8" from class. */
export function defaultCombatStats(level: number, hitDice: string, conMod: number): CombatStats {
  const max = hitDice === 'd12' ? 12 : hitDice === 'd10' ? 10 : hitDice === 'd8' ? 8 : 6;
  const hpMax = max + conMod + (level > 1 ? (level - 1) * (Math.ceil((max + 1) / 2) + conMod) : 0);
  return {
    armorClass: 10 + Math.min(conMod, 0),
    hitPointMax: Math.max(1, hpMax),
    hitPointCurrent: Math.max(1, hpMax),
    hitDice: level + hitDice,
    initiative: 0,
    speed: 30,
    deathSaveSuccesses: 0,
    deathSaveFailures: 0,
    proficiencyBonus: level >= 17 ? 6 : level >= 13 ? 5 : level >= 9 ? 4 : level >= 5 ? 3 : 2,
  };
}

/** Build a minimal new character for the creator (before save). Pass hitDice from class (e.g. d8). */
export function buildNewCharacter(
  overrides: Partial<Character> & { name: string; class: string },
  hitDiceFromClass?: string
): Character {
  const level = overrides.level ?? 1;
  const abilityScores = overrides.abilityScores ?? defaultAbilityScores();
  const conMod = abilityScores.constitution.modifier;
  const hitDice = hitDiceFromClass ?? 'd8';
  const combat = overrides.combat ?? defaultCombatStats(level, hitDice, conMod);

  return {
    id: '', // set by caller (e.g. crypto.randomUUID())
    name: overrides.name,
    level,
    status: overrides.status ?? 'active',
    class: overrides.class,
    specialization: overrides.specialization,
    classId: overrides.classId,
    subclassId: overrides.subclassId,
    itemIds: overrides.itemIds ?? [],
    cantripIds: overrides.cantripIds ?? [],
    preparedSpellIds: overrides.preparedSpellIds ?? [],
    abilityIds: overrides.abilityIds ?? [],
    race: overrides.race,
    background: overrides.background,
    alignment: overrides.alignment,
    experiencePoints: overrides.experiencePoints,
    playerName: overrides.playerName,
    size: overrides.size,
    media: overrides.media,
    abilityScores,
    savingThrows: overrides.savingThrows,
    skills: overrides.skills,
    combat,
    attacks: overrides.attacks,
    spellcasting: overrides.spellcasting,
    armorProficiencies: overrides.armorProficiencies,
    toolProficiencies: overrides.toolProficiencies,
    languages: overrides.languages,
    attunementSlots: overrides.attunementSlots ?? 3,
    heroicInspiration: overrides.heroicInspiration,
    passivePerception: overrides.passivePerception,
    npcLinks: overrides.npcLinks,
    diaryEntries: overrides.diaryEntries,
  };
}
