'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  fetchClasses,
  fetchSubclasses,
  fetchSpells,
  saveCharacter,
} from '../../../lib/firebase/firestore';
import type { DndClass } from '../../../types/class';
import type { Subclass } from '../../../types/subclass';
import type { Spell } from '../../../types/spell';
import type { Character, AbilityScores, CombatStats } from '../../../types/character';
import {
  defaultAbilityScores,
  defaultCombatStats,
  buildNewCharacter,
} from '../../../lib/characterDefaults';
import CreatorStepBasics from '../../../components/characters/creator/CreatorStepBasics';
import CreatorStepAbilities from '../../../components/characters/creator/CreatorStepAbilities';
import CreatorStepCombat from '../../../components/characters/creator/CreatorStepCombat';
import CreatorStepSpells from '../../../components/characters/creator/CreatorStepSpells';
import CreatorStepReview from '../../../components/characters/creator/CreatorStepReview';
import Link from 'next/link';

const STEPS = ['Basics', 'Ability scores', 'Combat', 'Spells', 'Review'];

export default function NewCharacterPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [classes, setClasses] = useState<DndClass[]>([]);
  const [subclasses, setSubclasses] = useState<Subclass[]>([]);
  const [spells, setSpells] = useState<Spell[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [level, setLevel] = useState(1);
  const [classId, setClassId] = useState('');
  const [subclassId, setSubclassId] = useState('');
  const [race, setRace] = useState('');
  const [background, setBackground] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [portraitUrl, setPortraitUrl] = useState('');
  const [abilityScores, setAbilityScores] = useState<AbilityScores>(() => defaultAbilityScores());
  const [combat, setCombat] = useState<CombatStats>(() =>
    defaultCombatStats(1, 'd8', 0)
  );
  const [cantripIds, setCantripIds] = useState<string[]>([]);
  const [preparedSpellIds, setPreparedSpellIds] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [classList, subclassList, spellList] = await Promise.all([
        fetchClasses(),
        fetchSubclasses(),
        fetchSpells(),
      ]);
      if (!cancelled) {
        setClasses(classList);
        setSubclasses(subclassList);
        setSpells(spellList);
        setDataLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedClass = classes.find((c) => c.id === classId);
  const selectedSubclass = subclasses.find((s) => s.id === subclassId);

  // When class or level changes, set default combat (HP, hit dice, proficiency).
  useEffect(() => {
    if (!selectedClass) return;
    const hitDice = selectedClass.statistics.hitDice;
    const conMod = abilityScores.constitution.modifier;
    setCombat((prev) => ({
      ...defaultCombatStats(level, hitDice, conMod),
      armorClass: prev.armorClass,
      initiative: prev.initiative,
      speed: prev.speed,
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClass?.id, level]);

  const handleNext = () => setActiveStep((s) => Math.min(s + 1, STEPS.length - 1));
  const handleBack = () => setActiveStep((s) => Math.max(s - 1, 0));

  const handleSave = async () => {
    if (!name.trim()) {
      setSaveError('Please enter a character name.');
      return;
    }
    setSaveError(null);
    setSaving(true);
    try {
      const hitDice = selectedClass?.statistics.hitDice ?? 'd8';
      const character = buildNewCharacter(
        {
          name: name.trim(),
          level,
          status: 'active',
          class: selectedClass?.name ?? (classId || 'Unknown'),
          classId: classId || undefined,
          subclassId: subclassId || undefined,
          specialization: selectedSubclass?.name,
          race: race.trim() || undefined,
          background: background.trim() || undefined,
          playerName: playerName.trim() || undefined,
          abilityScores,
          combat,
          cantripIds,
          preparedSpellIds,
          media:
            portraitUrl.trim() ?
              { type: 'image' as const, url: portraitUrl.trim() }
              : undefined,
        },
        hitDice
      );
      character.id = crypto.randomUUID();
      await saveCharacter(character);
      router.push('/characters?new=1');
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : 'Failed to save character');
      setSaving(false);
    }
  };

  if (dataLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 640, mx: 'auto', py: 3, px: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        Create character
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        <Link href="/characters" style={{ color: 'inherit' }}>
          ← Back to characters
        </Link>
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
        {STEPS.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        {activeStep === 0 && (
          <CreatorStepBasics
            name={name}
            level={level}
            classId={classId}
            subclassId={subclassId}
            race={race}
            background={background}
            playerName={playerName}
            portraitUrl={portraitUrl}
            classes={classes}
            subclasses={subclasses}
            onNameChange={setName}
            onLevelChange={setLevel}
            onClassIdChange={setClassId}
            onSubclassIdChange={setSubclassId}
            onRaceChange={setRace}
            onBackgroundChange={setBackground}
            onPlayerNameChange={setPlayerName}
            onPortraitUrlChange={setPortraitUrl}
          />
        )}
        {activeStep === 1 && (
          <CreatorStepAbilities abilityScores={abilityScores} onChange={setAbilityScores} />
        )}
        {activeStep === 2 && <CreatorStepCombat combat={combat} onChange={setCombat} />}
        {activeStep === 3 && (
          <CreatorStepSpells
            cantripIds={cantripIds}
            preparedSpellIds={preparedSpellIds}
            spells={spells}
            onCantripIdsChange={setCantripIds}
            onPreparedSpellIdsChange={setPreparedSpellIds}
          />
        )}
        {activeStep === 4 && (
          <CreatorStepReview
            character={buildNewCharacter(
              {
                name: name || '—',
                level,
                class: selectedClass?.name ?? (classId || '—'),
                classId: classId || undefined,
                subclassId: subclassId || undefined,
                specialization: selectedSubclass?.name,
                race: race || undefined,
                background: background || undefined,
                playerName: playerName || undefined,
                abilityScores,
                combat,
                cantripIds,
                preparedSpellIds,
                media: portraitUrl ? { type: 'image', url: portraitUrl } : undefined,
              },
              selectedClass?.statistics.hitDice
            )}
            dndClass={selectedClass ?? null}
            subclass={selectedSubclass ?? null}
          />
        )}
      </Paper>

      {saveError && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setSaveError(null)}>
          {saveError}
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Box sx={{ flex: 1 }} />
        {activeStep < STEPS.length - 1 ? (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saving || !name.trim()}
          >
            {saving ? <CircularProgress size={24} /> : 'Create character'}
          </Button>
        )}
      </Box>
    </Box>
  );
}
