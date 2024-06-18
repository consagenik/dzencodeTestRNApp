import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import styles from './Pagination.styles';

interface PaginationProps {
  quantity: number;
  currentPage: number;
  handleOpenPage: (value: number) => void;
}

export default function Pagination({
  quantity,
  currentPage,
  handleOpenPage,
}: PaginationProps) {
  function getButtonStyles(isActive: boolean) {
    return {
      ...styles.button,
      ...(isActive && styles.activeButton),
    };
  }

  if (quantity > 4) {
    if (currentPage <= 2) {
      const needDots = currentPage + 3 < quantity;
      const displayLastPage = currentPage + 3 === quantity;

      return (
        <View style={styles.pagination}>
          {Array.from(Array(4).keys()).map(pageIndex => (
            <TouchableOpacity
              key={pageIndex}
              onPress={() => handleOpenPage(pageIndex)}
              style={getButtonStyles(pageIndex === currentPage)}
              disabled={pageIndex === currentPage}>
              <Text>{pageIndex + 1}</Text>
            </TouchableOpacity>
          ))}
          {needDots ? (
            <>
              <View style={styles.dots}>
                <Text>. . .</Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleOpenPage(quantity - 1)}>
                <Text>{quantity}</Text>
              </TouchableOpacity>
            </>
          ) : displayLastPage ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleOpenPage(quantity - 1)}>
              <Text>{quantity}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      );
    }

    if (currentPage > 2 && currentPage < quantity - 3) {
      return (
        <View style={styles.pagination}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleOpenPage(0)}>
            <Text>{1}</Text>
          </TouchableOpacity>
          <View style={styles.dots}>
            <Text>. . .</Text>
          </View>
          {Array.from(Array(currentPage + 1 + 1).keys())
            .slice(currentPage - 1)
            .map(pageIndex => (
              <TouchableOpacity
                key={pageIndex}
                onPress={() => handleOpenPage(pageIndex)}
                style={getButtonStyles(pageIndex === currentPage)}
                disabled={pageIndex === currentPage}>
                <Text>{pageIndex + 1}</Text>
              </TouchableOpacity>
            ))}
          <View style={styles.dots}>
            <Text>. . .</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleOpenPage(quantity - 1)}>
            <Text>{quantity}</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.pagination}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleOpenPage(0)}>
          <Text>{1}</Text>
        </TouchableOpacity>
        <View style={styles.dots}>
          <Text>. . .</Text>
        </View>
        {Array.from(Array(4).keys()).map(pageIndex => (
          <TouchableOpacity
            key={quantity - 4 + pageIndex}
            onPress={() => handleOpenPage(quantity - 4 + pageIndex)}
            style={getButtonStyles(quantity - 4 + pageIndex === currentPage)}
            disabled={quantity - 4 + pageIndex === currentPage}>
            <Text>{quantity - 3 + pageIndex}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.pagination}>
      {Array.from(Array(quantity).keys()).map(pageIndex => (
        <TouchableOpacity
          key={pageIndex}
          onPress={() => handleOpenPage(pageIndex)}
          style={getButtonStyles(pageIndex === currentPage)}>
          <Text>{pageIndex + 1}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
