import React from 'react';
import { Image, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../constants/theme';
import { FlawTag } from './FlawTag';
import { Profile } from '../constants/mockData';
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolate,
  useAnimatedGestureHandler,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const Box = createBox<Theme>();
const Text = createText<Theme>();
const AnimatedBox = Animated.createAnimatedComponent(Box);
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const CARD_WIDTH = SCREEN_WIDTH - 32;
const CARD_HEIGHT = SCREEN_HEIGHT * 0.7;

type EnhancedProfileCardProps = {
  profile: Profile;
  onLike?: () => void;
  onSkip?: () => void;
  onMessage?: () => void;
  isActive?: boolean;
  style?: any;
};

export const EnhancedProfileCard = ({
  profile,
  onLike,
  onSkip,
  onMessage,
  isActive,
  style,
}: EnhancedProfileCardProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(isActive ? 1 : 0.9),
        },
      ],
      opacity: withSpring(isActive ? 1 : 0.8),
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = 0;
    },
    onActive: (event, ctx) => {
      ctx.currentX = event.translationX;
      
      // Add rotation based on swipe direction
      const rotation = interpolate(
        event.translationX,
        [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        [-15, 0, 15]
      );
    },
    onEnd: (event, ctx) => {
      if (Math.abs(event.translationX) > SCREEN_WIDTH * 0.4) {
        const x = event.translationX > 0 ? SCREEN_WIDTH : -SCREEN_WIDTH;
        if (x > 0 && onLike) {
          runOnJS(onLike)();
        } else if (x < 0 && onSkip) {
          runOnJS(onSkip)();
        }
      } else {
        ctx.currentX = withSpring(0);
      }
    },
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler} enabled={isActive}>
        <AnimatedBox style={[styles.card, animatedStyle, style]}>
          {/* Profile Image */}
          <Image
            source={{ uri: profile.photos[0] }}
            style={styles.image}
          />

          {/* Content Overlay */}
          <Box style={styles.overlay}>
            {/* Header Info */}
            <Box marginBottom="l">
              <Text variant="header" color="white" marginBottom="xs">
                {profile.name}, {profile.age}
              </Text>
              <Text variant="body" color="white" opacity={0.9}>
                {profile.city}
              </Text>
            </Box>

            {/* Bio Quote */}
            <Box
              backgroundColor="cardBackground"
              padding="m"
              borderRadius="m"
              opacity={0.95}
              marginBottom="l"
            >
              <Text variant="body" color="textPrimary">
                "{profile.bio}"
              </Text>
            </Box>

            {/* Flaw Tags */}
            <Box flexDirection="row" flexWrap="wrap" marginBottom="xl">
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
            <Box flexDirection="row" justifyContent="space-around">
              <TouchableOpacity onPress={onSkip}>
                <Box
                  backgroundColor="white"
                  padding="l"
                  borderRadius="full"
                  opacity={0.9}
                  style={styles.actionButton}
                >
                  <Text variant="header" color="textPrimary">
                    ✕
                  </Text>
                </Box>
              </TouchableOpacity>

              <TouchableOpacity onPress={onMessage}>
                <Box
                  backgroundColor="paleTeal"
                  padding="l"
                  borderRadius="full"
                  style={styles.actionButton}
                >
                  <Text variant="header" color="white">
                    💭
                  </Text>
                </Box>
              </TouchableOpacity>

              <TouchableOpacity onPress={onLike}>
                <Box
                  backgroundColor="primary"
                  padding="l"
                  borderRadius="full"
                  style={styles.actionButton}
                >
                  <Text variant="header" color="white">
                    ❤️
                  </Text>
                </Box>
              </TouchableOpacity>
            </Box>
          </Box>

          {/* Verification Badge */}
          <Box
            position="absolute"
            top={16}
            right={16}
            backgroundColor="primary"
            padding="s"
            borderRadius="m"
            opacity={0.9}
          >
            <Text variant="label" color="white">
              ✓ Verified
            </Text>
          </Box>
        </AnimatedBox>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 32,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  actionButton: {
    transform: [{ scale: 1.2 }],
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});