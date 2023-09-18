import React, { createContext, useContext, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import fetchHome from '@api/pages/home.routes';
import { Home } from '@types';

interface HomeContextProps {
  data: Home | undefined;
  error: Error | null;
  isLoading: boolean;
}

const HomeContext = createContext<HomeContextProps | undefined>(undefined);

interface HomeProviderProps {
  children: ReactNode;
}

export const HomeProvider: React.FC<HomeProviderProps> = ({ children }) => {
  const { data, error, isLoading } = useQuery<Home, Error>(['home'], fetchHome);

  return (
    <HomeContext.Provider value={{ data, error, isLoading }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = (): HomeContextProps => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error('useHomeContext must be used within a HomeProvider');
  }
  return context;
};
