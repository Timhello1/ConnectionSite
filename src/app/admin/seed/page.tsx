'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, LinearProgress, Alert } from '@mui/material';
import { seedSpells2024, seedClasses2024, seedSubclasses2024 } from '../../../lib/seed/seedFrom2024';

type Status = 'idle' | 'loading' | 'done' | 'error';

export default function SeedPage() {
  const [spellStatus, setSpellStatus] = useState<Status>('idle');
  const [spellProgress, setSpellProgress] = useState({ current: 0, total: 0, name: '' });
  const [spellResult, setSpellResult] = useState<{ saved: number; failed: number } | null>(null);

  const [classStatus, setClassStatus] = useState<Status>('idle');
  const [classProgress, setClassProgress] = useState({ current: 0, total: 0, name: '' });
  const [classResult, setClassResult] = useState<{ saved: number; failed: number } | null>(null);

  const [subclassStatus, setSubclassStatus] = useState<Status>('idle');
  const [subclassProgress, setSubclassProgress] = useState({ current: 0, total: 0, name: '' });
  const [subclassResult, setSubclassResult] = useState<{ saved: number; failed: number } | null>(null);

  const handleSeedSpells = async () => {
    setSpellStatus('loading');
    setSpellResult(null);
    try {
      const result = await seedSpells2024((current, total, name) => {
        setSpellProgress({ current, total, name });
      });
      setSpellResult(result);
      setSpellStatus('done');
    } catch (e) {
      console.error(e);
      setSpellStatus('error');
    }
  };

  const handleSeedClasses = async () => {
    setClassStatus('loading');
    setClassResult(null);
    try {
      const result = await seedClasses2024((current, total, name) => {
        setClassProgress({ current, total, name });
      });
      setClassResult(result);
      setClassStatus('done');
    } catch (e) {
      console.error(e);
      setClassStatus('error');
    }
  };

  const handleSeedSubclasses = async () => {
    setSubclassStatus('loading');
    setSubclassResult(null);
    try {
      const result = await seedSubclasses2024((current, total, name) => {
        setSubclassProgress({ current, total, name });
      });
      setSubclassResult(result);
      setSubclassStatus('done');
    } catch (e) {
      console.error(e);
      setSubclassStatus('error');
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 560, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Seed database – 2024 SRD (5.2)
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Load 2024 D&D core rules data from the app into your Firestore. Data is from the{' '}
        <a href="https://media.dndbeyond.com/compendium-images/srd/5.2/SRD_CC_v5.2.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
          SRD 5.2 (CC-BY-4.0)
        </a>{' '}
        and{' '}
        <a href="https://5e2025.opengamingnetwork.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
          5e2025 SRD site
        </a>
        . No external API – everything is bundled.
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>Spells</Typography>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
          Cantrips + levels 1–3 (2024 SRD–compatible)
        </Typography>
        {spellStatus === 'loading' && (
          <Box sx={{ mb: 1 }}>
            <LinearProgress variant="determinate" value={spellProgress.total ? (spellProgress.current / spellProgress.total) * 100 : 0} sx={{ mb: 0.5 }} />
            <Typography variant="caption">{spellProgress.current} / {spellProgress.total} — {spellProgress.name}</Typography>
          </Box>
        )}
        {spellStatus === 'done' && spellResult && (
          <Alert severity="success" sx={{ mb: 1 }}>Saved {spellResult.saved} spells. Failed: {spellResult.failed}</Alert>
        )}
        {spellStatus === 'error' && <Alert severity="error" sx={{ mb: 1 }}>Something went wrong. Check console.</Alert>}
        <Button variant="contained" onClick={handleSeedSpells} disabled={spellStatus === 'loading'}>
          {spellStatus === 'loading' ? 'Loading…' : 'Load spells'}
        </Button>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>Classes</Typography>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
          12 classes with hit dice, proficiencies, and skill choices (2024)
        </Typography>
        {classStatus === 'loading' && (
          <Box sx={{ mb: 1 }}>
            <LinearProgress variant="determinate" value={classProgress.total ? (classProgress.current / classProgress.total) * 100 : 0} sx={{ mb: 0.5 }} />
            <Typography variant="caption">{classProgress.current} / {classProgress.total} — {classProgress.name}</Typography>
          </Box>
        )}
        {classStatus === 'done' && classResult && (
          <Alert severity="success" sx={{ mb: 1 }}>Saved {classResult.saved} classes. Failed: {classResult.failed}</Alert>
        )}
        {classStatus === 'error' && <Alert severity="error" sx={{ mb: 1 }}>Something went wrong. Check console.</Alert>}
        <Button variant="contained" onClick={handleSeedClasses} disabled={classStatus === 'loading'}>
          {classStatus === 'loading' ? 'Loading…' : 'Load classes'}
        </Button>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>Subclasses</Typography>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
          Subclasses linked to their class (2024 SRD)
        </Typography>
        {subclassStatus === 'loading' && (
          <Box sx={{ mb: 1 }}>
            <LinearProgress variant="determinate" value={subclassProgress.total ? (subclassProgress.current / subclassProgress.total) * 100 : 0} sx={{ mb: 0.5 }} />
            <Typography variant="caption">{subclassProgress.current} / {subclassProgress.total} — {subclassProgress.name}</Typography>
          </Box>
        )}
        {subclassStatus === 'done' && subclassResult && (
          <Alert severity="success" sx={{ mb: 1 }}>Saved {subclassResult.saved} subclasses. Failed: {subclassResult.failed}</Alert>
        )}
        {subclassStatus === 'error' && <Alert severity="error" sx={{ mb: 1 }}>Something went wrong. Check console.</Alert>}
        <Button variant="contained" onClick={handleSeedSubclasses} disabled={subclassStatus === 'loading'}>
          {subclassStatus === 'loading' ? 'Loading…' : 'Load subclasses'}
        </Button>
      </Paper>
    </Box>
  );
}
