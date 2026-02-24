'use client';

import { Box, FormControl, InputLabel, Select, MenuItem, Chip, OutlinedInput } from '@mui/material';
import type { Spell } from '../../../types/spell';

interface CreatorStepSpellsProps {
  cantripIds: string[];
  preparedSpellIds: string[];
  spells: Spell[];
  onCantripIdsChange: (ids: string[]) => void;
  onPreparedSpellIdsChange: (ids: string[]) => void;
}

export default function CreatorStepSpells({
  cantripIds,
  preparedSpellIds,
  spells,
  onCantripIdsChange,
  onPreparedSpellIdsChange,
}: CreatorStepSpellsProps) {
  const cantrips = spells.filter((s) => s.level === 0);
  const leveled = spells.filter((s) => s.level >= 1);

  const toggleCantrip = (id: string) => {
    if (cantripIds.includes(id)) {
      onCantripIdsChange(cantripIds.filter((x) => x !== id));
    } else {
      onCantripIdsChange([...cantripIds, id]);
    }
  };

  const togglePrepared = (id: string) => {
    if (preparedSpellIds.includes(id)) {
      onPreparedSpellIdsChange(preparedSpellIds.filter((x) => x !== id));
    } else {
      onPreparedSpellIdsChange([...preparedSpellIds, id]);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <FormControl fullWidth>
        <InputLabel>Cantrips</InputLabel>
        <Select
          multiple
          value={cantripIds}
          onChange={(e) => onCantripIdsChange(e.target.value as string[])}
          input={<OutlinedInput label="Cantrips" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((id) => {
                const s = cantrips.find((sp) => sp.id === id);
                return <Chip key={id} size="small" label={s?.name ?? id} onDelete={() => toggleCantrip(id)} />;
              })}
            </Box>
          )}
        >
          {cantrips.map((s) => (
            <MenuItem key={s.id} value={s.id}>
              {s.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Prepared / known spells (level 1+)</InputLabel>
        <Select
          multiple
          value={preparedSpellIds}
          onChange={(e) => onPreparedSpellIdsChange(e.target.value as string[])}
          input={<OutlinedInput label="Prepared / known spells (level 1+)" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((id) => {
                const s = leveled.find((sp) => sp.id === id);
                return <Chip key={id} size="small" label={s ? `${s.name} (${s.level})` : id} onDelete={() => togglePrepared(id)} />;
              })}
            </Box>
          )}
        >
          {leveled.map((s) => (
            <MenuItem key={s.id} value={s.id}>
              {s.name} (level {s.level})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
