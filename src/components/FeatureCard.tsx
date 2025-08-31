import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../constants/theme';
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolate,
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

const Box = createBox<Theme>();
const Text = createText<Theme>();
const AnimatedBox = Animated.createAnimatedComponent(Box);

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  scrollY: Animated.SharedValue<number>;
};

export const FeatureCard = ({ title, description, icon, index, scrollY }: FeatureCardProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * 200,
      index * 200,
      (index + 1) * 200,
    ];

    const opacity = interpolate(
      scrollY.value,
      inputRange,
      [0.5, 1, 0.5],
      'clamp'
    );

    const scale = interpolate(
      scrollY.value,
      inputRange,
      [0.8, 1, 0.8],
      'clamp'
    );

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return (
    <AnimatedBox style={[styles.container, animatedStyle]}>
      <Box style={styles.iconContainer}>
        {icon}
      </Box>
      <Box flex={1} marginLeft="m">
        <Text variant="subheader" color="primary" marginBottom="xs">
          {title}
        </Text>
        <Text variant="body" color="textSecondary">
          {description}
        </Text>
      </Box>
    </AnimatedBox>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    width: SCREEN_WIDTH - 48,
  },
  iconContainer: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderRadius: 12,
  },
});
