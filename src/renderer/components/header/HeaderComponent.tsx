import styled from 'styled-components';
import LogoComponent from './LogoComponent';
import MenuComponent from './MenuComponent';

const HeaderDiv = styled.div`
  margin: 0;
  padding: 0;
  width: 1200px;
  height: 50px;
  background-color: #4878c1;
  display: flex;
  align-items: center;
  -webkit-app-region: drag; // 윈도우 드래그
`;

const HeaderComponent = (props: any) => {
  const { changeSearchState, searchState } = props;
  console.log('changeSearchState:', changeSearchState);
  console.log('searchState:', searchState);

  return (
    <HeaderDiv>
      <LogoComponent />
      <MenuComponent
        changeSearchState={changeSearchState}
        searchState={searchState}
      />
    </HeaderDiv>
  );
};

export default HeaderComponent;
