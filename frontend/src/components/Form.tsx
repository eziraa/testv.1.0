import { styled } from "styled-components";
import { Button, ButtonRoot } from "./Button";

const FormContainer = styled.form`
  background: ${({ theme }) => theme.formBackground || '#fff'};
  padding: 2rem;
  height: fit-content;
  max-width: 500px;
  width: 400px;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.formBoxShadow || '0 4px 10px rgba(0, 0, 0, 0.1)'};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  @media (max-width: 700px) {
    width: 90%;
    max-width: 90%;
    padding: 1rem;
    border-radius: 8px; 
    box-shadow: ${({ theme }) => theme.formBoxShadow || '0 2px 5px rgba(0, 0, 0, 0.1)'};
  }

  input {
    width: 100%;
    padding: 0.7rem 1rem;
    margin-bottom: 1rem;
  }
`;

interface InputProps {
  hasError?: boolean;
}

const FormHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 0.3rem;
  justify-content: space-between;
  align-items: center;
`

const Input = styled.input<InputProps>`
  width: 100%;
  padding: 0.7rem 1rem;
  margin-bottom: 0.2rem;
  border: 1px solid
    ${({ hasError, theme }) => (hasError ? theme.errorColor || 'red' : theme.inputBorder || '#ccc')};
  border-radius: 8px;
  background: ${({ theme }) => theme.inputBackground || '#fff'};
  color: ${({ theme }) => theme.inputTextColor || '#000'};

  &:focus-visible {
    outline: none;
    border: 1px solid
      ${({ hasError, theme }) => (hasError ? theme.errorColor || 'red' : theme.inputFocusBorder || '#007bff')};
    box-shadow: 0 0 5px
      ${({ hasError, theme }) => (hasError ? theme.errorColor || 'red' : theme.inputFocusBorder || '#007bff')};
  }
`;

const Select = styled.select<InputProps>`
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.8rem;
  border: 1px solid
    ${({ hasError, theme }) => (hasError ? theme.errorColor || 'red' : theme.inputBorder || '#ccc')};
  border-radius: 8px;
  background: ${({ theme }) => theme.inputBackground || '#fff'};
  color: ${({ theme }) => theme.inputTextColor || '#000'};
  cursor: pointer;
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${({ theme }) => theme.inputTextColor || '#000'}"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 1.5em;
  transition: border 0.3s ease;
  &:focus-visible {
    outline: none;
    border: 1px solid
      ${({ hasError, theme }) => (hasError ? theme.errorColor || 'red' : theme.inputFocusBorder || '#007bff')};
    box-shadow: 0 0 5px
      ${({ hasError, theme }) => (hasError ? theme.errorColor || 'red' : theme.inputFocusBorder || '#007bff')};
  }
`

const SubmitButton = styled(Button)`
  
  cursor: pointer;
  transition: background-color 0.3s ease;



  &:disabled {
    opacity: 0.9;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span<InputProps>`
  color: ${({ theme }) => theme.errorColor || 'red'};
  font-size: 0.8rem;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
  display: ${({ hasError }) => (hasError ? 'block' : 'none')};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.15rem;
  color: ${({ theme }) => theme.labelColor || '#333'};
`;

export { FormContainer, Input, Select, FormHeader, InputGroup, Label, ErrorMessage, SubmitButton };
