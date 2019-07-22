import { createGlobalStyle, ThemeProvider } from 'styled-components/macro';
import theme from '../../styles/theme';
import AppComponent from '../app/app.component';
import React from 'react';

const GlobalStyle = createGlobalStyle`
  * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  *:before,
  *:after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  body {
    margin: 0;
  }
  code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
  }
`;

export const Root = (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <AppComponent />
    </ThemeProvider>
  </>
);

export default Root;
