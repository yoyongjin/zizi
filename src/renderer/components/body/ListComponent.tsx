import styled from 'styled-components';
import ListTitleComponent from './ListTitleComponent';
import ListContentComponent from './ListContentComponent';

const ListDiv = styled.div`
  height: 80%;
  margin-top: 23px;
`;

const ListComponent = () => {
  return (
    <ListDiv>
      <ListTitleComponent />
      <ListContentComponent />
    </ListDiv>
  );
};

export default ListComponent;
