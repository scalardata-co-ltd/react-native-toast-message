/* eslint-disable no-restricted-imports */

import { render as renderFn } from '@testing-library/react-native';

import { EnvironmentProviderMock } from '../../__mocks__/EnvironmentProviderMock';

/**
 * Custom `render` function implementation to be able to easily wrap test environment providers
 *
 * https://testing-library.com/docs/react-testing-library/setup/#custom-render
 */
export const render: typeof renderFn = (component, options?) =>
  renderFn(component, {
    wrapper: EnvironmentProviderMock,
    ...options
  });

export {
  waitFor,
  fireEvent,
  act,
  cleanup
} from '@testing-library/react-native';

export type {
  RenderOptions,
  RenderAPI,
  GetByAPI
} from '@testing-library/react-native';
