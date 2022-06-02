import React from 'react';
import { Animated } from 'react-native';

import { useEnvironmentContext } from '../contexts';
import { ToastPosition } from '../types';
import { useKeyboard } from './useKeyboard';

export type UseSlideAnimationParams = {
  position: ToastPosition;
  height: number;
  topOffset: number;
  bottomOffset: number;
  keyboardOffset: number;
};

const startPointFor = (position: ToastPosition, height: number): number => {
  const value = height * 2;
  if (position === 'top') {
    return -value;
  }
  return value;
};

export function translateYOutputRangeFor({
  position,
  height,
  topOffset,
  bottomOffset,
  keyboardHeight,
  keyboardOffset
}: UseSlideAnimationParams & {
  keyboardHeight: number;
}) {
  const startPoint = startPointFor(position, height);

  switch (position) {
    case 'bottom': {
      const keyboardAwareOffset = keyboardHeight + keyboardOffset;
      const range = [startPoint, -Math.max(bottomOffset, keyboardAwareOffset)];
      return range;
    }

    case 'top': {
      const keyboardAwareOffset = 0;
      const range = [startPoint, Math.max(topOffset, keyboardAwareOffset)];
      return range;
    }

    default:
      throw new Error(`Position '${position}' not supported`);
  }
}

export function useSlideAnimation({
  position,
  height,
  topOffset,
  bottomOffset,
  keyboardOffset
}: UseSlideAnimationParams) {
  const { useNativeDriver } = useEnvironmentContext();

  const animatedValue = React.useRef(new Animated.Value(0));
  const { keyboardHeight } = useKeyboard();

  const animate = React.useCallback(
    (toValue: number) => {
      Animated.spring(animatedValue.current, {
        toValue,
        useNativeDriver: !!useNativeDriver,
        friction: 8
      }).start();
    },
    [useNativeDriver]
  );

  const translateY = React.useMemo(
    () =>
      animatedValue.current.interpolate({
        inputRange: [0, 1],
        outputRange: translateYOutputRangeFor({
          position,
          height,
          topOffset,
          bottomOffset,
          keyboardHeight,
          keyboardOffset
        })
      }),
    [position, height, topOffset, bottomOffset, keyboardHeight, keyboardOffset]
  );

  const opacity = animatedValue.current.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [0, 1, 1]
  });

  const defaultStyles = {
    transform: [
      {
        translateY: startPointFor(position, height)
      }
    ]
  };

  return {
    animatedValue,
    animate,
    defaultStyles,
    animationStyles: {
      opacity,
      transform: [
        {
          translateY
        }
      ]
    }
  };
}
