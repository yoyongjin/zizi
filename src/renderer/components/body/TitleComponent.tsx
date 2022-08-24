import styled from 'styled-components';

const TitleDiv = styled.div`
  height: 10%;
`;

const TitleSpan = styled.span`
  font-size: 16px;
  font-weight: 600;
  line-height: 2;
  letter-spacing: -0.8px;
  text-align: left;
  color: #3a3a40;
`;

const TitleComponent = () => {
  return (
    <TitleDiv>
      <TitleSpan>Call Recording List</TitleSpan>
    </TitleDiv>
  );
};

export default TitleComponent;
