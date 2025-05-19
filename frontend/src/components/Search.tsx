import  { useEffect, useState } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";

const SongSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const [query, setQuery] = useState(search);

  useEffect(() => {
    const delay = setTimeout(() => {
      const trimmed = query.trim();
      setSearchParams(trimmed ? { search: trimmed } : {});      
    }, 400);

    return () => clearTimeout(delay);
  }, [query,  setSearchParams]);

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search songs or artists..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
    </SearchContainer>
  );
};

export default SongSearch;
const SearchContainer = styled.div`
  margin-right: 1rem;
  padding: 0;
  max-width: 700px;
  margin: 0 auto;
  align-self: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.55rem 1.25rem;
  font-size: 1rem;
  border-radius: 0.7rem;
  outline: none;
  background: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.textPrimary};
  transition: border-color 0.2s ease;
  border: none;

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
  }

  &:focus {
    border:1.4px solid ${({ theme }) => theme.accent};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.accent}22;
  }
`;
