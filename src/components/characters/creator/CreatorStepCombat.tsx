'use client';

import { Box, TextField } from '@mui/material';
import type { CombatStats } from '../../../types/character';

interface CreatorStepCombatProps {
  combat: CombatStats;
  onChange: (combat: CombatStats) => void;
}

export default function CreatorStepCombat({ combat, onChange }: CreatorStepCombatProps) {
  const update = (partial: Partial<CombatStats>) => onChange({ ...combat, ...partial });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <TextField
          label="Armor Class"
          type="number"
          value={combat.armorClass}
          onChange={(e) => update({ armorClass: parseInt(e.target.value, 10) || 0 })}
        />
        <TextField
          label="Proficiency bonus"
          type="number"
          value={combat.proficiencyBonus}
          onChange={(e) => update({ proficiencyBonus: parseInt(e.target.value, 10) || 0 })}
        />
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <TextField
          label="Hit point max"
          type="number"
          value={combat.hitPointMax}
          onChange={(e) => update({ hitPointMax: parseInt(e.target.value, 10) || 0 })}
        />
        <TextField
          label="Hit point current"
          type="number"
          value={combat.hitPointCurrent}
          onChange={(e) => update({ hitPointCurrent: parseInt(e.target.value, 10) || 0 })}
        />
      </Box>
      <TextField
        label="Hit dice (e.g. 1d8)"
        value={combat.hitDice}
        onChange={(e) => update({ hitDice: e.target.value })}
        fullWidth
      />
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <TextField
          label="Initiative"
          type="number"
          value={combat.initiative}
          onChange={(e) => update({ initiative: parseInt(e.target.value, 10) || 0 })}
        />
        <TextField
          label="Speed (ft)"
          type="number"
          value={combat.speed}
          onChange={(e) => update({ speed: parseInt(e.target.value, 10) || 0 })}
        />
      </Box>
    </Box>
  );
}
