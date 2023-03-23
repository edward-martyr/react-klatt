import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { store } from './redux/store';
import App from './app';
import './index.scss';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

const theme = createTheme({
  typography: {
    fontFamily: '"Source Sans", sans-serif',
    fontSize: 15,
    fontWeightLight: 200,
    fontWeightRegular: 400,
    fontWeightBold: 900,
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#1e7655',
    },
    secondary: {
      main: '#237786',
    },
    background: {
      default: '#ececed',
      paper: '#ffffff',
    },
    text: {
      primary: '#242f2c',
      secondary: '#4f686d',
    },
  },
});

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>,
);
