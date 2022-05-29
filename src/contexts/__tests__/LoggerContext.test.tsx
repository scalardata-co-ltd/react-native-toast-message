/* eslint-env jest */

import React from 'react';

import { renderHook } from '~/__helpers__/testing-library/react-hooks';

import { ReactChildren } from '../../types';
import {
  LoggerProvider,
  LoggerProviderProps,
  useLogger
} from '../LoggerContext';

const setup = (props?: Omit<LoggerProviderProps, 'children'>) => {
  const wrapper = ({ children }: { children: ReactChildren }) => (
    <LoggerProvider {...props}>{children}</LoggerProvider>
  );
  const utils = renderHook(useLogger, {
    wrapper
  });
  return {
    ...utils
  };
};

describe('test Logger context', () => {
  const spy = jest.spyOn(console, 'log');

  it('injects the log function', () => {
    const { result } = setup();
    expect(result.current.log).toBeDefined();
  });

  it('it calls console.log when enableLogs: true', () => {
    const { result } = setup({
      enableLogs: true
    });
    const args = ['answer', 'is', 42];
    result.current.log(...args);
    expect(spy).toHaveBeenCalledWith('Toast:', ...args);
  });

  it('it does not call console.log when enableLogs: false', () => {
    const { result } = setup({
      enableLogs: false
    });
    result.current.log('test');
    expect(spy).not.toHaveBeenCalledWith('test');
  });
});
