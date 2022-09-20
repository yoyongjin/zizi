import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import titlePlayImg from '../../../../assets/play@3x.png';

const TitlePlayeLi = styled.li`
  width: 6.84%;
  min-width: 31px;
  margin-left: 0.55%;
  display: flex;
`;

const TitlePlayImg = styled.img`
  height: 18px;
  object-fit: contain;
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

const Checkbox = styled.input`
  border: 2px solid #000;
`;

const TitleUl = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 17px;
  font-size: 13px;
  font-weight: 600;
  color: #3a3a40;
  margin: 0;
  margin-bottom: 6px;
  padding: 0;
  /* padding-bottom: 8.5px; */
  padding: 9.5px 0;
  border-bottom: 2px solid #3a3a40;
`;

const ListTitleComponent = (props: any) => {
  const { allCheckedHandler } = props;
  const [bChecked, setChecked] = useState(false);

  const checkHandler = ({ target }) => {
    setChecked(!bChecked);
    allCheckedHandler(target.checked);
  };

  return (
    <TitleUl>
      <TitlePlayeLi>
        <TitlePlayImg src={titlePlayImg} />
      </TitlePlayeLi>
      <DateLi>Date</DateLi>
      <TimeLi>Time</TimeLi>
      <PhoneNumberLi>Phone number</PhoneNumberLi>
      <MemoLi>#</MemoLi>
      <CheckboxLi>
        <Checkbox
          type="checkbox"
          checked={bChecked}
          onChange={(e) => checkHandler(e)}
        />
      </CheckboxLi>
    </TitleUl>
  );
};

export default ListTitleComponent;
