import React from 'react';
// Import theme
import { ThemeProvider as MatuiThemeProvider } from '@material-ui/styles';
import theme from './theme';

const defaultContextData = {
  dark: false,
  toggle: () => {},
};

const ThemeContext = React.createContext(defaultContextData);
const useTheme = () => React.useContext(ThemeContext);

const useEffectDarkMode = () => {
  const [themeState, setThemeState] = React.useState({
    dark: false,
    hasThemeLoaded: false,
  });
  React.useEffect(() => {
    const lsDark = localStorage.getItem('dark') === 'true';
    setThemeState({ ...themeState, dark: lsDark, hasThemeLoaded: true });
  }, []);

  return [themeState, setThemeState];
};

// eslint-disable-next-line react/prop-types
const ThemeProvider = ({ children }) => {
  const [themeState, setThemeState] = useEffectDarkMode();

  if (!themeState.hasThemeLoaded) {
    // if the theme is no yet loaded we don't want to render
    // this is just a workaround to avoid having the app rendering
    // in light mode by default and then switch to dark mode while
    // getting the theme state from localStorage
    return <div />;
  }

  const toggle = () => {
    const dark = !themeState.dark;
    localStorage.setItem('dark', JSON.stringify(dark));
    setThemeState({ ...themeState, dark });
  };

  const computedTheme = themeState.dark ? theme('dark') : theme('light');

  return (
    <MatuiThemeProvider theme={computedTheme}>
      <ThemeContext.Provider
        value={{
          dark: themeState.dark,
          toggle,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </MatuiThemeProvider>
  );
};

export { ThemeProvider, useTheme };
