import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '../../../validators/auth.schema';
import { z } from 'zod';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Form';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { login, loginFailure } from '../../../features/auth/auth.slice';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const disptach = useAppDispatch();
  const navigate = useNavigate();
  const {logingIn, mutuated} = useAppSelector(state => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    try {
      disptach(login(data));
    } catch (error) {
      if (error instanceof Error && error.message) {
        disptach(loginFailure(error.message));
      } else {
        disptach(loginFailure('An unknown error occurred'));
      }
      
    }
  };

  React.useEffect(() => {
    if (mutuated) {
      navigate('/');
    }
  }, [mutuated]);

  return (
    <Container>
      <Card>
        <Title>Welcome Back 👋</Title>
        <Subtitle>Login to access your music dashboard</Subtitle>

        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Label>Email</Label>
            <Input  hasError={!!errors.email} type="email" placeholder="you@example.com" {...register('email')} />
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label>Password</Label>
            <Input hasError={!!errors.password}  type="password" placeholder="••••••••" {...register('password')} />
            {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
          </InputGroup>

          <Button disabled={logingIn} style={{padding: "0.7rem"}} type="submit">Login</Button>
        </StyledForm>

        <Footer>
          Don’t have an account? <a href="/signup">Sign Up</a>
        </Footer>
      </Card>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const Card = styled.div`
  width: 100%;
  max-width: 480px;
  background-color: ${({ theme }) => theme.cardBg};
  padding: 2.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 0.25rem;
`;

const Subtitle = styled.p`
  font-size: 0.95rem;
  text-align: center;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 2rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textPrimary};
`;

const ErrorText = styled.p`
  font-size: 0.75rem;
  color: #ef4444;
  margin: 0;
`;

const Footer = styled.p`
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textMuted};

  a {
    color: ${({ theme }) => theme.inputFocusBorder || theme.textPrimary};
    font-weight: 500;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
