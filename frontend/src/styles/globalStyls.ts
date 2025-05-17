import { createGlobalStyle } from 'styled-components';
import type { ThemeType } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textPrimary};
    font-family: sans-serif;
    margin: 0;
    padding: 0;
  }

    a {
        color: ${({ theme }) => theme.textPrimary};
        text-decoration: none;
        transition: color 0.3s ease;
    }
    a:hover {
        color: ${({ theme }) => theme.buttonEdit};
    }
    button {
        background-color: ${({ theme }) => theme.buttonEdit};
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        transition: background 0.15s ease;
    }
    button:hover {
        background-color: ${({ theme }) => theme.buttonDelete};
    }
    input, textarea {
        background-color: ${({ theme }) => theme.cardBackground};
        color: ${({ theme }) => theme.textPrimary};
        border: 1px solid ${({ theme }) => theme.buttonEdit};
        border-radius: 4px;
        padding: 0.5rem;
        width: 100%; 
        box-sizing: border-box;
        transition: border 0.3s ease;
    }
    input:focus, textarea:focus {
        border-color: ${({ theme }) => theme.buttonEdit};
        outline: none;
    }
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background-color: ${({ theme }) => theme.background};
    }
`;

export default GlobalStyle;
