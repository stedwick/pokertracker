import React from "react";
import {CssBaseline} from "@mui/material";
import App from "../App";
import {createTheme, ThemeProvider} from "@mui/material/styles";

// https://bareynol.github.io/mui-theme-creator/
export const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#dfedf9',
      paper: '#ffffff',
    },
  },
};
const lightThemeOptions = themeOptions;
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }
});
const lightTheme = createTheme(lightThemeOptions);
const themes = {
  "light": lightTheme,
  "dark": darkTheme
};

export class ThemeSwitcher extends React.Component {
  constructor(props) {
    super(props);
    const currentTheme = localStorage.getItem('currentTheme');
    if (Boolean(currentTheme)) {
      this.state = {
        theme: currentTheme
      };
    } else {
      this.state = {
        theme: "dark"
      };
    }
    window.toggleTheme = () => {
      this.dayNightCycle();
    }
  }

  daytime = () => {
    this.setState({
      theme: "light"
    });
    localStorage.setItem('currentTheme', 'light');
  }
  nighttime = () => {
    this.setState({
      theme: "dark"
    });
    localStorage.setItem('currentTheme', 'dark');
  }
  dayNightCycle = () => {
    if (this.state.theme === "dark") {
      this.daytime();
    } else {
      this.nighttime();
    }
  }

  render() {
    const currentTheme = themes[this.state.theme];
    return (
      <ThemeProvider theme={currentTheme}>
        <CssBaseline enableColorScheme />
        <App/>
      </ThemeProvider>
    );
  }
}