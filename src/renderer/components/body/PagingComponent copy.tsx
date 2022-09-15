import styled from 'styled-components';

const PagingDiv = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const pagingComponent = () => {
  return (
    <PagingDiv>
      <span>{/* {'<<  < '} 1 2 3 4 5 {' >  >>'} */}</span>
    </PagingDiv>
  );
};

export default pagingComponent;
