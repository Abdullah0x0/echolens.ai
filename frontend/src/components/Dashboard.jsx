import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  Card, 
  CardContent, 
  CardActions,
  Divider,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform } from 'framer-motion';

// Icons
import HearingIcon from '@mui/icons-material/Hearing';
import SurroundSoundIcon from '@mui/icons-material/SurroundSound';
import ChatIcon from '@mui/icons-material/Chat';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

// Animated MUI components
const MotionPaper = motion(Paper);
const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: { 
    duration: 2, 
    repeat: Infinity,
    repeatType: "reverse" 
  }
};

// 3D Card component with tilt effect
const Tilt3DCard = ({ children, depth = 5 }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform mouse movement to rotation
  const rotateX = useTransform(y, [-100, 100], [depth, -depth]);
  const rotateY = useTransform(x, [-100, 100], [-depth, depth]);
  
  const handleMouseMove = (e) => {
    // Get position of mouse relative to card
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center (adjusted for sensitivity)
    x.set((e.clientX - centerX) / 4);
    y.set((e.clientY - centerY) / 4);
  };
  
  const handleMouseLeave = () => {
    // Reset to original position with a spring animation
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.div
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
        width: "100%",
        height: "100%"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%"
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const Dashboard = ({ emotionalState, darkMode, setActiveTab }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeCard, setActiveCard] = useState(null);

  // Main action cards
  const mainFeatures = [
    { 
      id: 'speech',
      title: 'Speech Recognition', 
      description: 'Transcribe spoken language and detect emotional tone in real-time',
      icon: <HearingIcon fontSize="large" color="primary" />,
      tabIndex: 1,
      color: '#2196f3'
    },
    { 
      id: 'spatial',
      title: 'Sound Detection', 
      description: 'Identify important sounds in your environment and their direction',
      icon: <SurroundSoundIcon fontSize="large" color="primary" />,
      tabIndex: 2,
      color: '#9c27b0'
    },
    { 
      id: 'chat',
      title: 'AI Assistant', 
      description: 'Get support and learn more about your audio environment',
      icon: <ChatIcon fontSize="large" color="primary" />,
      tabIndex: 3,
      color: '#ff5722'
    }
  ];

  return (
    <MotionBox
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Hero section */}
      <MotionPaper 
        component={motion.div}
        variants={itemVariants}
        elevation={0}
        sx={{ 
          p: 4, 
          mb: 4, 
          borderRadius: 4,
          background: 'linear-gradient(120deg, #2196f3 0%, #21cbf3 100%)',
          color: 'white',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <MotionBox
          component={motion.div}
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
          }}
          animate={{
            x: [0, 10, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <MotionTypography 
              variant="h3" 
              gutterBottom 
              fontWeight="bold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Welcome to EchoLens.AI
            </MotionTypography>
            <MotionTypography 
              variant="h5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Your Sound & Emotion Translator
            </MotionTypography>
            <MotionTypography 
              variant="body1" 
              sx={{ mt: 2 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              EchoLens.AI uses advanced AI to detect environmental sounds and emotional tones, providing real-time 
              translations for Deaf and hard-of-hearing users. Try both the speech recognition and spatial sound detection features.
            </MotionTypography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <MotionBox
              component={motion.div}
              animate={pulseAnimation}
              drag
              dragConstraints={{
                top: -10,
                left: -10,
                right: 10,
                bottom: 10,
              }}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
            >
              <SmartToyIcon sx={{ 
                fontSize: 160, 
                opacity: 0.9,
                filter: 'drop-shadow(0 0 15px rgba(0, 0, 0, 0.3))'
              }} />
            </MotionBox>
          </Grid>
        </Grid>
      </MotionPaper>

      {/* Emotional state feedback (only shown when relevant) */}
      {emotionalState && emotionalState.emotion && emotionalState.emotion !== 'neutral' && (
        <MotionPaper 
          component={motion.div}
          variants={itemVariants}
          elevation={3} 
          sx={{ 
            p: 3, 
            mb: 4, 
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'primary.light',
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'hidden'
          }}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <MotionBox
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '5px',
              background: 'linear-gradient(90deg, #2196f3, #21cbf3)'
            }}
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        
          <Typography variant="h6" gutterBottom>
            Emotion Detected
          </Typography>
          <Typography variant="body1">
            Current emotion: <strong>{emotionalState.emotion}</strong> ({emotionalState.intensity || 'medium'} intensity)
          </Typography>
          <MotionBox
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{ mt: 2 }}
          >
            <Button 
              variant="contained" 
              color="primary"
              size="small"
              onClick={() => setActiveTab && setActiveTab(3)}
              endIcon={<ArrowForwardIcon />}
            >
              Explore with AI Assistant
            </Button>
          </MotionBox>
        </MotionPaper>
      )}

      {/* Main features section */}
      <MotionTypography 
        component={motion.div}
        variants={itemVariants}
        variant="h5" 
        gutterBottom 
        sx={{ mt: 4, mb: 3, fontWeight: 'bold' }}
      >
        Main Features
      </MotionTypography>
      <Grid container spacing={3}>
        {mainFeatures.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Tilt3DCard>
              <MotionCard 
                component={motion.div}
                variants={itemVariants}
                elevation={2} 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transformStyle: "preserve-3d",
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onClick={() => setActiveTab && setActiveTab(feature.tabIndex)}
                onMouseEnter={() => setActiveCard(feature.id)}
                onMouseLeave={() => setActiveCard(null)}
                whileHover={{ 
                  boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.15)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <MotionBox
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '5px',
                    background: `linear-gradient(90deg, ${feature.color}, ${feature.color}bb)`
                  }}
                />
                <CardContent sx={{ flexGrow: 1, position: 'relative' }}>
                  <MotionBox 
                    sx={{
                      textAlign: 'center',
                      mb: 2,
                      transformStyle: "preserve-3d",
                      transform: "translateZ(20px)",
                    }}
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    animate={{
                      y: activeCard === feature.id ? [0, -5, 0] : 0
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: activeCard === feature.id ? 1 : 0
                    }}
                  >
                    {feature.icon}
                  </MotionBox>
                  <Typography 
                    variant="h6" 
                    component="h2" 
                    gutterBottom
                    sx={{
                      transform: "translateZ(10px)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                      transform: "translateZ(5px)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ position: 'relative' }}>
                  <MotionButton 
                    size="small" 
                    color="primary" 
                    onClick={() => setActiveTab && setActiveTab(feature.tabIndex)}
                    sx={{ ml: 1, mb: 1 }}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    endIcon={<ArrowForwardIcon />}
                  >
                    Open
                  </MotionButton>
                </CardActions>
              </MotionCard>
            </Tilt3DCard>
          </Grid>
        ))}
      </Grid>

      {/* About section - simplified */}
      <MotionPaper 
        component={motion.div}
        variants={itemVariants}
        elevation={2} 
        sx={{ p: 3, mt: 4, borderRadius: 2 }}
        whileHover={{ boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.08)" }}
      >
        <Typography variant="h5" gutterBottom fontWeight="bold">
          About EchoLens.AI
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" paragraph>
          EchoLens.AI is an advanced sound and emotion translator designed to support Deaf and hard-of-hearing users. It uses state-of-the-art AI to analyze audio signals, voice patterns, and provide contextual information about the surrounding environment.
        </Typography>
        <MotionBox 
          component={motion.div}
          sx={{ display: 'flex', alignItems: 'center', mt: 2 }}
          initial={{ opacity: 0.8 }}
          whileHover={{ 
            opacity: 1,
            x: 5,
            transition: { duration: 0.2 }
          }}
        >
          <AccessibilityNewIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="body2" fontWeight="medium">
            EchoLens.AI is designed to be fully accessible to Deaf and hard-of-hearing users.
          </Typography>
        </MotionBox>
      </MotionPaper>
    </MotionBox>
  );
};

export default Dashboard; 