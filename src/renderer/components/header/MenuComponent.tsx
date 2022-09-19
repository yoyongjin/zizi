import styled from 'styled-components';
import searchImg from '../../../../assets/search@3x.png';
import triangleUpImg from '../../../../assets/triangle_up@3x.png';
import triangleDownImg from '../../../../assets/triangle_down@3x.png';
import hideImg from '../../../../assets/hide@3x.png';
import closeImg from '../../../../assets/close@3x.png';

const MenuDiv = styled.div`
  display: flex;
  margin-right: 15px;
  margin-top: 17.1px;
  margin-bottom: 14.5px;
  align-items: center;
`;

const SettingButton = styled.div`
  width: 79px;
  height: 21px;
  margin: 0 44px 0 0;
  border-radius: 10.5px;
  border: solid 1px #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SettingSpan = styled.span`
  font-size: 12px;
  font-weight: normal;
  color: #fff;
`;

const SearchDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SearchLeftButton = styled.img`
  width: 20px;
  height: 20px;
  margin: 0 5px 0 0;
  object-fit: contain;
`;

const SearchRightButton = styled.img`
  width: 10px;
  height: 9px;
  margin: 0 5px 0 0;
  object-fit: contain;
`;

const HideButton = styled.img`
  width: 20px;
  height: 20px;
  margin: 0 10px 1px 44px;
  object-fit: contain;
`;

const CloseButton = styled.img`
  width: 20px;
  height: 20px;
  margin: 0 0 1px 10px;
  object-fit: contain;
`;

const MenuComponent = (props: any) => {
  const { changeSearchState, searchState } = props;
  return (
    <MenuDiv>
      {/* <SettingButton>
        <SettingSpan>SETTING</SettingSpan>
      </SettingButton>
      <SearchDiv onClick={changeSearchState}>
        <SearchLeftButton src={searchImg} />
        {searchState ? (
          <SearchRightButton src={triangleUpImg} />
        ) : (
          <SearchRightButton src={triangleDownImg} />
        )}
      </SearchDiv> */}
      <HideButton src={hideImg} />
      <CloseButton src={closeImg} />
    </MenuDiv>
  );
};

export default MenuComponent;
