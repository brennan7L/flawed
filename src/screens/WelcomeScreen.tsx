import React from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { AnimatedBrokenHeart } from '../components/AnimatedBrokenHeart';
import { FeatureCard } from '../components/FeatureCard';
import { ProfilePreviewCard } from '../components/ProfilePreviewCard';
import { mockProfiles } from '../constants/mockData';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  FadeIn,
  FadeInDown,
} from 'react-native-reanimated';

const Box = createBox<Theme>();
const Text = createText<Theme>();
const AnimatedBox = Animated.createAnimatedComponent(Box);
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

const features = [
  {
    title: 'Embrace Your Flaws',
    description: 'Show your weird, real self.',
    icon: <Text style={styles.featureIcon}>🎭</Text>,
  },
  {
    title: 'Match on Reality',
    description: 'Connect through quirks, not filters.',
    icon: <Text style={styles.featureIcon}>❤️</Text>,
  },
  {
    title: 'Real Connections',
    description: 'Vulnerability > perfection.',
    icon: <Text style={styles.featureIcon}>🔥</Text>,
  },
];

const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <Animated.ScrollView
      style={styles.container}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Section */}
      <Box
        height={SCREEN_HEIGHT}
        alignItems="center"
        justifyContent="center"
        padding="xl"
      >
        <AnimatedBrokenHeart />
        
        <Text
          variant="header"
          color="primary"
          textAlign="center"
          marginBottom="m"
          style={styles.brandName}
        >
          flawed
        </Text>

        <Text
          variant="subheader"
          color="textPrimary"
          textAlign="center"
          marginBottom="xl"
          style={styles.tagline}
        >
          The Dating App That{'\n'}
          Starts with the Truth
        </Text>

        <Text
          variant="body"
          color="textSecondary"
          textAlign="center"
          marginBottom="xxl"
          style={styles.subtitle}
        >
          Because perfect is boring, and your quirks make you interesting.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Main')}
        >
          <Box
            backgroundColor="primary"
            borderRadius="m"
            padding="m"
            width={SCREEN_WIDTH - 48}
            alignItems="center"
          >
            <Text color="white" variant="body" style={styles.buttonText}>
              Start Being Real
            </Text>
          </Box>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Main')}
        >
          <Box
            backgroundColor="mainBackground"
            borderRadius="m"
            padding="m"
            width={SCREEN_WIDTH - 48}
            alignItems="center"
            borderWidth={1}
            borderColor="border"
          >
            <Text color="textPrimary" variant="body" style={styles.buttonText}>
              I Already Have an Account
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>

      {/* Features Section */}
      <Box padding="xl" backgroundColor="cardBackground" borderRadius="xl" margin="m">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            {...feature}
            index={index}
            scrollY={scrollY}
          />
        ))}
      </Box>

      {/* Profiles Section */}
      <Box padding="xl">
        <Text
          variant="header"
          color="textPrimary"
          marginBottom="xl"
          textAlign="center"
        >
          Meet Real People
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.profilesContainer}
          decelerationRate="fast"
          snapToInterval={SCREEN_WIDTH * 0.8 + 24}
        >
          {mockProfiles.map((profile, index) => (
            <ProfilePreviewCard
              key={profile.id}
              profile={profile}
              index={index}
            />
          ))}
        </ScrollView>
      </Box>

      {/* Footer */}
      <Box
        padding="xl"
        backgroundColor="cardBackground"
        borderTopLeftRadius="xl"
        borderTopRightRadius="xl"
        marginTop="xl"
      >
        <Box flexDirection="row" justifyContent="space-between" marginBottom="l">
          <TouchableOpacity>
            <Text variant="label" color="textSecondary">
              Terms
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text variant="label" color="textSecondary">
              Privacy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text variant="label" color="textSecondary">
              Contact
            </Text>
          </TouchableOpacity>
        </Box>
        <Text
          variant="label"
          color="textSecondary"
          textAlign="center"
          opacity={0.7}
        >
          Built by beautifully broken humans 💔
        </Text>
      </Box>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  brandName: {
    fontSize: 48,
    fontWeight: 'bold',
    letterSpacing: -1,
    lineHeight: 52,
  },
  tagline: {
    fontSize: 24,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 24,
    maxWidth: SCREEN_WIDTH * 0.8,
  },
  primaryButton: {
    marginBottom: 16,
    width: '100%',
  },
  secondaryButton: {
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  featureIcon: {
    fontSize: 24,
  },
  profilesContainer: {
    paddingHorizontal: (SCREEN_WIDTH - SCREEN_WIDTH * 0.8) / 2 - 12,
  },
});

export default WelcomeScreen;