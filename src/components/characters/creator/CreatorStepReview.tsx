'use client';

import { Box, Typography, Paper } from '@mui/material';
import type { Character } from '../../../types/character';
import type { DndClass } from '../../../types/class';
import type { Subclass } from '../../../types/subclass';

interface CreatorStepReviewProps {
  character: Character;
  dndClass: DndClass | null;
  subclass: Subclass | null;
}

export default function CreatorStepReview({ character, dndClass, subclass }: CreatorStepReviewProps) {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Summary
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, typography: 'body2' }}>
        <Box><strong>Name:</strong> {character.name}</Box>
        <Box><strong>Level:</strong> {character.level}</Box>
        <Box><strong>Class:</strong> {dndClass?.name ?? character.class}</Box>
        {subclass && <Box><strong>Subclass:</strong> {subclass.name}</Box>}
        {character.race && <Box><strong>Species:</strong> {character.race}</Box>}
        {character.background && <Box><strong>Background:</strong> {character.background}</Box>}
        {character.playerName && <Box><strong>Player:</strong> {character.playerName}</Box>}
        {character.abilityScores && (
          <Box>
            <strong>Ability scores:</strong>{' '}
            STR {character.abilityScores.strength.score} ({character.abilityScores.strength.modifier >= 0 ? '+' : ''}{character.abilityScores.strength.modifier})
            , DEX {character.abilityScores.dexterity.score}, CON {character.abilityScores.constitution.score},
            INT {character.abilityScores.intelligence.score}, WIS {character.abilityScores.wisdom.score}, CHA {character.abilityScores.charisma.score}
          </Box>
        )}
        {character.combat && (
          <Box>
            <strong>Combat:</strong> AC {character.combat.armorClass}, HP {character.combat.hitPointCurrent}/{character.combat.hitPointMax}, {character.combat.hitDice}
          </Box>
        )}
        <Box><strong>Cantrips:</strong> {(character.cantripIds?.length ?? 0)} · <strong>Spells:</strong> {(character.preparedSpellIds?.length ?? 0)}</Box>
      </Box>
    </Paper>
  );
}
