import React, { useState } from 'react';
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../constants/theme';
import { ProfileCard } from '../components/ProfileCard';
import { mockProfiles } from '../constants/mockData';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const Box = createBox<Theme>();
const Text = createText<Theme>();
const AnimatedBox = Animated.createAnimatedComponent(Box);

export const ProfileViewerScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const handleLike = () => {
    if (currentIndex < mockProfiles.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleSkip = () => {
    if (currentIndex < mockProfiles.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleMessage = () => {
    // TODO: Implement messaging
  };

  return (
    <Box flex={1} backgroundColor="mainBackground">
      <StatusBar style="light" />
      
      {/* Header */}
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        padding="l"
        backgroundColor="mainBackground"
      >
        <TouchableOpacity onPress={() => setShowFilters(true)}>
          <Box
            backgroundColor="cardBackground"
            padding="m"
            borderRadius="m"
            flexDirection="row"
            alignItems="center"
          >
            <Text variant="body" color="primary" marginRight="s">
              🎯
            </Text>
            <Text variant="body" color="textPrimary">
              Filters
            </Text>
          </Box>
        </TouchableOpacity>

        <Text variant="header" color="primary" style={{ fontSize: 28 }}>
          flawed
        </Text>

        <TouchableOpacity>
          <Box
            backgroundColor="cardBackground"
            padding="m"
            borderRadius="m"
          >
            <Text variant="body" color="textPrimary">
              👤
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>

      {/* Profile Cards */}
      <Box flex={1} alignItems="center" justifyContent="center">
        {mockProfiles.map((profile, index) => {
          if (index < currentIndex) return null;
          if (index > currentIndex + 2) return null;

          return (
            <AnimatedBox
              key={profile.id}
              position="absolute"
              entering={FadeIn}
              style={[
                styles.card,
                {
                  transform: [
                    { scale: index === currentIndex ? 1 : 0.95 },
                    { translateY: index === currentIndex ? 0 : -10 },
                  ],
                },
              ]}
            >
              <ProfileCard
                profile={profile}
                onLike={handleLike}
                onSkip={handleSkip}
                onMessage={handleMessage}
              />
            </AnimatedBox>
          );
        })}
      </Box>

      {/* Quick Stats */}
      <Box
        padding="l"
        backgroundColor="cardBackground"
        borderTopLeftRadius="xl"
        borderTopRightRadius="xl"
      >
        <Box flexDirection="row" justifyContent="space-between">
          <Box alignItems="center">
            <Text variant="header" color="primary">
              23
            </Text>
            <Text variant="label" color="textSecondary">
              Matches
            </Text>
          </Box>
          <Box alignItems="center">
            <Text variant="header" color="paleTeal">
              12
            </Text>
            <Text variant="label" color="textSecondary">
              Messages
            </Text>
          </Box>
          <Box alignItems="center">
            <Text variant="header" color="coralRed">
              45
            </Text>
            <Text variant="label" color="textSecondary">
              Profile Views
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    alignItems: 'center',
  },
});
