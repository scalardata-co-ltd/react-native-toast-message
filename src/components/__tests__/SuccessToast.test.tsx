/* eslint-env jest */

import React from 'react';

import { render } from '~/__helpers__/testing-library/react-native';

import { BaseToastProps } from '../../types';
import { SuccessToast } from '../SuccessToast';

const setup = (props?: BaseToastProps) => {
  const utils = render(<SuccessToast {...props} />);
  return {
    ...utils
  };
};

describe('test SuccessToast component', () => {
  it('renders default style', () => {
    const { queryByTestId } = setup();
    const touchableContainer = queryByTestId('toastTouchableContainer');
    expect(touchableContainer).not.toBe(null);
    expect(touchableContainer).toHaveStyle({
      borderLeftColor: '#69C779'
    });
  });
});
