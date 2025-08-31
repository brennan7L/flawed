import React, { useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../constants/theme';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withSequence,
  withDelay,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';

const Box = createBox<Theme>();
const Text = createText<Theme>();
const AnimatedText = Animated.createAnimatedComponent(Text);
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const AnimatedHero = () => {
  const heartScale = useSharedValue(0);
  const heartRotate = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const taglineOpacity = useSharedValue(0);

  useEffect(() => {
    // Animate heart
    heartScale.value = withSequence(
      withDelay(500, withSpring(1.2)),
      withSpring(1)
    );
    heartRotate.value = withSequence(
      withDelay(500, withSpring(-0.1)),
      withSpring(0)
    );

    // Fade in text
    textOpacity.value = withDelay(800, withTiming(1, { duration: 800 }));
    taglineOpacity.value = withDelay(1200, withTiming(1, { duration: 800 }));
  }, []);

  const heartStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: heartScale.value },
      { rotate: `${heartRotate.value}rad` },
    ],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: withSpring(textOpacity.value * -20) }],
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
    transform: [{ translateY: withSpring(taglineOpacity.value * -10) }],
  }));

  return (
    <Box style={styles.container}>
      {/* Animated Heart Logo */}
      <Animated.View style={[styles.heartContainer, heartStyle]}>
        <Box style={styles.heart}>
          <Box style={[styles.heartPiece, styles.leftPiece]} />
          <Box style={[styles.heartPiece, styles.rightPiece]} />
          <Box style={styles.bandaid} />
        </Box>
      </Animated.View>

      {/* Brand Name */}
      <AnimatedText
        variant="header"
        color="primary"
        style={[styles.brandName, textStyle]}
      >
        flawed
      </AnimatedText>

      {/* Tagline */}
      <AnimatedText
        variant="subheader"
        color="textPrimary"
        style={[styles.tagline, taglineStyle]}
      >
        The Dating App That{'\n'}
        Starts with the Truth
      </AnimatedText>

      {/* Subtitle */}
      <AnimatedText
        variant="body"
        color="textSecondary"
        style={[styles.subtitle, taglineStyle]}
      >
        Because perfect is boring, and your quirks make you interesting.
      </AnimatedText>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  heartContainer: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  heart: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  heartPiece: {
    width: '50%',
    height: '80%',
    position: 'absolute',
    backgroundColor: '#FF6B6B',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  leftPiece: {
    transform: [{ rotate: '-45deg' }],
    left: 14,
  },
  rightPiece: {
    transform: [{ rotate: '45deg' }],
    right: 14,
  },
  bandaid: {
    position: 'absolute',
    width: '40%',
    height: '20%',
    backgroundColor: '#7FBEAB',
    top: '30%',
    left: '30%',
    transform: [{ rotate: '-45deg' }],
    borderRadius: 4,
  },
  brandName: {
    fontSize: 48,
    marginBottom: 20,
  },
  tagline: {
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    maxWidth: SCREEN_WIDTH * 0.8,
    marginBottom: 40,
  },
});
