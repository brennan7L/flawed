import React from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { AnimatedHero } from '../components/AnimatedHero';
import { ProfilePreview } from '../components/ProfilePreview';
import { mockProfiles } from '../constants/mockData';
import Animated, { FadeInDown } from 'react-native-reanimated';

const Box = createBox<Theme>();
const Text = createText<Theme>();
const AnimatedBox = Animated.createAnimatedComponent(Box);
const { width: SCREEN_WIDTH } = Dimensions.get('window');

type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Box flex={1} backgroundColor="mainBackground">
        {/* Hero Section */}
        <AnimatedHero />

        {/* CTA Buttons */}
        <Box padding="xl">
          <TouchableOpacity onPress={() => navigation.navigate('Main')}>
            <Box
              backgroundColor="primary"
              borderRadius="m"
              padding="m"
              alignItems="center"
              marginBottom="m"
            >
              <Text color="white" variant="body" fontWeight="600">
                Start Being Real
              </Text>
            </Box>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Main')}>
            <Box
              backgroundColor="mainBackground"
              borderRadius="m"
              padding="m"
              alignItems="center"
              borderWidth={1}
              borderColor="border"
            >
              <Text color="textPrimary" variant="body" fontWeight="600">
                I Already Have an Account
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>

        {/* Feature Section */}
        <AnimatedBox 
          entering={FadeInDown.delay(500)}
          padding="xl"
          backgroundColor="cardBackground"
          borderRadius="xl"
          margin="m"
        >
          <Box flexDirection="row" marginBottom="l">
            <Text variant="label" color="primary" marginRight="s">
              ✅
            </Text>
            <Box flex={1}>
              <Text variant="subheader" marginBottom="xs">
                Embrace Your Flaws
              </Text>
              <Text variant="body" color="textSecondary">
                Show your weird, real self.
              </Text>
            </Box>
          </Box>

          <Box flexDirection="row" marginBottom="l">
            <Text variant="label" color="primary" marginRight="s">
              ❤️
            </Text>
            <Box flex={1}>
              <Text variant="subheader" marginBottom="xs">
                Match on Reality
              </Text>
              <Text variant="body" color="textSecondary">
                Connect through quirks, not filters.
              </Text>
            </Box>
          </Box>

          <Box flexDirection="row">
            <Text variant="label" color="primary" marginRight="s">
              🔥
            </Text>
            <Box flex={1}>
              <Text variant="subheader" marginBottom="xs">
                Real Connections
              </Text>
              <Text variant="body" color="textSecondary">
                Vulnerability > perfection.
              </Text>
            </Box>
          </Box>
        </AnimatedBox>

        {/* Sample Profiles Section */}
        <Box padding="xl">
          <Text variant="subheader" color="textPrimary" marginBottom="l" textAlign="center">
            Meet Real People
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.profilesContainer}
          >
            {mockProfiles.map((profile, index) => (
              <ProfilePreview
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
        >
          <Box flexDirection="row" justifyContent="space-around">
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
        </Box>
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profilesContainer: {
    paddingHorizontal: (SCREEN_WIDTH - SCREEN_WIDTH * 0.8) / 2 - 10,
  },
});

export default WelcomeScreen;