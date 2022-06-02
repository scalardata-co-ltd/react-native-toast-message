/* eslint-env jest */

import { Animated } from 'react-native';

import { renderHook } from '~/__helpers__/testing-library/react-hooks';
import { ToastPosition } from '~/types';

import {
  UseSlideAnimationParams,
  translateYOutputRangeFor,
  useSlideAnimation
} from '../useSlideAnimation';

const defaultOffsets = {
  topOffset: 40,
  bottomOffset: 60,
  keyboardOffset: 5
};

const setup = (props?: Partial<UseSlideAnimationParams>) => {
  const utils = renderHook(() =>
    useSlideAnimation({
      position: 'top',
      height: 20,
      ...defaultOffsets,
      ...props
    })
  );
  return {
    ...utils
  };
};

describe('test useSlideAnimation hook', () => {
  it('returns defaults', () => {
    const { result } = setup();
    const { animatedValue, animate, animationStyles } = result.current;

    expect(animatedValue.current).toBeDefined();
    expect(animate).toBeDefined();
    expect(animationStyles.opacity).toBeDefined();
    expect(animationStyles.transform).toBeDefined();
  });

  it('animates to a new value', async () => {
    const spy = jest.spyOn(Animated, 'spring').mockImplementation(() => ({
      start: jest.fn(),
      stop: jest.fn(),
      reset: jest.fn()
    }));
    const { result } = setup();
    result.current.animate(1);
    expect(spy).toHaveBeenCalled();
  });

  it.each<[ToastPosition, number]>([
    ['top', -40],
    ['bottom', 40]
  ])('returns default styles for position: %s', (position, translateY) => {
    const { result } = setup({
      position
    });

    expect(result.current.defaultStyles).toEqual({
      transform: [
        {
          translateY
        }
      ]
    });
  });
});

describe('test translateYOutputRangeFor function', () => {
  it('returns output range for position: top', () => {
    expect(
      translateYOutputRangeFor({
        position: 'top',
        height: 20,
        keyboardHeight: 0,
        ...defaultOffsets
      })
    ).toEqual([-40, 40]);
  });

  it('returns output range for position: bottom', () => {
    expect(
      translateYOutputRangeFor({
        position: 'bottom',
        height: 20,
        keyboardHeight: 0,
        ...defaultOffsets
      })
    ).toEqual([40, -60]);
  });

  it('returns output range for position: bottom, with keyboard offset', () => {
    expect(
      translateYOutputRangeFor({
        position: 'bottom',
        height: 20,
        keyboardHeight: 400,
        ...defaultOffsets
      })
    ).toEqual([40, -405]);
  });

  it('throws if position is not supported', () => {
    expect(() =>
      translateYOutputRangeFor({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        position: 'left'
      })
    ).toThrow(new Error(`Position 'left' not supported`));
  });
});
