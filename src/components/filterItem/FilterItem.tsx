import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import styles from './FilterItem.styles';

interface FilterItemProps {
  text: string;
  value: 'ASC' | 'DESC' | undefined;
  handlePress: () => void;
  isActive: boolean;
}

export default function FilterItem({
  text,
  value,
  handlePress,
  isActive,
}: FilterItemProps) {
  const buttonStyles = {
    ...styles.filterItem,
    ...(isActive && value !== undefined && styles.activeFilter),
  };

  const buttonTextStyles = {
    ...styles.filterText,
    ...(isActive && value !== undefined && styles.activeFilterText),
  };

  const buttonFilterVariantStyles = {
    ...styles.filterVariant,
    ...(isActive && value === 'ASC' && styles.filterFIFOVariant),
    ...(isActive && value === 'DESC' && styles.filterLIFOVariant),
  };

  function getFilterVariantSign(variant: 'ASC' | 'DESC' | undefined) {
    switch (variant) {
      case 'ASC':
      case 'DESC':
        return '>';
      default:
        return '-';
    }
  }

  return (
    <TouchableOpacity style={buttonStyles} onPress={handlePress}>
      <Text style={buttonTextStyles}>{text}</Text>
      <Text style={buttonFilterVariantStyles}>
        {getFilterVariantSign(value)}
      </Text>
    </TouchableOpacity>
  );
}
