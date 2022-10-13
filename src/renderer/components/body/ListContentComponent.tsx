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
import sttImg from '../../../../assets/stt_ico.png';

const RecordContentContainer = styled.div`
  display: flex;
  align-items: center;
  height: 15px;
  font: 12px Segoe UI;
  font-weight: normal;
  color: #707070;
  margin: 0;
  padding: 0;
  padding: 7.5px 0;
  border-bottom: 1px solid #707070;
  /* background-color: lightblue; */
`;

const PlayImg = styled.img`
  height: 16.5px;
  color: #707070;
  cursor: pointer;
  filter: invert(36%) sepia(18%) saturate(0%) hue-rotate(260deg)
    brightness(111%) contrast(77%);
  /* background-color: #bbb; */
  margin-left: 8px;
  margin-right: 21.75px;
`;

const DateSpan = styled.span`
  width: 57px;
  margin-right: 38px;
`;

const TimeSpan = styled.span`
  width: 44px;
  margin-right: 59px;
`;

const PhoneNumberSpan = styled.span`
  width: 112px;
  margin-right: 48px;
  font: 12px Segoe UI;
  /* background-color: red; */
`;

const MemoInput = styled.input`
  width: 344px;
  border: none;
  margin-right: 76px;
`;

const CheckBox = styled.input`
  width: 16px;
  height: 16px;
  margin-right: 6px;
`;
const FullScreenContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

const STTBtn = styled.button`
  width: 18px;
  height: 18px;
  border: none;
  background: none;
  cursor: pointer;
  /* background-color: #ccc; */
  padding: 0;
  margin-right: 53px;
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
    // console.log('@@@@@@@@@@@@@@@@@@@@', phoneNumber, phoneNumber.length);

    if (phoneNumber.length === 9 && phoneNumber.startsWith('03' || '06')) {
      return phoneNumber.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    else if (phoneNumber.length === 9 && !phoneNumber.startsWith('03' || '06')) {
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
    return phoneNumber;
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
      '-------------------------------------------window fullscreen on'
    );
    window.windowChannel.windowFullScreenToMain(true);
    dispatch(setSttModalFileName(fileName));
    dispatch(sttModalToggle(true));
  };

  return (
    <RecordContentContainer>
      {/* <FullScreen handle={screen}>
        <FullScreenContainer
          // className="full-screenable-node"
          style={{ background: 'red' }}
        >
          test
        </FullScreenContainer>
      </FullScreen> */}

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

      {/* 여기 STT 버튼 */}

      {/* <button onClick={screen.enter}>STT</button> */}
      <STTBtn
        onClick={() => {
          sttModalHandler(data.filename);
        }}
      >
        <img src={sttImg} />
      </STTBtn>
      <DateSpan>{data.date}</DateSpan>
      <TimeSpan>{data.time}</TimeSpan>
      <PhoneNumberSpan>{phoneNumberFormat(data.phonenumber)}</PhoneNumberSpan>

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

      <CheckBox
        type="checkbox"
        checked={bChecked}
        onChange={(e) => checkHandler(e)}
      />
    </RecordContentContainer>
  );
};

export default ListContentComponent;
