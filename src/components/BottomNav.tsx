import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../constants/theme';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

const Box = createBox<Theme>();
const Text = createText<Theme>();
const AnimatedBox = Animated.createAnimatedComponent(Box);

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type NavItem = {
  icon: string;
  label: string;
  screen: string;
};

const NAV_ITEMS: NavItem[] = [
  { icon: '🔍', label: 'Match', screen: 'Match' },
  { icon: '🎯', label: 'Filters', screen: 'Filters' },
  { icon: '💭', label: 'Messages', screen: 'Messages' },
  { icon: '👤', label: 'Profile', screen: 'Profile' },
];

type BottomNavProps = {
  currentScreen: string;
  onScreenChange: (screen: string) => void;
};

export const BottomNav = ({ currentScreen, onScreenChange }: BottomNavProps) => {
  return (
    <Box
      flexDirection="row"
      backgroundColor="cardBackground"
      paddingVertical="m"
      borderTopLeftRadius="xl"
      borderTopRightRadius="xl"
      style={styles.container}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = currentScreen === item.screen;
        
        return (
          <TouchableOpacity
            key={item.screen}
            style={styles.navItem}
            onPress={() => onScreenChange(item.screen)}
          >
            <AnimatedBox
              backgroundColor={isActive ? 'primary' : 'cardBackground'}
              padding="m"
              borderRadius="m"
              alignItems="center"
              style={[
                styles.navItemContent,
                useAnimatedStyle(() => ({
                  transform: [
                    {
                      scale: withSpring(isActive ? 1.1 : 1),
                    },
                  ],
                })),
              ]}
            >
              <Text variant="body" marginBottom="xs">
                {item.icon}
              </Text>
              <Text
                variant="label"
                color={isActive ? 'primary' : 'textSecondary'}
                fontSize={12}
              >
                {item.label}
              </Text>
            </AnimatedBox>
          </TouchableOpacity>
        );
      })}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navItemContent: {
    width: SCREEN_WIDTH / 5,
    alignItems: 'center',
  },
});
