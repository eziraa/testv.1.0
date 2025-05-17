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

    select {
        background-color: ${({ theme }) => theme.cardBackground};
        color: ${({ theme }) => theme.textPrimary};
        border: 1px solid ${({ theme }) => theme.buttonEdit};
        border-radius: 4px;
        padding: 0.5rem;
        width: 100%;
        box-sizing: border-box;
        transition: border 0.3s ease;
    }
    select:focus {
        border-color: ${({ theme }) => theme.buttonEdit};
        outline: none;
    }

    option {
        background-color: ${({ theme }) => theme.cardBackground};
        color: ${({ theme }) => theme.textPrimary};
        padding: 0.5rem;
        border-radius: 4px;
        width: 100%;
        box-sizing: border-box;
        transition: border 0.3s ease;
    }
    option:hover {
        background-color: ${({ theme }) => theme.buttonEdit};
        color: white;
        border-radius: 4px;
        padding: 0.5rem;
        width: 100%;
        box-sizing: border-box;
        transition: border 0.3s ease;
    }

    option::selection {
        background-color: ${({ theme }) => theme.buttonEdit};
        color: white;
        border-radius: 4px;
        padding: 0.5rem;
        width: 100%;
        box-sizing: border-box;
        transition: border 0.3s ease;
    }

    h1, h2, h3, h4, h5, h6 {
        color: ${({ theme }) => theme.textPrimary};
        margin: 0;
        padding: 0;
        font-weight: normal;
        text-align: center;
        font-family: sans-serif;
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }
    h1 {
        font-size: 2rem;
        margin-bottom: 2rem;
    }
    h2 {
        font-size: 1.75rem;
        margin-bottom: 1.5rem;
    }
    h3 {
        font-size: 1.5rem;
        margin-bottom: 1.25rem;
    }
    h4 {
        font-size: 1.25rem;
        margin-bottom: 1rem;
    }
    h5 {
        font-size: 1rem;
        margin-bottom: 0.75rem;
    }
    h6 {
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
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
