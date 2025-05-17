import { styled } from "styled-components";

const FormContainer = styled.form`
  background: ${({ theme }) => theme.formBackground || '#fff'};
  padding: 2rem;
  height: 100%;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.formBoxShadow || '0 4px 10px rgba(0, 0, 0, 0.1)'};
`;

interface InputProps {
  hasError?: boolean;
}

const Input = styled.input<InputProps>`
  display: block;
  width: 90%;
  max-width: 96%;
  margin-bottom: 1rem;
  padding: 0.8rem;
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

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.primaryButtonBg || '#007bffdd'};
  padding: 0.7rem 1.5rem;
  color: ${({ theme }) => theme.primaryButtonColor || '#fff'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryButtonHoverBg || '#007bff'};
  }
`;

const ErrorMessage = styled.span<InputProps>`
  color: ${({ theme }) => theme.errorColor || 'red'};
  font-size: 0.8rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  display: ${({ hasError }) => (hasError ? 'block' : 'none')};
`;

const InputContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.labelColor || '#333'};
`;

export { FormContainer, Input, InputContainer, Label, ErrorMessage, SubmitButton };
