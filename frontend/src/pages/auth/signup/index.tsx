import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SignUpSchema } from '../../../validators/auth.schema';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Form';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { signup, signupFailure } from '../../../features/auth/auth.slice';

const SignUpPage: React.FC = () => {

  const dispatch = useAppDispatch();

  const { signingUp, mutuated } = useAppSelector(state => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = (data: z.infer<typeof SignUpSchema>) => {
    try {
      dispatch(signup(data));
    } catch (error) {
      if (error instanceof Error && error.message) {
        dispatch(signupFailure(error.message));
      } else {
        dispatch(signupFailure('An unknown error occurred'));
      }

    }
  };

  React.useEffect(() => {
    if (mutuated) {
      window.location.href = '/login'
    }
  }, [mutuated]);


  return (
    <Container>
      <Card>
        <Title>Welcome 👋</Title>
        <Subtitle>Sign up to get started with your music journey</Subtitle>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" placeholder="Enter username" {...register('username')} />
            {errors.username && <ErrorText>{errors.username.message}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter email" {...register('email')} />
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter password" {...register('password')} />
            {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" placeholder="Confirm password" {...register('confirmPassword')} />
            {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}
          </InputGroup>

          <StyledButton disabled={signingUp} type="submit">Create Account</StyledButton>
        </Form>

        <Footer>
          Already have an account? <a href="/login">Login</a>
        </Footer>
      </Card>
    </Container>
  );
};

export default SignUpPage;


const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  @media (max-width: 480px) {
    padding: 0.5rem;
  }

  overflow: hidden;
`;

const Card = styled.div`
   width: 100%;
   max-width: 480px;
  background-color: ${({ theme }) => theme.cardBg};
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 0.25rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Label = styled.label`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.textPrimary};
  font-weight: 500;
`;


const ErrorText = styled.span`
  font-size: 0.85rem;
  color: #ef4444;
`;

const StyledButton = styled(Button)`
  margin-top: 0.5rem;
  padding: 0.75rem 1.5rem;
`;

const Footer = styled.p`
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textMuted};

  a {
    color: ${({ theme }) => theme.buttonBg};
    font-weight: 500;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
