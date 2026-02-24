'use client';

import { Box, Typography, Paper, Divider } from '@mui/material';
import { Character, AbilityScores, SkillKey } from '../../types/character';
import type { CharacterSheetData } from '../../hooks/useCharacterSheetData';

const ABILITY_LABELS: Record<keyof AbilityScores, string> = {
  strength: 'STR',
  dexterity: 'DEX',
  constitution: 'CON',
  intelligence: 'INT',
  wisdom: 'WIS',
  charisma: 'CHA',
};

const SKILL_LABELS: Record<SkillKey, string> = {
  acrobatics: 'Acrobatics',
  animalHandling: 'Animal Handling',
  arcana: 'Arcana',
  athletics: 'Athletics',
  deception: 'Deception',
  history: 'History',
  insight: 'Insight',
  intimidation: 'Intimidation',
  investigation: 'Investigation',
  medicine: 'Medicine',
  nature: 'Nature',
  perception: 'Perception',
  performance: 'Performance',
  persuasion: 'Persuasion',
  religion: 'Religion',
  sleightOfHand: 'Sleight of Hand',
  stealth: 'Stealth',
  survival: 'Survival',
};

interface CharacterInfoSectionProps {
  character: Character;
  sheetData?: CharacterSheetData | null;
}

function InfoRow({ label, value }: { label: string; value: string | number }) {
  return (
    <Box sx={{ mb: 1.5 }}>
      <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', display: 'block' }}>
        {label}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        {value}
      </Typography>
    </Box>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5, color: 'text.primary' }}>
      {children}
    </Typography>
  );
}

export default function CharacterInfoSection({ character, sheetData }: CharacterInfoSectionProps) {
  const { abilityScores, combat, skills, savingThrows } = character;
  const items = sheetData?.items ?? [];
  const cantrips = sheetData?.cantrips ?? [];
  const preparedSpells = sheetData?.preparedSpells ?? [];
  const abilities = sheetData?.abilities ?? [];
  const dndClass = sheetData?.dndClass ?? null;
  const subclass = sheetData?.subclass ?? null;

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}>
        General Information
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 2, mb: 3 }}>
        <InfoRow label="Name" value={character.name} />
        <InfoRow label="Level" value={character.level} />
        <InfoRow label="Class" value={dndClass?.name ?? character.class} />
        {(subclass?.name || character.specialization) && (
          <InfoRow label="Subclass" value={subclass?.name ?? character.specialization ?? ''} />
        )}
        {character.race && <InfoRow label="Species" value={character.race} />}
        {character.background && <InfoRow label="Background" value={character.background} />}
        {character.alignment != null && character.alignment !== '' && (
          <InfoRow label="Alignment" value={character.alignment} />
        )}
        {character.experiencePoints != null && (
          <InfoRow label="Experience" value={character.experiencePoints} />
        )}
        {character.playerName && <InfoRow label="Player" value={character.playerName} />}
        <InfoRow label="Status" value={character.status} />
        {character.passivePerception != null && (
          <InfoRow label="Passive Perception" value={character.passivePerception} />
        )}
        {character.heroicInspiration != null && character.heroicInspiration && (
          <InfoRow label="Heroic Inspiration" value="Yes" />
        )}
      </Box>

      {abilityScores && (
        <>
          <SectionTitle>Ability Scores</SectionTitle>
          <Divider sx={{ mb: 1.5 }} />
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))', gap: 2, mb: 3 }}>
            {(Object.keys(abilityScores) as (keyof AbilityScores)[]).map((key) => {
              const a = abilityScores[key];
              if (!a || typeof a.score !== 'number') return null;
              const mod = a.modifier >= 0 ? `+${a.modifier}` : `${a.modifier}`;
              return (
                <Box key={key} sx={{ minWidth: 64, textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    {ABILITY_LABELS[key]}
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {a.score}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {mod}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </>
      )}

      {combat && (
        <>
          <SectionTitle>Combat & Defense</SectionTitle>
          <Divider sx={{ mb: 1.5 }} />
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 2, mb: 3 }}>
            <InfoRow label="Armor Class" value={combat.armorClass} />
            {combat.shieldBonus != null && <InfoRow label="Shield" value={combat.shieldBonus} />}
            <InfoRow label="Hit Points" value={`${combat.hitPointCurrent} / ${combat.hitPointMax}`} />
            {combat.temporaryHitPoints != null && combat.temporaryHitPoints > 0 && (
              <InfoRow label="Temp HP" value={combat.temporaryHitPoints} />
            )}
            <InfoRow label="Hit Dice" value={combat.hitDice} />
            <InfoRow label="Initiative" value={combat.initiative >= 0 ? `+${combat.initiative}` : combat.initiative} />
            <InfoRow label="Speed" value={`${combat.speed} ft`} />
            <InfoRow label="Proficiency Bonus" value={combat.proficiencyBonus >= 0 ? `+${combat.proficiencyBonus}` : combat.proficiencyBonus} />
            {(combat.deathSaveSuccesses > 0 || combat.deathSaveFailures > 0) && (
              <InfoRow
                label="Death Saves"
                value={`✓${combat.deathSaveSuccesses} ✗${combat.deathSaveFailures}`}
              />
            )}
          </Box>
        </>
      )}

      {savingThrows && savingThrows.length > 0 && (
        <>
          <SectionTitle>Saving Throws</SectionTitle>
          <Divider sx={{ mb: 1.5 }} />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {savingThrows
              .filter((st) => st.proficiency !== 'none')
              .map((st) => (
                <Typography key={st.ability} variant="body2">
                  {ABILITY_LABELS[st.ability]} {st.proficiency === 'expertise' ? '(expertise)' : '(prof.)'}
                </Typography>
              ))}
          </Box>
        </>
      )}

      {skills && skills.length > 0 && (
        <>
          <SectionTitle>Skills</SectionTitle>
          <Divider sx={{ mb: 1.5 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 2 }}>
            {skills
              .filter((s) => s.proficiency !== 'none')
              .map((s) => (
                <Typography key={s.key} variant="body2">
                  {SKILL_LABELS[s.key]} {s.proficiency === 'expertise' ? '(expertise)' : '(prof.)'}
                </Typography>
              ))}
          </Box>
        </>
      )}

      {(character.spellcasting || cantrips.length > 0 || preparedSpells.length > 0) && (
        <>
          <SectionTitle>Spellcasting</SectionTitle>
          <Divider sx={{ mb: 1.5 }} />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            {character.spellcasting?.spellSaveDC != null && (
              <InfoRow label="Spell Save DC" value={character.spellcasting.spellSaveDC} />
            )}
            {character.spellcasting?.spellAttackBonus != null && (
              <InfoRow label="Spell Attack" value={character.spellcasting.spellAttackBonus >= 0 ? `+${character.spellcasting.spellAttackBonus}` : character.spellcasting.spellAttackBonus} />
            )}
            {cantrips.length > 0 && (
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="text.secondary">Cantrips</Typography>
                <Typography variant="body2">{cantrips.map((s) => s.name).join(', ')}</Typography>
              </Box>
            )}
            {preparedSpells.length > 0 && (
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="text.secondary">Prepared Spells</Typography>
                <Typography variant="body2">{preparedSpells.map((s) => s.name).join(', ')}</Typography>
              </Box>
            )}
          </Box>
        </>
      )}

      {character.attacks && character.attacks.length > 0 && (
        <>
          <SectionTitle>Attacks & Spellcasting</SectionTitle>
          <Divider sx={{ mb: 1.5 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
            {character.attacks.map((a, i) => (
              <Box key={i}>
                <Typography variant="body2" fontWeight={500}>{a.name}</Typography>
                {(a.attackBonus != null || a.damage != null) && (
                  <Typography variant="caption" color="text.secondary">
                    {[a.attackBonus, a.damage].filter(Boolean).join(' · ')}
                  </Typography>
                )}
                {a.notes && <Typography variant="caption" display="block">{a.notes}</Typography>}
              </Box>
            ))}
          </Box>
        </>
      )}

      {(character.armorProficiencies?.length || character.toolProficiencies?.length || character.languages?.length) ? (
        <>
          <SectionTitle>Proficiencies & Languages</SectionTitle>
          <Divider sx={{ mb: 1.5 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
            {character.armorProficiencies?.length ? (
              <Typography variant="body2">Armor: {character.armorProficiencies.join(', ')}</Typography>
            ) : null}
            {character.toolProficiencies?.length ? (
              <Typography variant="body2">Tools: {character.toolProficiencies.join(', ')}</Typography>
            ) : null}
            {character.languages?.length ? (
              <Typography variant="body2">Languages: {character.languages.join(', ')}</Typography>
            ) : null}
          </Box>
        </>
      ) : null}

      {dndClass?.statistics && (
        <>
          <SectionTitle>Class Statistics</SectionTitle>
          <Divider sx={{ mb: 1.5 }} />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <InfoRow label="Hit Dice" value={dndClass.statistics.hitDice} />
            {dndClass.statistics.primaryAbility && (
              <InfoRow label="Primary Ability" value={dndClass.statistics.primaryAbility} />
            )}
            {dndClass.statistics.savingThrowProficiencies?.length ? (
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="text.secondary">Saving Throws</Typography>
                <Typography variant="body2">{dndClass.statistics.savingThrowProficiencies.join(', ')}</Typography>
              </Box>
            ) : null}
            {dndClass.statistics.armorProficiencies?.length ? (
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="text.secondary">Armor</Typography>
                <Typography variant="body2">{dndClass.statistics.armorProficiencies.join(', ')}</Typography>
              </Box>
            ) : null}
            {dndClass.statistics.weaponProficiencies?.length ? (
              <Box sx={{ width: '100%' }}>
                <Typography variant="caption" color="text.secondary">Weapons</Typography>
                <Typography variant="body2">{dndClass.statistics.weaponProficiencies.join(', ')}</Typography>
              </Box>
            ) : null}
            <InfoRow label="Skill choices" value={dndClass.statistics.skillCount} />
          </Box>
        </>
      )}

      {items.length > 0 && (
        <>
          <SectionTitle>Items & Equipment</SectionTitle>
          <Divider sx={{ mb: 1.5 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
            {items.map((item) => (
              <Box key={item.id}>
                <Typography variant="body2" fontWeight={500}>
                  {item.name}
                  {item.attunement && ' (attunement)'}
                  {item.type !== 'other' && ` · ${item.type}`}
                </Typography>
                {item.description && (
                  <Typography variant="caption" color="text.secondary" display="block">
                    {item.description}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </>
      )}

      {abilities.length > 0 && (
        <>
          <SectionTitle>Features & Abilities</SectionTitle>
          <Divider sx={{ mb: 1.5 }} />
          <Box component="ul" sx={{ m: 0, pl: 2 }}>
            {abilities.map((a) => (
              <Box key={a.id} component="li" sx={{ mb: 1 }}>
                <Typography variant="body2" fontWeight={500}>
                  {a.name}
                  {a.source !== 'other' && ` (${a.source})`}
                  {a.levelGained != null && ` — level ${a.levelGained}`}
                </Typography>
                {a.description && (
                  <Typography variant="caption" color="text.secondary" display="block">
                    {a.description}
                  </Typography>
                )}
                {a.uses && (
                  <Typography variant="caption" color="text.secondary">
                    Uses: {a.uses}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </>
      )}
    </Paper>
  );
}
