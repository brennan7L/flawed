import React from 'react';
import { Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../constants/theme';
import { FlawTag } from './FlawTag';
import { Profile } from '../constants/mockData';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const Box = createBox<Theme>();
const Text = createText<Theme>();
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const AnimatedBox = Animated.createAnimatedComponent(Box);

type ProfileCardProps = {
  profile: Profile;
  onLike?: () => void;
  onSkip?: () => void;
  onMessage?: () => void;
};

export const ProfileCard = ({ profile, onLike, onSkip, onMessage }: ProfileCardProps) => {
  return (
    <AnimatedBox
      entering={FadeIn.duration(400)}
      exiting={FadeOut.duration(300)}
      backgroundColor="cardBackground"
      borderRadius="xl"
      overflow="hidden"
      width={SCREEN_WIDTH - 32}
      style={styles.shadow}
    >
      {/* Profile Image */}
      <Image
        source={{ uri: profile.photos[0] }}
        style={styles.image}
      />

      {/* Profile Info Overlay */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        padding="l"
        style={styles.gradient}
      >
        <Text variant="header" color="white" marginBottom="xs">
          {profile.name}, {profile.age}
        </Text>
        <Text variant="body" color="white" marginBottom="m">
          {profile.city}
        </Text>

        {/* Bio */}
        <Text variant="body" color="white" marginBottom="l">
          {profile.bio}
        </Text>

        {/* Flaw Tags */}
        <Box flexDirection="row" flexWrap="wrap" marginBottom="l">
          {profile.flaws.map((flaw) => (
            <FlawTag
              key={flaw.id}
              label={flaw.label}
              category={flaw.category}
              type="relate"
            />
          ))}
        </Box>

        {/* Action Buttons */}
        <Box flexDirection="row" justifyContent="space-between">
          <TouchableOpacity onPress={onSkip} style={styles.actionButton}>
            <Box
              backgroundColor="white"
              padding="m"
              borderRadius="full"
              opacity={0.9}
            >
              <Text variant="body" color="textPrimary">
                ✕
              </Text>
            </Box>
          </TouchableOpacity>

          <TouchableOpacity onPress={onMessage} style={styles.actionButton}>
            <Box
              backgroundColor="paleTeal"
              padding="m"
              borderRadius="full"
            >
              <Text variant="body" color="white">
                💭
              </Text>
            </Box>
          </TouchableOpacity>

          <TouchableOpacity onPress={onLike} style={styles.actionButton}>
            <Box
              backgroundColor="primary"
              padding="m"
              borderRadius="full"
            >
              <Text variant="body" color="white">
                ❤️
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>
    </AnimatedBox>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: SCREEN_WIDTH * 1.3,
    resizeMode: 'cover',
  },
  gradient: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingTop: 100,
    background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%)',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButton: {
    transform: [{ scale: 1.2 }],
  },
});
