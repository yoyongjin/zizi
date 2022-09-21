import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import playImg from '../../../../assets/play@3x.png';

const ContentUl = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  /* justify-content: flex-start; */
  height: 15px;
  font-size: 12px;
  font-weight: normal;
  color: #707070;
  margin: 0;
  /* margin-bottom: 8px; */
  padding: 0;
  padding: 7.5px 0;
  /* padding-bottom: 7px; */
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

const MemoInput = styled.input`
  width: 98%;
  border: none;
`;

const CheckboxLi = styled.li`
  width: 2.75%;
  display: flex;
`;

const ListContentComponent = (props: any) => {
  const { data, checkedItemHandler, isAllChecked } = props;
  const [bChecked, setChecked] = useState(false);

  const checkHandler = ({ target }) => {
    setChecked(!bChecked);
    checkedItemHandler(data.id, target.checked);
  };

  const allCheckHandler = () => setChecked(isAllChecked);

  useEffect(() => allCheckHandler(), [isAllChecked]);

  const [memoContent, setMemoContent] = useState(data.memo);

  // const onFocusHandler = (id, e) => {
  //   console.log(`onFocus event - id: ${id} memo: ${e.target.value}`);
  //   setMemoId(id);
  //   setMemoContent(e.target.value);
  // };

  const onBlurHandler = (id, e) => {
    console.log(`onBlur event - id: ${id} memo: ${e.target.value}`);

    if (memoContent !== e.target.value) {
      console.log('ListComponent.tsx - ipcRenderer.updateQureyToMain');
      setMemoContent(e.target.value);

      // 여기 DB 메모 업데이트
      window.ipcDbChannel.updateMemoQureyToMain(
        data.id,
        e.target.value,
        (result: any) => {
          console.log('Memo update result:', result);
        }
      );
    }
  };

  return (
    <ContentUl>
      <PlayeLi>
        <PlayImg src={playImg} />
      </PlayeLi>
      <DateLi>{data.date}</DateLi>
      <TimeLi>{data.time}</TimeLi>
      <PhoneNumberLi>{data.phonenumber}</PhoneNumberLi>
      <MemoLi>
        <MemoInput
          defaultValue={data.memo}
          // value={input}
          // onFocus={(e) => {
          //   onFocusHandler(data.id, e);
          // }}
          onBlur={(e) => {
            onBlurHandler(data.id, e);
          }}
        />
      </MemoLi>
      <CheckboxLi>
        <input
          type="checkbox"
          checked={bChecked}
          onChange={(e) => checkHandler(e)}
        />
      </CheckboxLi>
    </ContentUl>
  );
};

export default ListContentComponent;
