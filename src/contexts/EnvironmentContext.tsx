import React from 'react';
import { Platform } from 'react-native';

import { ToastProps } from '~/types';

export type EnvironmentContextType = {
  useNativeDriver?: ToastProps['useNativeDriver'];
};

const EnvironmentContext = React.createContext<EnvironmentContextType | null>(
  null
);

const EnvironmentProvider: React.FC<EnvironmentContextType> = ({
  children,
  useNativeDriver = Platform.select({
    default: true,
    web: false
  })
}) => {
  const value = {
    useNativeDriver
  };

  return (
    <EnvironmentContext.Provider value={value}>
      {children}
    </EnvironmentContext.Provider>
  );
};

function useEnvironmentContext() {
  const ctx = React.useContext(EnvironmentContext);
  if (!ctx) {
    throw new Error(
      `useEnvironment() must be called within EnvironmentProvider context`
    );
  }
  return ctx;
}

export { EnvironmentProvider, useEnvironmentContext };
