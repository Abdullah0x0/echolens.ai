import React, { useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Typography, Paper, CircularProgress } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Import components
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import EmotionAnalysis from './components/EmotionAnalysis';
import ChatInterface from './components/ChatInterface';
import Settings from './components/Settings';
import ParticleBackground from './components/ParticleBackground';
import CustomCursor from './components/CustomCursor';
import ConfettiEffect from './components/ConfettiEffect';
import SkeletonLoader from './components/SkeletonLoader';

// Import utilities
import SoundEffects from './utils/SoundEffects';

// Layout component with AnimatePresence
const AnimatedRoutes = ({ emotionalState, updateEmotionalState, darkMode }) => {
  const location = useLocation();
  const [loading, setLoading] = useState({});
  
  // Track loading state for each route
  const startLoading = (path) => {
    setLoading(prev => ({ ...prev, [path]: true }));
    
    // For demo purposes, simulate loading delay
    setTimeout(() => {
      setLoading(prev => ({ ...prev, [path]: false }));
    }, 1000);
  };
  
  // Change route effect - play sound and start loading
  useEffect(() => {
    SoundEffects.playSound('click');
    startLoading(location.pathname);
  }, [location.pathname]);
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          loading['/'] 
            ? <SkeletonLoader type="dashboard" /> 
            : <Dashboard emotionalState={emotionalState} darkMode={darkMode} />
        } />
        <Route
          path="/analysis"
          element={
            loading['/analysis'] 
              ? <SkeletonLoader type="dashboard" /> 
              : <EmotionAnalysis updateEmotionalState={updateEmotionalState} darkMode={darkMode} />
          }
        />
        <Route
          path="/chat"
          element={
            loading['/chat'] 
              ? <SkeletonLoader type="chat" /> 
              : <ChatInterface emotionalState={emotionalState} darkMode={darkMode} />
          }
        />
        <Route path="/settings" element={
          loading['/settings'] 
            ? <SkeletonLoader type="dashboard" /> 
            : <Settings darkMode={darkMode} />
        } />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [emotionalState, setEmotionalState] = useState({
    emotion: 'neutral',
    sentiment: 'neutral',
    intensity: 'low',
  });
  
  const [darkMode, setDarkMode] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Trigger confetti for positive emotions
  useEffect(() => {
    if (['happy', 'excited', 'content'].includes(emotionalState.emotion)) {
      setShowConfetti(true);
      SoundEffects.playSound('success');
      
      // Hide confetti after animation
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [emotionalState.emotion]);
  
  // Preload sounds and initial setup
  useEffect(() => {
    // Preload sounds
    SoundEffects.preloadSounds();
    
    // Simulate initial loading
    const timer = setTimeout(() => {
      setInitialLoading(false);
      // Play a welcome sound
      SoundEffects.playSound('notification');
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    SoundEffects.playSound('click');
    setDarkMode(!darkMode);
  };

  // Create a dynamic theme based on the mode
  const theme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#2196f3',
      },
      secondary: {
        main: '#f50057',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 500,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 500,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 500,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
    },
  }), [darkMode]);

  const updateEmotionalState = (newState) => {
    setEmotionalState(newState);
  };

  // Initial loading screen
  if (initialLoading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            bgcolor: 'background.default'
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: 120,
              height: 120,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 3
            }}
          >
            <CircularProgress size={100} sx={{ position: 'absolute' }} />
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #2196f3, #21CBF3)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent',
              }}
            >
              RM
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ mb: 1 }}>
            RoboMind
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Initializing your AI companion...
          </Typography>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            position: 'relative',
          }}
        >
          <CustomCursor darkMode={darkMode} />
          <ParticleBackground darkMode={darkMode} />
          <ConfettiEffect active={showConfetti} />
          
          <Header 
            emotionalState={emotionalState} 
            darkMode={darkMode} 
            toggleDarkMode={toggleDarkMode} 
          />
          <Container component="main" sx={{ mt: 4, mb: 4, flex: 1, position: 'relative', zIndex: 2 }}>
            <AnimatedRoutes 
              emotionalState={emotionalState} 
              updateEmotionalState={updateEmotionalState} 
              darkMode={darkMode}
            />
          </Container>
          <Footer darkMode={darkMode} />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App; 