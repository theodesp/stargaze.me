import { createGlobalStyle } from 'styled-components/macro';
import App from '../../App';
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
    <App />
  </>
);

export default Root;
