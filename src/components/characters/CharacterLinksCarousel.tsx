'use client';

import {
  Box,
  Typography,
  Paper,
  IconButton,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Character } from '../../types/character';

interface CharacterLinksCarouselProps {
  character: Character;
}

export default function CharacterLinksCarousel({ character }: CharacterLinksCarouselProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const npcLinks = character.npcLinks || [];

  useEffect(() => {
    if (npcLinks.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % npcLinks.length);
    }, 3000); // Auto-rotate every 3 seconds

    return () => clearInterval(interval);
  }, [npcLinks.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + npcLinks.length) % npcLinks.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % npcLinks.length);
  };

  const handleCardClick = (npcId: string) => {
    router.push(`/characters/${character.id}/links`);
  };

  if (npcLinks.length === 0) {
    return (
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" component="h3" gutterBottom>
          Notable Characters Linked
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No NPC connections yet.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" component="h3" gutterBottom>
        Notable Characters Linked
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mt: 2,
        }}
      >
        <IconButton
          onClick={handlePrevious}
          disabled={npcLinks.length <= 1}
          sx={{
            color: 'primary.main',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            gap: 2,
            overflow: 'hidden',
          }}
        >
          {npcLinks.map((link, index) => {
            const isActive = index === currentIndex;
            return (
              <Card
                key={link.id}
                sx={{
                  minWidth: 200,
                  flex: isActive ? 1 : 0.5,
                  opacity: isActive ? 1 : 0.6,
                  transform: isActive ? 'scale(1)' : 'scale(0.95)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
              >
                <CardActionArea onClick={() => handleCardClick(link.id)}>
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      {link.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {link.relationship}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </Box>

        <IconButton
          onClick={handleNext}
          disabled={npcLinks.length <= 1}
          sx={{
            color: 'primary.main',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
      {npcLinks.length > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
          {npcLinks.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: index === currentIndex ? 'primary.main' : 'action.disabled',
                transition: 'background-color 0.3s ease',
              }}
            />
          ))}
        </Box>
      )}
    </Paper>
  );
}