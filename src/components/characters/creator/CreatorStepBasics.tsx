'use client';

import { Box, TextField, MenuItem } from '@mui/material';
import type { DndClass } from '../../../types/class';
import type { Subclass } from '../../../types/subclass';

interface CreatorStepBasicsProps {
  name: string;
  level: number;
  classId: string;
  subclassId: string;
  race: string;
  background: string;
  playerName: string;
  portraitUrl: string;
  classes: DndClass[];
  subclasses: Subclass[];
  onNameChange: (v: string) => void;
  onLevelChange: (v: number) => void;
  onClassIdChange: (v: string) => void;
  onSubclassIdChange: (v: string) => void;
  onRaceChange: (v: string) => void;
  onBackgroundChange: (v: string) => void;
  onPlayerNameChange: (v: string) => void;
  onPortraitUrlChange: (v: string) => void;
}

export default function CreatorStepBasics({
  name,
  level,
  classId,
  subclassId,
  race,
  background,
  playerName,
  portraitUrl,
  classes,
  subclasses,
  onNameChange,
  onLevelChange,
  onClassIdChange,
  onSubclassIdChange,
  onRaceChange,
  onBackgroundChange,
  onPlayerNameChange,
  onPortraitUrlChange,
}: CreatorStepBasicsProps) {
  const filteredSubclasses = subclasses.filter((s) => s.classId === classId);
  const selectedClass = classes.find((c) => c.id === classId);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Character name"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Level"
        type="number"
        inputProps={{ min: 1, max: 20 }}
        value={level}
        onChange={(e) => onLevelChange(parseInt(e.target.value, 10) || 1)}
        fullWidth
      />
      <TextField
        select
        label="Class"
        value={classId}
        onChange={(e) => {
          onClassIdChange(e.target.value);
          onSubclassIdChange('');
        }}
        fullWidth
      >
        <MenuItem value="">— Select class —</MenuItem>
        {classes.map((c) => (
          <MenuItem key={c.id} value={c.id}>
            {c.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Subclass"
        value={subclassId}
        onChange={(e) => onSubclassIdChange(e.target.value)}
        fullWidth
        disabled={!classId || filteredSubclasses.length === 0}
      >
        <MenuItem value="">— None / later —</MenuItem>
        {filteredSubclasses.map((s) => (
          <MenuItem key={s.id} value={s.id}>
            {s.name}
          </MenuItem>
        ))}
      </TextField>
      {selectedClass && (
        <Box sx={{ typography: 'caption', color: 'text.secondary' }}>
          Hit die: {selectedClass.statistics.hitDice} · Primary: {selectedClass.statistics.primaryAbility}
        </Box>
      )}
      <TextField label="Species (e.g. Human, Elf)" value={race} onChange={(e) => onRaceChange(e.target.value)} fullWidth />
      <TextField label="Background" value={background} onChange={(e) => onBackgroundChange(e.target.value)} fullWidth />
      <TextField label="Player name" value={playerName} onChange={(e) => onPlayerNameChange(e.target.value)} fullWidth />
      <TextField
        label="Portrait URL (Imgur, imgbb, etc.)"
        value={portraitUrl}
        onChange={(e) => onPortraitUrlChange(e.target.value)}
        fullWidth
        placeholder="https://..."
      />
    </Box>
  );
}
