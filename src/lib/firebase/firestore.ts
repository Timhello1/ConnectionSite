'use client';

import { getFirestore, Firestore } from 'firebase/firestore';
import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import getApp from './config';
import { Character } from '../../types/character';
import type { Item } from '../../types/item';
import type { Spell } from '../../types/spell';
import type { Ability } from '../../types/ability';
import type { DndClass } from '../../types/class';
import type { Subclass } from '../../types/subclass';

let firestoreInstance: Firestore | null = null;

export function getFirestoreInstance(): Firestore | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!firestoreInstance) {
      firestoreInstance = getFirestore(getApp());
    }
    return firestoreInstance;
  } catch {
    return null;
  }
}

// ─── Characters ─────────────────────────────────────────────────────────────
const CHARACTERS_COLLECTION = 'characters';

function docToCharacter(id: string, data: Record<string, unknown>): Character {
  return {
    id,
    name: (data.name as string) ?? '',
    level: Number(data.level) ?? 1,
    status: (data.status as Character['status']) ?? 'active',
    class: (data.class as string) ?? '',
    specialization: data.specialization as string | undefined,
    classId: data.classId as string | undefined,
    subclassId: data.subclassId as string | undefined,
    itemIds: data.itemIds as string[] | undefined,
    cantripIds: data.cantripIds as string[] | undefined,
    preparedSpellIds: data.preparedSpellIds as string[] | undefined,
    abilityIds: data.abilityIds as string[] | undefined,
    race: data.race as string | undefined,
    background: data.background as string | undefined,
    alignment: data.alignment as string | undefined,
    experiencePoints: data.experiencePoints as number | undefined,
    playerName: data.playerName as string | undefined,
    size: data.size as string | undefined,
    media: data.media as Character['media'] | undefined,
    abilityScores: data.abilityScores as Character['abilityScores'] | undefined,
    savingThrows: data.savingThrows as Character['savingThrows'] | undefined,
    skills: data.skills as Character['skills'] | undefined,
    combat: data.combat as Character['combat'] | undefined,
    attacks: data.attacks as Character['attacks'] | undefined,
    spellcasting: data.spellcasting as Character['spellcasting'] | undefined,
    armorProficiencies: data.armorProficiencies as string[] | undefined,
    toolProficiencies: data.toolProficiencies as string[] | undefined,
    languages: data.languages as string[] | undefined,
    attunementSlots: data.attunementSlots as number | undefined,
    heroicInspiration: data.heroicInspiration as boolean | undefined,
    passivePerception: data.passivePerception as number | undefined,
    npcLinks: data.npcLinks as Character['npcLinks'] | undefined,
    diaryEntries: data.diaryEntries as Character['diaryEntries'] | undefined,
  };
}

function characterToDoc(c: Character): Record<string, unknown> {
  const obj: Record<string, unknown> = {
    name: c.name,
    level: c.level,
    status: c.status,
    class: c.class,
  };
  if (c.specialization != null) obj.specialization = c.specialization;
  if (c.classId != null) obj.classId = c.classId;
  if (c.subclassId != null) obj.subclassId = c.subclassId;
  if (c.itemIds != null) obj.itemIds = c.itemIds;
  if (c.cantripIds != null) obj.cantripIds = c.cantripIds;
  if (c.preparedSpellIds != null) obj.preparedSpellIds = c.preparedSpellIds;
  if (c.abilityIds != null) obj.abilityIds = c.abilityIds;
  if (c.race != null) obj.race = c.race;
  if (c.background != null) obj.background = c.background;
  if (c.alignment != null) obj.alignment = c.alignment;
  if (c.experiencePoints != null) obj.experiencePoints = c.experiencePoints;
  if (c.playerName != null) obj.playerName = c.playerName;
  if (c.size != null) obj.size = c.size;
  if (c.media != null) obj.media = c.media;
  if (c.abilityScores != null) obj.abilityScores = c.abilityScores;
  if (c.savingThrows != null) obj.savingThrows = c.savingThrows;
  if (c.skills != null) obj.skills = c.skills;
  if (c.combat != null) obj.combat = c.combat;
  if (c.attacks != null) obj.attacks = c.attacks;
  if (c.spellcasting != null) obj.spellcasting = c.spellcasting;
  if (c.armorProficiencies != null) obj.armorProficiencies = c.armorProficiencies;
  if (c.toolProficiencies != null) obj.toolProficiencies = c.toolProficiencies;
  if (c.languages != null) obj.languages = c.languages;
  if (c.attunementSlots != null) obj.attunementSlots = c.attunementSlots;
  if (c.heroicInspiration != null) obj.heroicInspiration = c.heroicInspiration;
  if (c.passivePerception != null) obj.passivePerception = c.passivePerception;
  if (c.npcLinks != null) obj.npcLinks = c.npcLinks;
  if (c.diaryEntries != null) obj.diaryEntries = c.diaryEntries;
  return obj;
}

export async function fetchCharacters(): Promise<Character[]> {
  const db = getFirestoreInstance();
  if (!db) return [];
  try {
    const snapshot = await getDocs(collection(db, CHARACTERS_COLLECTION));
    return snapshot.docs.map((d) => docToCharacter(d.id, d.data() as Record<string, unknown>));
  } catch (error) {
    console.error('Firestore fetch characters error:', error);
    return [];
  }
}

export async function fetchCharacterById(id: string): Promise<Character | null> {
  const db = getFirestoreInstance();
  if (!db) return null;
  try {
    const d = await getDoc(doc(db, CHARACTERS_COLLECTION, id));
    if (!d.exists()) return null;
    return docToCharacter(d.id, d.data() as Record<string, unknown>);
  } catch (error) {
    console.error('Firestore fetch character error:', error);
    return null;
  }
}

export async function saveCharacter(character: Character): Promise<void> {
  const db = getFirestoreInstance();
  if (!db) throw new Error('Firestore not available');
  await setDoc(doc(db, CHARACTERS_COLLECTION, character.id), characterToDoc(character), { merge: true });
}

// ─── Items (equipment, weapons, armor, magic items) ──────────────────────────
const ITEMS_COLLECTION = 'items';

function docToItem(id: string, data: Record<string, unknown>): Item {
  return {
    id,
    name: (data.name as string) ?? '',
    type: (data.type as Item['type']) ?? 'other',
    description: data.description as string | undefined,
    attunement: data.attunement as boolean | undefined,
    weight: data.weight as number | undefined,
    damage: data.damage as string | undefined,
    damageType: data.damageType as string | undefined,
    armorClass: data.armorClass as number | undefined,
    properties: data.properties as string[] | undefined,
    rarity: data.rarity as Item['rarity'] | undefined,
    imageUrl: data.imageUrl as string | undefined,
  };
}

function itemToDoc(i: Item): Record<string, unknown> {
  const obj: Record<string, unknown> = { name: i.name, type: i.type };
  if (i.description != null) obj.description = i.description;
  if (i.attunement != null) obj.attunement = i.attunement;
  if (i.weight != null) obj.weight = i.weight;
  if (i.damage != null) obj.damage = i.damage;
  if (i.damageType != null) obj.damageType = i.damageType;
  if (i.armorClass != null) obj.armorClass = i.armorClass;
  if (i.properties != null) obj.properties = i.properties;
  if (i.rarity != null) obj.rarity = i.rarity;
  if (i.imageUrl != null) obj.imageUrl = i.imageUrl;
  return obj;
}

export async function fetchItems(): Promise<Item[]> {
  const db = getFirestoreInstance();
  if (!db) return [];
  try {
    const snapshot = await getDocs(collection(db, ITEMS_COLLECTION));
    return snapshot.docs.map((d) => docToItem(d.id, d.data() as Record<string, unknown>));
  } catch (error) {
    console.error('Firestore fetch items error:', error);
    return [];
  }
}

export async function fetchItemById(id: string): Promise<Item | null> {
  const db = getFirestoreInstance();
  if (!db) return null;
  try {
    const d = await getDoc(doc(db, ITEMS_COLLECTION, id));
    if (!d.exists()) return null;
    return docToItem(d.id, d.data() as Record<string, unknown>);
  } catch (error) {
    console.error('Firestore fetch item error:', error);
    return null;
  }
}

export async function fetchItemsByIds(ids: string[]): Promise<Item[]> {
  if (ids.length === 0) return [];
  const db = getFirestoreInstance();
  if (!db) return [];
  const out: Item[] = [];
  for (const id of ids) {
    const item = await fetchItemById(id);
    if (item) out.push(item);
  }
  return out;
}

export async function saveItem(item: Item): Promise<void> {
  const db = getFirestoreInstance();
  if (!db) throw new Error('Firestore not available');
  await setDoc(doc(db, ITEMS_COLLECTION, item.id), itemToDoc(item), { merge: true });
}

// ─── Spells ─────────────────────────────────────────────────────────────────
const SPELLS_COLLECTION = 'spells';

function docToSpell(id: string, data: Record<string, unknown>): Spell {
  return {
    id,
    name: (data.name as string) ?? '',
    level: Number(data.level) ?? 0,
    school: (data.school as Spell['school']) ?? 'Evocation',
    castingTime: data.castingTime as string | undefined,
    range: data.range as string | undefined,
    components: data.components as string | undefined,
    duration: data.duration as string | undefined,
    description: data.description as string | undefined,
    atHigherLevels: data.atHigherLevels as string | undefined,
    imageUrl: data.imageUrl as string | undefined,
    classes: data.classes as string[] | undefined,
    concentration: data.concentration as boolean | undefined,
    ritual: data.ritual as boolean | undefined,
    material: data.material as string | undefined,
    actionType: data.actionType as string | undefined,
  };
}

function spellToDoc(s: Spell): Record<string, unknown> {
  const obj: Record<string, unknown> = { name: s.name, level: s.level, school: s.school };
  if (s.castingTime != null) obj.castingTime = s.castingTime;
  if (s.range != null) obj.range = s.range;
  if (s.components != null) obj.components = s.components;
  if (s.duration != null) obj.duration = s.duration;
  if (s.description != null) obj.description = s.description;
  if (s.atHigherLevels != null) obj.atHigherLevels = s.atHigherLevels;
  if (s.imageUrl != null) obj.imageUrl = s.imageUrl;
  if (s.classes != null) obj.classes = s.classes;
  if (s.concentration != null) obj.concentration = s.concentration;
  if (s.ritual != null) obj.ritual = s.ritual;
  if (s.material != null) obj.material = s.material;
  if (s.actionType != null) obj.actionType = s.actionType;
  return obj;
}

export async function fetchSpells(): Promise<Spell[]> {
  const db = getFirestoreInstance();
  if (!db) return [];
  try {
    const snapshot = await getDocs(collection(db, SPELLS_COLLECTION));
    return snapshot.docs.map((d) => docToSpell(d.id, d.data() as Record<string, unknown>));
  } catch (error) {
    console.error('Firestore fetch spells error:', error);
    return [];
  }
}

export async function fetchSpellById(id: string): Promise<Spell | null> {
  const db = getFirestoreInstance();
  if (!db) return null;
  try {
    const d = await getDoc(doc(db, SPELLS_COLLECTION, id));
    if (!d.exists()) return null;
    return docToSpell(d.id, d.data() as Record<string, unknown>);
  } catch (error) {
    console.error('Firestore fetch spell error:', error);
    return null;
  }
}

export async function fetchSpellsByIds(ids: string[]): Promise<Spell[]> {
  if (ids.length === 0) return [];
  const out: Spell[] = [];
  for (const id of ids) {
    const spell = await fetchSpellById(id);
    if (spell) out.push(spell);
  }
  return out;
}

export async function saveSpell(spell: Spell): Promise<void> {
  const db = getFirestoreInstance();
  if (!db) throw new Error('Firestore not available');
  await setDoc(doc(db, SPELLS_COLLECTION, spell.id), spellToDoc(spell), { merge: true });
}

// ─── Abilities (class features, species traits, feats) ───────────────────────
const ABILITIES_COLLECTION = 'abilities';

function docToAbility(id: string, data: Record<string, unknown>): Ability {
  return {
    id,
    name: (data.name as string) ?? '',
    source: (data.source as Ability['source']) ?? 'other',
    sourceId: data.sourceId as string | undefined,
    description: data.description as string | undefined,
    levelGained: data.levelGained as number | undefined,
    uses: data.uses as string | undefined,
  };
}

function abilityToDoc(a: Ability): Record<string, unknown> {
  const obj: Record<string, unknown> = { name: a.name, source: a.source };
  if (a.sourceId != null) obj.sourceId = a.sourceId;
  if (a.description != null) obj.description = a.description;
  if (a.levelGained != null) obj.levelGained = a.levelGained;
  if (a.uses != null) obj.uses = a.uses;
  return obj;
}

export async function fetchAbilities(): Promise<Ability[]> {
  const db = getFirestoreInstance();
  if (!db) return [];
  try {
    const snapshot = await getDocs(collection(db, ABILITIES_COLLECTION));
    return snapshot.docs.map((d) => docToAbility(d.id, d.data() as Record<string, unknown>));
  } catch (error) {
    console.error('Firestore fetch abilities error:', error);
    return [];
  }
}

export async function fetchAbilityById(id: string): Promise<Ability | null> {
  const db = getFirestoreInstance();
  if (!db) return null;
  try {
    const d = await getDoc(doc(db, ABILITIES_COLLECTION, id));
    if (!d.exists()) return null;
    return docToAbility(d.id, d.data() as Record<string, unknown>);
  } catch (error) {
    console.error('Firestore fetch ability error:', error);
    return null;
  }
}

export async function fetchAbilitiesByIds(ids: string[]): Promise<Ability[]> {
  if (ids.length === 0) return [];
  const out: Ability[] = [];
  for (const id of ids) {
    const a = await fetchAbilityById(id);
    if (a) out.push(a);
  }
  return out;
}

export async function saveAbility(ability: Ability): Promise<void> {
  const db = getFirestoreInstance();
  if (!db) throw new Error('Firestore not available');
  await setDoc(doc(db, ABILITIES_COLLECTION, ability.id), abilityToDoc(ability), { merge: true });
}

// ─── Classes (class statistics) ─────────────────────────────────────────────
const CLASSES_COLLECTION = 'classes';

function docToClass(id: string, data: Record<string, unknown>): DndClass {
  return {
    id,
    name: (data.name as string) ?? '',
    description: data.description as string | undefined,
    statistics: (data.statistics as DndClass['statistics']) ?? {
      hitDice: 'd8',
      primaryAbility: '',
      savingThrowProficiencies: [],
      armorProficiencies: [],
      weaponProficiencies: [],
      skillCount: 2,
      skillChoices: [],
    },
    subclassLevel: data.subclassLevel as number | undefined,
  };
}

function classToDoc(c: DndClass): Record<string, unknown> {
  const obj: Record<string, unknown> = { name: c.name, statistics: c.statistics };
  if (c.description != null) obj.description = c.description;
  if (c.subclassLevel != null) obj.subclassLevel = c.subclassLevel;
  return obj;
}

export async function fetchClasses(): Promise<DndClass[]> {
  const db = getFirestoreInstance();
  if (!db) return [];
  try {
    const snapshot = await getDocs(collection(db, CLASSES_COLLECTION));
    return snapshot.docs.map((d) => docToClass(d.id, d.data() as Record<string, unknown>));
  } catch (error) {
    console.error('Firestore fetch classes error:', error);
    return [];
  }
}

export async function fetchClassById(id: string): Promise<DndClass | null> {
  const db = getFirestoreInstance();
  if (!db) return null;
  try {
    const d = await getDoc(doc(db, CLASSES_COLLECTION, id));
    if (!d.exists()) return null;
    return docToClass(d.id, d.data() as Record<string, unknown>);
  } catch (error) {
    console.error('Firestore fetch class error:', error);
    return null;
  }
}

export async function saveClass(dndClass: DndClass): Promise<void> {
  const db = getFirestoreInstance();
  if (!db) throw new Error('Firestore not available');
  await setDoc(doc(db, CLASSES_COLLECTION, dndClass.id), classToDoc(dndClass), { merge: true });
}

// ─── Subclasses ─────────────────────────────────────────────────────────────
const SUBCLASSES_COLLECTION = 'subclasses';

function docToSubclass(id: string, data: Record<string, unknown>): Subclass {
  return {
    id,
    classId: (data.classId as string) ?? '',
    name: (data.name as string) ?? '',
    description: data.description as string | undefined,
    levelGained: data.levelGained as number | undefined,
  };
}

function subclassToDoc(s: Subclass): Record<string, unknown> {
  const obj: Record<string, unknown> = { classId: s.classId, name: s.name };
  if (s.description != null) obj.description = s.description;
  if (s.levelGained != null) obj.levelGained = s.levelGained;
  return obj;
}

export async function fetchSubclasses(): Promise<Subclass[]> {
  const db = getFirestoreInstance();
  if (!db) return [];
  try {
    const snapshot = await getDocs(collection(db, SUBCLASSES_COLLECTION));
    return snapshot.docs.map((d) => docToSubclass(d.id, d.data() as Record<string, unknown>));
  } catch (error) {
    console.error('Firestore fetch subclasses error:', error);
    return [];
  }
}

export async function fetchSubclassById(id: string): Promise<Subclass | null> {
  const db = getFirestoreInstance();
  if (!db) return null;
  try {
    const d = await getDoc(doc(db, SUBCLASSES_COLLECTION, id));
    if (!d.exists()) return null;
    return docToSubclass(d.id, d.data() as Record<string, unknown>);
  } catch (error) {
    console.error('Firestore fetch subclass error:', error);
    return null;
  }
}

export async function fetchSubclassesByClassId(classId: string): Promise<Subclass[]> {
  const db = getFirestoreInstance();
  if (!db) return [];
  try {
    const snapshot = await getDocs(collection(db, SUBCLASSES_COLLECTION));
    return snapshot.docs
      .map((d) => docToSubclass(d.id, d.data() as Record<string, unknown>))
      .filter((s) => s.classId === classId);
  } catch (error) {
    console.error('Firestore fetch subclasses by class error:', error);
    return [];
  }
}

export async function saveSubclass(subclass: Subclass): Promise<void> {
  const db = getFirestoreInstance();
  if (!db) throw new Error('Firestore not available');
  await setDoc(doc(db, SUBCLASSES_COLLECTION, subclass.id), subclassToDoc(subclass), { merge: true });
}
