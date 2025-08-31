import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../constants/theme';
import { FlawTag } from './FlawTag';
import { Profile } from '../constants/mockData';
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolate,
  useSharedValue,
  withSequence,
  withDelay,
} from 'react-native-reanimated';

const Box = createBox<Theme>();
const Text = createText<Theme>();
const AnimatedBox = Animated.createAnimatedComponent(Box);

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = Math.min(300, SCREEN_WIDTH - 48);
const CARD_HEIGHT = CARD_WIDTH * 1.4;

type ProfilePreviewCardProps = {
  profile: Profile;
  index: number;
};

export const ProfilePreviewCard = ({ profile, index }: ProfilePreviewCardProps) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    scale.value = withDelay(
      index * 200,
      withSequence(withSpring(1.1), withSpring(1))
    );
    opacity.value = withDelay(index * 200, withSpring(1));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: interpolate(scale.value, [0, 1], [50, 0]) },
    ],
    opacity: opacity.value,
  }));

  return (
    <AnimatedBox style={[styles.container, animatedStyle]}>
      <Image source={{ uri: profile.photos[0] }} style={styles.image} />
      <Box style={styles.overlay}>
        <Text variant="subheader" color="white" marginBottom="xs">
          {profile.name}, {profile.age}
        </Text>
        <Text variant="body" color="white" opacity={0.9} marginBottom="m">
          {profile.city}
        </Text>
        
        <Box flexDirection="row" flexWrap="wrap" marginBottom="m">
          {profile.flaws.map((flaw) => (
            <FlawTag
              key={flaw.id}
              label={flaw.label}
              category={flaw.category}
              type="relate"
            />
          ))}
        </Box>

        <Box
          backgroundColor="cardBackground"
          padding="m"
          borderRadius="m"
          opacity={0.95}
        >
          <Text variant="body" color="textPrimary" style={styles.quote}>
            "{profile.bio}"
          </Text>
        </Box>
      </Box>
    </AnimatedBox>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
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
    paddingBottom: 24,
    backgroundColor: 'rgba(0,0,0,0.5)',
    background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%)',
  },
  quote: {
    fontStyle: 'italic',
    fontSize: 14,
    lineHeight: 20,
  },
});
