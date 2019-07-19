import { createGlobalStyle } from 'styled-components/macro';
import AppComponent from '../app/app.component';
import React from 'react';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
  code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
  }
`;

const Root = (
  <>
    <GlobalStyle />
    <AppComponent />
  </>
);

export default Root;
