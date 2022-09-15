import styled from 'styled-components';
import TitleComponent from './TitleComponent';
import ListComponent from './ListComponent';
// import PagingComponent from './PagingComponent';

const BodyDiv = styled.div`
  background: white;
  flex-grow: 1;
  padding: 20px 15px 32px 37px;
`;

const BodyComponent = () => {
  return (
    <BodyDiv>
      <TitleComponent />
      <ListComponent />
      {/* <PagingComponent /> */}
    </BodyDiv>
  );
};

export default BodyComponent;
