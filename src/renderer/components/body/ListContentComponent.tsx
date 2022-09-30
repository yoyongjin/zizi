import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import {
  sttModalToggle,
  setSttModalFileName,
} from 'renderer/store/sttModalSlice';
import {
  callPlayerToggle,
  setCallPlayerFileName,
} from '../../store/callPlayerSlice';
import playImg from '../../../../assets/play@3x.png';
// import CallPlayerModal from '../side/CallPlayerModal';
// import ModalPortal from '../player/ModalPortal';
// import RecordModal from '../player/RecordModal';

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
  cursor: pointer;
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
const FullScreenContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

const STTBtn = styled.button`
  width: 63px;
  height: 24px;
  border: 1px solid #707070;
  border-radius: 8px;
  background: #28bfde;
  color: #fff;
  opacity: 1;
  cursor: pointer;
`;

const ListContentComponent = (props: any) => {
  const { data, checkedItemHandler, isAllChecked, checkedItems } = props;
  const [bChecked, setChecked] = useState(false);
  // const [isModalOn, setIsModalOn] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  // const sttModalState = useSelector((state: any) => {
  //   return state.sttModaler.sttModalState;
  // });

  // const callPlayerState = useSelector((state: any) => {
  //   return state.callPlayer.callPlayerState;
  // });

  const checkHandler = ({ target }) => {
    setChecked(!bChecked);
    checkedItemHandler(data.id, target.checked);
  };

  const allCheckHandler = () => {
    // setChecked(isAllChecked);
    if (checkedItems.has(data.id)) setChecked(true);
    else setChecked(false);
  };

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

  const onEnterHandler = (id, e) => {
    console.log(`keyCode: ${e.key}`);
    if (e.key === 'Enter') {
      console.log(`onEnter event - id: ${id} memo: ${e.target.value}`);
      // onBlurHandler(id, e);
      if (inputRef.current !== null) inputRef.current.blur();
    }
  };

  const phoneNumberFormat = (phoneNumber) => {
    // return `${phoneNumber.substring(0, 3)}-${phoneNumber.substring(
    //   3,
    //   7
    // )}-${phoneNumber.substring(7, 11)}`;
    console.log('@@@@@@@@@@@@@@@@@@@@', phoneNumber, phoneNumber.length);

    if (phoneNumber.length === 9 && phoneNumber.startsWith('03' || '06')) {
      return phoneNumber.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    if (phoneNumber.length === 9 && !phoneNumber.startsWith('03' || '06')) {
      return phoneNumber.replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3');
    }
    if (phoneNumber.length === 10 && phoneNumber.startsWith('03' || '06')) {
      return phoneNumber.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    if (phoneNumber.length === 10 && phoneNumber.startsWith('0570')) {
      return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1-$2-$3');
    }
    if (phoneNumber.length === 10 && phoneNumber.startsWith('0476' || '0724')) {
      return phoneNumber.replace(/(\d{4})(\d{2})(\d{4})/, '$1-$2-$3');
    }
    if (
      phoneNumber.length === 10 &&
      !phoneNumber.startsWith('03' || '06' || '0570' || '0476' || '0724')
    ) {
      return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    if (phoneNumber.length === 11) {
      return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    if (phoneNumber.length === 12) {
      return phoneNumber.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    if (phoneNumber.length === 13) {
      return phoneNumber.replace(/(\d{4})(\d{4})(\d{5})/, '$1-$2-$3');
    }
    if (phoneNumber.length === 14) {
      return phoneNumber.replace(/(\d{4})(\d{5})(\d{5})/, '$1-$2-$3');
    }
  };

  // const modalToggleHandler = () => {
  //   setIsModalOn(!isModalOn);
  // };

  // const testFn = () => {
  //   // 일렉트론 자식창
  //   const childWindow = window.open('about:blank', 'modal');
  //   childWindow.document.write('<h1>강병현</h1>');
  // };

  // const screen = useFullScreenHandle();

  const sttModalHandler = (fileName: string) => {
    console.log(
      '-------------------------------------------window fullscreen..'
    );
    window.windowChannel.windowFullScreenToMain(true);
    dispatch(setSttModalFileName(fileName));
    dispatch(sttModalToggle(true));
  };

  return (
    <ContentUl>
      {/* <FullScreen handle={screen}>
        <FullScreenContainer
          // className="full-screenable-node"
          style={{ background: 'red' }}
        >
          test
        </FullScreenContainer>
      </FullScreen> */}
      <PlayeLi>
        <PlayImg
          src={playImg}
          onClick={() => {
            dispatch(callPlayerToggle(true));
            dispatch(setCallPlayerFileName(data.filename));
          }}
        />
        {/* <PlayImg src={playImg} onClick={testFn} /> */}
        {/* <PlayImg src={playImg} onClick={modalToggleHandler} />
        <ModalPortal>
          {isModalOn && (
            <RecordModal
              // onClose={modalToggleHandler}
              fileName={data.filename}
            />
          )}
        </ModalPortal> */}
      </PlayeLi>
      {/* 여기 STT 버튼 */}

      {/* <button onClick={screen.enter}>STT</button> */}
      <STTBtn
        onClick={() => {
          sttModalHandler(data.filename);
        }}
      >
        STT
      </STTBtn>
      <DateLi>{data.date}</DateLi>
      <TimeLi>{data.time}</TimeLi>
      <PhoneNumberLi>{phoneNumberFormat(data.phonenumber)}</PhoneNumberLi>
      <MemoLi>
        <MemoInput
          defaultValue={data.memo}
          ref={inputRef}
          // value={input}
          // onFocus={(e) => {
          //   onFocusHandler(data.id, e);
          // }}
          onBlur={(e) => {
            onBlurHandler(data.id, e);
          }}
          onKeyDown={(e) => {
            onEnterHandler(data.id, e);
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
