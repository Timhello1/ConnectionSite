/**
 * Load spells from srd-5.2-spells.json and map them to the app Spell type.
 * Collection structure matches the JSON (name, level, school, classes, concentration, ritual, etc.).
 */

import type { Spell, SpellSchool } from '../../types/spell';
import srd52SpellsJson from './srd-5.2-spells.json';

/** One row from srd-5.2-spells.json */
export interface Srd52SpellRow {
  name: string;
  level: number;
  school: string;
  classes?: string[];
  actionType?: string;
  concentration?: boolean;
  ritual?: boolean;
  range?: string;
  components?: string[];
  duration?: string;
  description?: string;
  cantripUpgrade?: string;
  material?: string;
  castingTime?: string;
}

const SPELL_SCHOOLS: SpellSchool[] = [
  'Abjuration',
  'Conjuration',
  'Divination',
  'Enchantment',
  'Evocation',
  'Illusion',
  'Necromancy',
  'Transmutation',
];

function toSpellSchool(school: string): SpellSchool {
  const lower = school.toLowerCase();
  const found = SPELL_SCHOOLS.find((s) => s.toLowerCase() === lower);
  return found ?? 'Evocation';
}

function slug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function componentsToString(components: string[] | undefined): string | undefined {
  if (!components?.length) return undefined;
  const map: Record<string, string> = { v: 'V', s: 'S', m: 'M' };
  return components.map((c) => map[c.toLowerCase()] ?? c.toUpperCase()).join(', ');
}

function castingTimeFromRow(row: Srd52SpellRow): string | undefined {
  if (row.castingTime) return row.castingTime;
  switch (row.actionType) {
    case 'action':
      return '1 action';
    case 'bonusAction':
      return '1 bonus action';
    case 'reaction':
      return '1 reaction';
    default:
      return row.actionType ? `1 ${row.actionType}` : undefined;
  }
}

export function srd52RowToSpell(row: Srd52SpellRow): Spell {
  return {
    id: slug(row.name),
    name: row.name,
    level: row.level,
    school: toSpellSchool(row.school),
    castingTime: castingTimeFromRow(row),
    range: row.range,
    components: componentsToString(row.components),
    duration: row.duration,
    description: row.description,
    atHigherLevels: row.cantripUpgrade,
    classes: row.classes,
    concentration: row.concentration,
    ritual: row.ritual,
    material: row.material,
    actionType: row.actionType,
  };
}

/** Spells from srd-5.2-spells.json (imported at build time). */
export function getSpellsFromSrd52(): Spell[] {
  const rows = srd52SpellsJson as Srd52SpellRow[];
  return rows.map(srd52RowToSpell);
}
