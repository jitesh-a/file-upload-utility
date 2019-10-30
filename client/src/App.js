
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import dotenv from 'dotenv';

import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './global';
import { Uploads } from './components/Uploads';

import './App.css';

dotenv.config();

function App() {

  const [theme, setTheme] = useState('light');
  // const themeMode = lightTheme;
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  const toggleTheme = (event) => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  }

  const getActiveTheme = () => {
    return theme === 'light' ? lightTheme : darkTheme;
  }

  return (
    <ThemeProvider theme={getActiveTheme()}>
      <>
        <GlobalStyles />
        <div className="container-fluid">
          <div className="custom-control custom-switch" align="right">
            <input type="checkbox"
              onChange={toggleTheme}
              className="custom-control-input"
              id="customSwitch1" />
            <label className="custom-control-label" htmlFor="customSwitch1">Toggle theme</label>
          </div>

          <h3 align="center">Uploads</h3>
          <Uploads getActiveTheme={getActiveTheme} />
        </div>
      </>
    </ThemeProvider>

  );
}

export default App;
