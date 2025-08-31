import React from 'react';
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../constants/theme';
import { TouchableOpacity } from 'react-native';

const Box = createBox<Theme>();
const Text = createText<Theme>();

type FlawTagProps = {
  label: string;
  category: 'personality' | 'habits' | 'lifestyle' | 'emotional' | 'social';
  onPress?: () => void;
  isSelected?: boolean;
  type?: 'relate' | 'tolerate' | 'dealbreaker';
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'personality':
      return 'coralRed';
    case 'habits':
      return 'paleTeal';
    case 'lifestyle':
      return 'primary';
    case 'emotional':
      return 'secondary';
    case 'social':
      return 'textSecondary';
    default:
      return 'primary';
  }
};

const getTypeStyle = (type?: string) => {
  switch (type) {
    case 'relate':
      return {
        backgroundColor: 'primary',
        textColor: 'white',
      };
    case 'tolerate':
      return {
        backgroundColor: 'paleTeal',
        textColor: 'white',
      };
    case 'dealbreaker':
      return {
        backgroundColor: 'coralRed',
        textColor: 'white',
      };
    default:
      return {
        backgroundColor: 'cardBackground',
        textColor: 'textPrimary',
      };
  }
};

export const FlawTag = ({ label, category, onPress, isSelected, type }: FlawTagProps) => {
  const style = getTypeStyle(type);
  
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        paddingVertical="s"
        paddingHorizontal="m"
        borderRadius="m"
        backgroundColor={style.backgroundColor}
        opacity={isSelected ? 1 : 0.9}
        marginRight="s"
        marginBottom="s"
        borderWidth={1}
        borderColor={type ? style.backgroundColor : getCategoryColor(category)}
      >
        <Text
          variant="label"
          color={style.textColor}
          fontWeight="600"
        >
          #{label}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};
