/* eslint-env jest */

import React from 'react';

import { render } from '~/__helpers__/testing-library/react-native';

import { BaseToastProps } from '../../types';
import { ErrorToast } from '../ErrorToast';

const setup = (props?: BaseToastProps) => {
  const utils = render(<ErrorToast {...props} />);
  return {
    ...utils
  };
};

describe('test ErrorToast component', () => {
  it('renders default style', () => {
    const { queryByTestId } = setup();
    const touchableContainer = queryByTestId('toastTouchableContainer');
    expect(touchableContainer).not.toBe(null);
    expect(touchableContainer).toHaveStyle({
      borderLeftColor: '#FE6301'
    });
  });
});
