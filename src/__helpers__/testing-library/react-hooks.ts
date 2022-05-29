/* eslint-disable no-restricted-imports */

import { renderHook as renderHookFn } from '@testing-library/react-hooks';

import { EnvironmentProviderMock } from '~/__mocks__/EnvironmentProviderMock';

/**
 * Custom `renderHook` function implementation to be able to easily wrap test environment providers
 *
 * https://testing-library.com/docs/react-testing-library/setup/#custom-render
 */
export const renderHook: typeof renderHookFn = (cb, options?) =>
  renderHookFn(cb, {
    wrapper: EnvironmentProviderMock,
    ...options
  });

export { act } from '@testing-library/react-hooks';

export type { RenderResult } from '@testing-library/react-hooks';
