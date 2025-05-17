import { styled } from "styled-components";

const Card = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.cardShadow};
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  padding-bottom: 0.5rem;
`;

const CardContent = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem; 
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1rem;
  line-height: 1.5;
`;

const CardActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem; 
  gap: 1rem;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.textPrimary};
`;

const CardText = styled.p`
  margin: 0.5rem 0;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1rem;
  line-height: 1.5;
`;

export {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardText,
  CardActions
};
