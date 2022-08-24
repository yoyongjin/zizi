import styled from 'styled-components';
import playImg from '../../../../assets/play@3x.png';

const ContentUl = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 16px;
  font-size: 12px;
  font-weight: normal;
  color: #707070;
  margin: 0;
  margin-bottom: 8px;
  padding: 0;
  padding-bottom: 7px;
  border-bottom: 1px solid #707070;
`;

const PlayeLi = styled.li`
  width: 5.67%;
  min-width: 24px;
  margin-left: 1.71%;
  display: flex;
`;

const PlayImg = styled.img`
  height: 16.5px;
  color: #707070;
  filter: invert(36%) sepia(18%) saturate(0%) hue-rotate(260deg)
    brightness(111%) contrast(77%);
`;

const DateLi = styled.li`
  width: 10.32%;
  min-width: 58px;
`;

const TimeLi = styled.li`
  width: 11.19%;
  min-width: 48px;
`;

const PhoneNumberLi = styled.li`
  width: 17.28%;
  min-width: 82px;
`;

const MemoLi = styled.li`
  width: 51.08%;
  min-width: 550px;
`;

const CheckboxLi = styled.li`
  width: 2.75%;
  display: flex;
`;

const ListContentComponent = () => {
  return (
    <ContentUl>
      <PlayeLi>
        <PlayImg src={playImg} />
      </PlayeLi>
      <DateLi>2022.04.08</DateLi>
      <TimeLi>23:24:16</TimeLi>
      <PhoneNumberLi>010-1234-5678</PhoneNumberLi>
      <MemoLi>Phasellus risus turpis, pretium sit amet magna non</MemoLi>
      <CheckboxLi>
        <input type="checkbox" />
      </CheckboxLi>
    </ContentUl>
  );
};

export default ListContentComponent;
