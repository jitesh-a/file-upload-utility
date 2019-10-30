import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }
  a {
    color: ${({ theme }) => theme.text};
  }
  h6 {
    font-size: 10px;
  }
  .container-fluid {
    margin-top: 5rem;
  }
  .margin-top-2 {
    margin-top: 2rem;
  }
  .input-loading {
    text-align: center;
    // background: #1f33a3;
    color: ${({ theme }) => theme.text};
  }
  .icon-enabled {
    cursor: pointer;
  }
  .icon-disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .error-message {
    color: red;
  }
  .form-control {
    border: 1px solid ${({ theme }) => theme.backgroundAndBorder};
    background-color: ${({ theme }) => theme.body} !important;
    color: ${({ theme }) => theme.text} !important;
  }
`;