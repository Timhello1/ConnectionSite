'use client';

import { Box, Typography, Paper, Divider, List, ListItem, ListItemText, Link } from '@mui/material';
import { Character } from '../../types/character';
import { useRouter } from 'next/navigation';

interface CharacterLinksSectionProps {
  character: Character;
}

export default function CharacterLinksSection({ character }: CharacterLinksSectionProps) {
  const router = useRouter();

  if (!character.npcLinks || character.npcLinks.length === 0) {
    return (
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" component="h3" gutterBottom>
          NPC Connections
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" color="text.secondary">
          No NPC connections yet.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" component="h3" gutterBottom>
        NPC Connections
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List>
        {character.npcLinks.map((link) => (
          <ListItem
            key={link.id}
            sx={{
              px: 0,
              '&:hover': {
                bgcolor: 'action.hover',
                borderRadius: 1,
              },
            }}
          >
            <ListItemText
              primary={
                <Link
                  component="button"
                  variant="body1"
                  onClick={() => router.push(`/npcs#${link.id}`)}
                  sx={{
                    color: 'primary.light',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                    cursor: 'pointer',
                  }}
                >
                  {link.name}
                </Link>
              }
              secondary={link.relationship}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}