/* eslint-env jest */

import React from 'react';

import { renderHook } from '~/__helpers__/testing-library/react-hooks';

import {
  EnvironmentContextType,
  EnvironmentProvider,
  useEnvironmentContext
} from '../EnvironmentContext';

describe('test useEnvironmentContext hook', () => {
  const setup = (props: EnvironmentContextType) => {
    const utils = renderHook(useEnvironmentContext, {
      wrapper: ({ children }) => (
        <EnvironmentProvider {...props}>{children}</EnvironmentProvider>
      )
    });

    return {
      ...utils
    };
  };

  it('returns environment dependencies / props', () => {
    const { result } = setup({
      useNativeDriver: true
    });

    expect(result.current.useNativeDriver).toBe(true);
  });

  it('throws if there is no EnvironmentProvider', () => {
    expect(() => {
      const { result } = renderHook(useEnvironmentContext, {
        wrapper: ({ children }) => <>{children}</>
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      result.current;
    }).toThrow(
      new Error(
        'useEnvironment() must be called within EnvironmentProvider context'
      )
    );
  });
});
