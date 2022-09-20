/* eslint-disable no-console */
import styled from 'styled-components';
import TitleComponent from './TitleComponent';
import ListComponent from './ListComponent';

const BodyDiv = styled.div`
  box-sizing: border-box;
  height: 550px;
  width: 972px;
  background: white;
  flex-grow: 1;
  padding: 10px 15px 26px 37px;
  /* background-color: #aaa; */
`;

const BodyComponent = () => {
  return (
    <BodyDiv>
      <TitleComponent />
      <ListComponent />
    </BodyDiv>
  );
};

export default BodyComponent;
