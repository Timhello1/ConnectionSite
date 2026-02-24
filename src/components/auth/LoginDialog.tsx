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
import { getAuthErrorMessage } from '../../lib/firebase/authErrors';

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
    } catch (err) {
      setError(getAuthErrorMessage(err));
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
    } catch (err) {
      setError(getAuthErrorMessage(err));
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
          borderRadius: 2,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      <DialogContent sx={{ p: 0, position: 'relative' }}>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            position: 'absolute',
            right: 12,
            top: 12,
            zIndex: 1,
            color: 'text.secondary',
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        <Box sx={{ p: 4, pt: 5 }}>
          <Box sx={{ mb: 3.5, textAlign: 'center' }}>
            <Fade in={!isTransitioning} timeout={300}>
              <Box>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 0.5, color: 'text.primary' }}>
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
                    py: 1.25,
                    mb: 2.5,
                    borderRadius: 1.5,
                    textTransform: 'none',
                    fontWeight: 500,
                    boxShadow: 'none',
                    '&:hover': { boxShadow: 'none', bgcolor: 'primary.dark' },
                  }}
                >
                  {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
                </Button>

                <Divider sx={{ my: 2.5 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ px: 1.5 }}>
                    or
                  </Typography>
                </Divider>

                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  startIcon={<GoogleIcon sx={{ fontSize: 20 }} />}
                  sx={{
                    py: 1.25,
                    mb: 2.5,
                    borderRadius: 1.5,
                    textTransform: 'none',
                    fontWeight: 500,
                    borderColor: 'divider',
                    color: 'text.primary',
                    '&:hover': {
                      borderColor: 'text.secondary',
                      bgcolor: 'rgba(255, 255, 255, 0.04)',
                    },
                  }}
                >
                  Continue with Google
                </Button>

                <Box sx={{ textAlign: 'center' }}>
                  <Button
                    onClick={handleModeSwitch}
                    disabled={loading || isTransitioning}
                    variant="text"
                    size="small"
                    sx={{
                      textTransform: 'none',
                      color: 'text.secondary',
                      fontWeight: 500,
                      '&:hover': { bgcolor: 'transparent', color: 'text.primary' },
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