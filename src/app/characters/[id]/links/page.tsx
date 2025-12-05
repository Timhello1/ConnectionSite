'use client';

import { Box, Typography, Paper, List, ListItem, ListItemText, Link } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { mockCharacters } from '../../../../data/mockCharacters';

export function generateStaticParams() {
  return mockCharacters.map((character) => ({
    id: character.id,
  }));
}

export default function CharacterLinksPage() {
  const params = useParams();
  const router = useRouter();
  const characterId = params.id as string;

  const character = mockCharacters.find((c) => c.id === characterId);

  if (!character) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" color="error">
          Character not found
        </Typography>
      </Box>
    );
  }

  const npcLinks = character.npcLinks || [];

  return (
    <Box sx={{ height: '100%', width: '100%', p: 3 }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {character.name} - NPC Connections
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          All notable characters and NPCs linked to {character.name}
        </Typography>

        {npcLinks.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No NPC connections yet.
          </Typography>
        ) : (
          <List>
            {npcLinks.map((link) => (
              <ListItem
                key={link.id}
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
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
                      variant="h6"
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
        )}
      </Paper>
    </Box>
  );
}
