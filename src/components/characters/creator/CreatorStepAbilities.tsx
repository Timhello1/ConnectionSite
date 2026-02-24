'use client';

import { Box, TextField } from '@mui/material';
import type { AbilityScores } from '../../../types/character';

const ABILITY_KEYS = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'] as const;

const LABELS: Record<(typeof ABILITY_KEYS)[number], string> = {
  strength: 'Strength',
  dexterity: 'Dexterity',
  constitution: 'Constitution',
  intelligence: 'Intelligence',
  wisdom: 'Wisdom',
  charisma: 'Charisma',
};

interface CreatorStepAbilitiesProps {
  abilityScores: AbilityScores;
  onChange: (scores: AbilityScores) => void;
}

function modifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export default function CreatorStepAbilities({ abilityScores, onChange }: CreatorStepAbilitiesProps) {
  const update = (key: (typeof ABILITY_KEYS)[number], score: number) => {
    onChange({
      ...abilityScores,
      [key]: { score, modifier: modifier(score) },
    });
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 2 }}>
      {ABILITY_KEYS.map((key) => (
        <TextField
          key={key}
          label={LABELS[key]}
          type="number"
          inputProps={{ min: 1, max: 30 }}
          value={abilityScores[key].score}
          onChange={(e) => update(key, parseInt(e.target.value, 10) || 10)}
          helperText={`Modifier: ${abilityScores[key].modifier >= 0 ? '+' : ''}${abilityScores[key].modifier}`}
        />
      ))}
    </Box>
  );
}
