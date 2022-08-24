import styled from 'styled-components';
import logoImg from '../../../../assets/zibox2_logo@3x.png';

const LogoDiv = styled.div`
  flex: 1;
  margin-top: 17.1px;
  margin-bottom: 14.5px;
`;

const LogoImg = styled.img`
  height: 18.4px;
  margin-left: 16.8px;
  object-fit: contain;
`;

const LogoComponent = () => {
  return (
    <LogoDiv>
      <LogoImg src={logoImg} />
    </LogoDiv>
  );
};

export default LogoComponent;
