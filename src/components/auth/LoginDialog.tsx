'use client';

import {
  Dialog,
  DialogContent,
  Button,
  TextField,
  Box,
  Typography,
  Divider,
  Alert,
  Fade,
  Slide,
  IconButton,
} from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '@mui/icons-material/Google';
import { useAuth } from '../../contexts/AuthContext';

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginDialog({ open, onClose }: LoginDialogProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { login, signup, loginWithGoogle } = useAuth();

  const handleModeSwitch = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsSignUp(!isSignUp);
      setError('');
      setEmail('');
      setPassword('');
      setIsTransitioning(false);
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      onClose();
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.1) 0%, rgba(146, 64, 14, 0.1) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(217, 119, 6, 0.3)',
        },
      }}
    >
      <DialogContent sx={{ p: 0, position: 'relative' }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            zIndex: 1,
            color: 'text.secondary',
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ p: 4, pt: 6 }}>
          {/* Header with animated title */}
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Fade in={!isTransitioning} timeout={300}>
              <Box>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {isSignUp ? 'Create Account' : 'Welcome Back'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {isSignUp
                    ? 'Join the adventure and start your journey'
                    : 'Sign in to continue your campaign'}
                </Typography>
              </Box>
            </Fade>
          </Box>

          {/* Form with slide animation */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              position: 'relative',
              minHeight: 400,
              overflow: 'hidden',
            }}
          >
            <Slide
              direction={isSignUp ? 'left' : 'right'}
              in={!isTransitioning}
              timeout={300}
              mountOnEnter
              unmountOnExit
            >
              <Box>
                {error && (
                  <Alert
                    severity="error"
                    sx={{
                      mb: 3,
                      borderRadius: 2,
                      bgcolor: 'error.dark',
                      color: 'error.light',
                    }}
                  >
                    {error}
                  </Alert>
                )}

                <TextField
                  fullWidth
                  required
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                    },
                  }}
                />

                <TextField
                  fullWidth
                  required
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                    },
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    mb: 3,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    boxShadow: 3,
                    '&:hover': {
                      boxShadow: 6,
                    },
                  }}
                >
                  {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
                </Button>

                <Divider sx={{ my: 3 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
                    OR
                  </Typography>
                </Divider>

                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  startIcon={<GoogleIcon />}
                  sx={{
                    py: 1.5,
                    mb: 3,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1rem',
                    borderColor: 'divider',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'rgba(217, 119, 6, 0.1)',
                    },
                  }}
                >
                  Continue with Google
                </Button>

                <Box sx={{ textAlign: 'center' }}>
                  <Button
                    onClick={handleModeSwitch}
                    disabled={loading || isTransitioning}
                    sx={{
                      textTransform: 'none',
                      color: 'primary.light',
                      '&:hover': {
                        bgcolor: 'rgba(217, 119, 6, 0.1)',
                      },
                    }}
                  >
                    {isSignUp
                      ? 'Already have an account? Sign In'
                      : "Don't have an account? Sign Up"}
                  </Button>
                </Box>
              </Box>
            </Slide>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}