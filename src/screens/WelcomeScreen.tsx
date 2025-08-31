import React from 'react';
import { Image } from 'react-native';
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../constants/theme';

const Box = createBox<Theme>();
const Text = createText<Theme>();

const WelcomeScreen = () => {
  return (
    <Box flex={1} backgroundColor="mainBackground">
      <Box flex={1} alignItems="center" justifyContent="center" padding="xl">
        {/* Logo */}
        <Box marginBottom="xl">
          <Image
            source={require('../assets/logo-placeholder.png')}
            style={{ width: 120, height: 120 }}
          />
        </Box>

        {/* Tagline */}
        <Text variant="header" textAlign="center" marginBottom="l">
          The Dating App That
        </Text>
        <Text variant="header" textAlign="center" marginBottom="xl" color="primary">
          Starts with the Truth
        </Text>

        {/* Subtitle */}
        <Text variant="body" textAlign="center" color="textSecondary" marginBottom="xxl">
          Because perfect is boring, and your quirks make you interesting.
        </Text>

        {/* CTA Button */}
        <Box
          backgroundColor="primary"
          borderRadius="m"
          padding="m"
          width="100%"
          alignItems="center"
          marginBottom="m"
        >
          <Text color="white" variant="body" fontWeight="600">
            Start Being Real
          </Text>
        </Box>

        {/* Secondary Action */}
        <Box
          backgroundColor="mainBackground"
          borderRadius="m"
          padding="m"
          width="100%"
          alignItems="center"
          borderWidth={1}
          borderColor="border"
        >
          <Text color="textPrimary" variant="body" fontWeight="600">
            I Already Have an Account
          </Text>
        </Box>
      </Box>

      {/* Feature Highlights */}
      <Box padding="xl" backgroundColor="cardBackground">
        <Box flexDirection="row" marginBottom="l">
          <Text variant="label" color="primary" marginRight="s">
            🎭
          </Text>
          <Box flex={1}>
            <Text variant="subheader" marginBottom="xs">
              Embrace Your Flaws
            </Text>
            <Text variant="body" color="textSecondary">
              No more perfect profiles. Show your authentic self.
            </Text>
          </Box>
        </Box>

        <Box flexDirection="row" marginBottom="l">
          <Text variant="label" color="primary" marginRight="s">
            🤝
          </Text>
          <Box flex={1}>
            <Text variant="subheader" marginBottom="xs">
              Match on Reality
            </Text>
            <Text variant="body" color="textSecondary">
              Connect with people who understand your quirks.
            </Text>
          </Box>
        </Box>

        <Box flexDirection="row">
          <Text variant="label" color="primary" marginRight="s">
            💝
          </Text>
          <Box flex={1}>
            <Text variant="subheader" marginBottom="xs">
              Real Connections
            </Text>
            <Text variant="body" color="textSecondary">
              Skip the small talk. Start with what matters.
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WelcomeScreen;
