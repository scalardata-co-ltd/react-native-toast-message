import React from 'react';

import { EnvironmentContextType, EnvironmentProvider } from '../contexts';

export const environmentMock: EnvironmentContextType = {
  useNativeDriver: false
};

/**
 * Provides test implementations for injected dependencies
 */
export const EnvironmentProviderMock: React.FC = ({ children }) => (
  <EnvironmentProvider {...environmentMock}>{children}</EnvironmentProvider>
);
