import React, { useState } from 'react';
import styled from 'styled-components';

const SearchDiv = styled.div`
  height: 191px;
  background-color: #707070;
  width: 100%;
  position: fixed;
  z-index: 99; // 99로 생성되게
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: normal;
  color: #fff;
`;

const SearchComponent = () => {
  const [searchState, setSearchState] = useState(false);

  return <SearchDiv>검색 필터</SearchDiv>;
};

export default SearchComponent;
