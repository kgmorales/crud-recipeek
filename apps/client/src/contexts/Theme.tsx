import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';

interface ThemeContextProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined,
);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // Set initial mode to false (light mode)

  // Load the theme from localStorage when the component mounts
  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    setIsDarkMode(currentTheme === 'night');
  }, []);

  // Apply the theme class to the document element based on isDarkMode state
  useEffect(() => {
    document.documentElement.classList.toggle('theme-day', !isDarkMode);
    document.documentElement.classList.toggle('theme-night', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'night' : 'day');
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
