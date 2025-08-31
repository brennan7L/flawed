import React, { useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../constants/theme';
import { EnhancedProfileCard } from '../components/EnhancedProfileCard';
import { BottomNav } from '../components/BottomNav';
import { mockProfiles } from '../constants/mockData';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
} from 'react-native-reanimated';

const Box = createBox<Theme>();
const Text = createText<Theme>();
const AnimatedBox = Animated.createAnimatedComponent(Box);

export const HomeScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentScreen, setCurrentScreen] = useState('Match');
  const [showOnboarding, setShowOnboarding] = useState(true);

  const handleLike = useCallback(() => {
    if (currentIndex < mockProfiles.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex]);

  const handleSkip = useCallback(() => {
    if (currentIndex < mockProfiles.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex]);

  const handleMessage = useCallback(() => {
    // TODO: Implement messaging
  }, []);

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
        <Text variant="header" color="primary" style={{ fontSize: 36, fontWeight: 'bold' }}>
          flawed
        </Text>

        <TouchableOpacity>
          <Box
            backgroundColor="cardBackground"
            padding="m"
            borderRadius="m"
            flexDirection="row"
            alignItems="center"
          >
            <Text variant="body" color="primary" marginRight="s">
              🔥
            </Text>
            <Text variant="body" color="textPrimary">
              23 Likes
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>

      {/* Main Content */}
      <Box flex={1} alignItems="center" justifyContent="center">
        {mockProfiles.map((profile, index) => {
          if (index < currentIndex) return null;
          if (index > currentIndex + 2) return null;

          const isActive = index === currentIndex;

          return (
            <AnimatedBox
              key={profile.id}
              position="absolute"
              entering={SlideInRight}
              exiting={SlideOutLeft}
              style={[
                styles.cardContainer,
                {
                  zIndex: mockProfiles.length - index,
                },
              ]}
            >
              <EnhancedProfileCard
                profile={profile}
                onLike={handleLike}
                onSkip={handleSkip}
                onMessage={handleMessage}
                isActive={isActive}
              />
            </AnimatedBox>
          );
        })}

        {/* No More Profiles State */}
        {currentIndex >= mockProfiles.length && (
          <AnimatedBox
            entering={FadeIn}
            padding="xl"
            alignItems="center"
          >
            <Text variant="header" color="primary" marginBottom="m">
              No More Profiles
            </Text>
            <Text variant="body" color="textSecondary" textAlign="center">
              We're finding more people who embrace their flaws. Check back soon!
            </Text>
            <TouchableOpacity onPress={() => setCurrentIndex(0)} style={{ marginTop: 20 }}>
              <Box backgroundColor="primary" padding="m" borderRadius="m" alignItems="center">
                <Text variant="body" color="white">Start Over</Text>
              </Box>
            </TouchableOpacity>
          </AnimatedBox>
        )}
      </Box>

      {/* Onboarding Overlay */}
      {showOnboarding && (
        <AnimatedBox
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          backgroundColor="mainBackground"
          opacity={0.95}
          entering={FadeIn}
          exiting={FadeOut}
          padding="xl"
          alignItems="center"
          justifyContent="center"
        >
          <Text variant="header" color="primary" marginBottom="l" textAlign="center">
            Welcome to Flawed
          </Text>
          <Text variant="body" color="textSecondary" marginBottom="xl" textAlign="center">
            Swipe right to like someone's flaws,{'\n'}
            left to keep looking,{'\n'}
            or tap the message button to start a conversation.
          </Text>
          <TouchableOpacity onPress={() => setShowOnboarding(false)} style={{ width: '100%' }}>
            <Box
              backgroundColor="primary"
              padding="m"
              borderRadius="m"
              alignItems="center"
            >
              <Text variant="body" color="white">
                Embrace the Flaws
              </Text>
            </Box>
          </TouchableOpacity>
        </AnimatedBox>
      )}

      {/* Bottom Navigation */}
      <BottomNav
        currentScreen={currentScreen}
        onScreenChange={setCurrentScreen}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    alignItems: 'center',
  },
});