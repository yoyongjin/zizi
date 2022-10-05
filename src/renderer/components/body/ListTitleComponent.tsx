import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import titlePlayImg from '../../../../assets/play@3x.png';
import sttTitleImg from '../../../../assets/stt_ico_title.png';

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  /* height: 40px; */
  padding-top: 20px;
  padding-bottom: 8px;
  padding-left: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #3a3a40;
  border-bottom: 2px solid #3a3a40;
  /* background-color: #ccc; */
`;

const TitlePlayImg = styled.img`
  height: 16.5px;
  width: 16.5px;
  object-fit: contain;
  margin-right: 21.75px;
`;

const SttImg = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 53px;
  /* background-color: #ccc; */
`;

const DateLi = styled.span`
  margin-right: 67px;
`;

const TimeLi = styled.span`
  margin-right: 74px;
`;

const PhoneNumberLi = styled.span`
  margin-right: 72px;
`;

const MemoLi = styled.span`
  margin-right: 412px;
`;

// const CheckboxLi = styled.span`
//   width: 2.75%;
//   display: flex;
// `;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  border: 2px solid #707070;
`;

const ListTitleComponent = (props: any) => {
  const { allCheckedHandler, isAllChecked } = props;
  const [bChecked, setChecked] = useState(false);

  const checkHandler = ({ target }) => {
    setChecked(!bChecked);
    allCheckedHandler(target.checked);
  };

  useEffect(() => {
    setChecked(isAllChecked);
  }, [isAllChecked]);

  return (
    <TitleContainer>
      <TitlePlayImg src={titlePlayImg} />
      <SttImg src={sttTitleImg} />
      <DateLi>Date</DateLi>
      <TimeLi>Time</TimeLi>
      <PhoneNumberLi>Phone number</PhoneNumberLi>
      <MemoLi>#</MemoLi>
      <Checkbox
        type="checkbox"
        checked={bChecked}
        onChange={(e) => checkHandler(e)}
      />
    </TitleContainer>
  );
};

export default ListTitleComponent;
