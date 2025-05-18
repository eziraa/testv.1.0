import { Settings, User } from "lucide-react"
import React from "react"
import styled from "styled-components"
import { Avatar } from "./Layout"
import { useAppSelector } from "../app/store"

const Dropdown = styled.div`
  width: 200px;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  padding: 0.75rem;
  font-family: 'Inter', sans-serif;
  z-index: 3000;
  position: absolute;
  top: 56px;
  right: 16px;
`

const UserSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  gap: 0.65rem;
`



const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`

const UserName = styled.div`
  font-weight: 600;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.textPrimary};
`

const UserRole = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.mutedTextPrimary};
`

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0.4rem;
  border-radius: 6px;
  font-size: 0.88rem;
  color: ${({ theme }) => theme.textPrimary};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryButtonHoverBg};
    color: aliceblue;
  }
`

const IconWrapper = styled.div`
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LogoutButton = styled.button`
  width: 100%;
  margin-top: 0.75rem;
  padding: 0.5rem;
  font-size: 0.85rem;
  border: none;
  border-radius: 6px;
  background: ${({ theme }) => theme.danger};
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.buttonDeleteHoverBackground};
  }
`

const ProfileDropdown: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user)
  return (
    <Dropdown className="profile-dropdown">
      <UserSection>
        <Avatar src="/avatar.png" fallbackIcon={<User size={18} />} />
        <UserDetails>
          <UserName> {user?.username || "No user"} </UserName>
          <UserRole>{user?.email || "test@test.com"}</UserRole>
        </UserDetails>
      </UserSection>

      <MenuItem><IconWrapper><User size={16} /></IconWrapper>Profile</MenuItem>
      <MenuItem><IconWrapper><Settings size={16} /></IconWrapper>Settings</MenuItem>
      <LogoutButton>Log Out</LogoutButton>
    </Dropdown>
  )
}

export default ProfileDropdown
