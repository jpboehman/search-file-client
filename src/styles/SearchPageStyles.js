import styled from "styled-components";

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
`;

export const FilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  width: 100%;
`;

export const FilterLabel = styled.label`
  font-weight: 600;
  font-size: 14px;
`;

export const FilterInput = styled.input`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const SearchResults = styled.div`
  margin-top: 20px;
  width: 100%;
`;

export const SearchResultItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
  }
`;
