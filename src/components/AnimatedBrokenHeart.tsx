import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { createBox } from '@shopify/restyle';
import { Theme } from '../constants/theme';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';

const Box = createBox<Theme>();
const AnimatedBox = Animated.createAnimatedComponent(Box);

export const AnimatedBrokenHeart = () => {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Initial animation
    opacity.value = withTiming(1, { duration: 800 });
    
    // Continuous pulse animation
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
        withTiming(1, { duration: 1000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) })
      ),
      -1,
      true
    );

    // Subtle rotation animation
    rotation.value = withRepeat(
      withSequence(
        withSpring(-0.05),
        withSpring(0.05),
        withSpring(0)
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}rad` },
    ],
    opacity: opacity.value,
  }));

  return (
    <AnimatedBox style={[styles.container, animatedStyle]}>
      <Box style={styles.heart}>
        {/* Left piece */}
        <Box style={[styles.heartPiece, styles.leftPiece]}>
          <Box style={[styles.innerShadow, styles.leftInnerShadow]} />
        </Box>
        
        {/* Right piece */}
        <Box style={[styles.heartPiece, styles.rightPiece]}>
          <Box style={[styles.innerShadow, styles.rightInnerShadow]} />
        </Box>
        
        {/* Bandaid */}
        <Box style={styles.bandaid}>
          <Box style={styles.bandaidStripe} />
        </Box>
      </Box>
    </AnimatedBox>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
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
    overflow: 'hidden',
  },
  leftPiece: {
    transform: [
      { rotate: '-45deg' },
      { translateX: 2 },
    ],
    left: 14,
  },
  rightPiece: {
    transform: [
      { rotate: '45deg' },
      { translateX: -2 },
    ],
    right: 14,
  },
  innerShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  leftInnerShadow: {
    transform: [{ skewX: '45deg' }],
  },
  rightInnerShadow: {
    transform: [{ skewX: '-45deg' }],
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  bandaidStripe: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    height: '20%',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
});
