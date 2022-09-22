/* eslint-disable no-console */
import styled from 'styled-components';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Record from 'renderer/utils/Record';
import { recordToggle } from '../../store/recordSlice';
// import ZiBox from '../../zibox';
import StopWatch from './StopWatch';
import recordImg from '../../../../assets/rec_sta@2x.png';

const RecordButtonDiv = styled.div`
  height: 36px;
  margin-top: 14px;
  border-radius: 8px;
  background-color: #1f9fae;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const StartRecordButtonSpan = styled.span`
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.7px;
  color: #fff;
`;

const EndRecordButtonSpan = styled.span`
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.7px;
  color: #fff;
`;

const SaveCallRecordingDiv = styled.div`
  margin-top: 24px;
`;

const PhoneNumberDiv = styled.div`
  margin: 15px 0 8px 9px;
`;

const PhoneNumberSpan = styled.span`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: normal;
  text-align: left;
  color: #d4d6d9;
`;

const PhoneNumberInput = styled.input`
  height: 36px;
  border-radius: 8px;
  border: solid 1px #707070;
`;

const MemoDiv = styled.div`
  margin: 15px 0 8px 9px;
`;

const MemoSpan = styled.div`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: normal;
  text-align: left;
  color: #d4d6d9;
`;

const MemoInput = styled.input`
  height: 108px;
  border-radius: 8px;
  border: solid 1px #707070;
`;
const RecordingTimeContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 4px;
  align-items: center;
  gap: 18px;
`;
const RecordImg = styled.img`
  width: 15px;
  height: 15px;
  margin-top: 2px;
`;

const RecordButtonComponent = () => {
  const [manualRecord, setManualRecord] = useState(false);
  const inputPhonenumber = useRef(null);
  const inputMemo = useRef(null);
  // const [inputPhonenumber, setInputPhonenumber] = useState('');
  // const [inputMemo, setInputMemo] = useState('');
  const dispatch = useDispatch();
  const recordState = useSelector((state: any) => {
    return state.recorder.recordState;
  });

  console.log(`RecordButtonComponent.tsx - Record state: ${recordState}`);
  // console.log(`@@@@Rendering.. ${ZiBox.getInstance().checkRecStatus()}`);

  const init = React.useRef<boolean>(false);
  const recorder = React.useRef<any>(new Record());

  React.useEffect(() => {
    if (init.current) return;
    init.current = true;
    if (!manualRecord) {
      window.recordChannel.startRecord(
        'send-record-start',
        async (userKey: string) => {
          if (!recorder.current.recording) {
            await recorder.current.start();
            dispatch(recordToggle(true));
            console.log(
              `RecordButtonComponent.tsx - Auto Record start: ${recordState}`
            );
          }
        }
      );

      window.recordChannel.stopRecord(
        'send-record-stop',
        async (userKey: string) => {
          if (recorder.current.recording) {
            recorder.current.stop(`${Date.now()}`);
            dispatch(recordToggle(false));
            console.log(
              `RecordButtonComponent.tsx - Auto Record stop: ${recordState}`
            );
          }
        }
      );
    }
  }, []);

  const toggleRecord = async () => {
    if (!recorder.current.recording) {
      setManualRecord(true);
      dispatch(recordToggle(true));
      await recorder.current.start();
    } else {
      dispatch(recordToggle(false));
      setManualRecord(false);
      recorder.current.stop(`${Date.now()}`);

      // console.log('phonenumber:', inputPhonenumber);
      // console.log('memo:', inputMemo);
      const { startDate } = recorder.current;
      const date1 = `${startDate.getFullYear()}.${startDate.getMonth()}.${startDate.getDate()}`;
      const date2 = `${startDate.getHours()}:${startDate.getminutes()}:${startDate.getSeconds()}`;
      console.log('date1:', date1);
      console.log('date2:', date2);
      console.log('phonenumber:', inputPhonenumber.current.value);
      console.log('memo:', inputMemo.current.value);

      // window.ipcDbChannel.insertMenualQureyToMain(
      //   inputPhonenumber.current.value,
      //   inputMemo.current.value,
      //   (result: any) => {
      //     console.log('Menual info insert result:', result);
      //   }
      // );
    }
  };

  // const onChangePhonenumber = (e) => {
  //   setInputPhonenumber(e.target.value);
  // };
  // const onChangeMemo = (e) => {
  //   setInputMemo(e.target.value);
  // };

  return (
    <>
      {manualRecord ? (
        <SaveCallRecordingDiv>
          <RecordingTimeContainer>
            <RecordImg src={recordImg} />
            <StopWatch />
          </RecordingTimeContainer>
          <PhoneNumberDiv>
            <PhoneNumberSpan>Phone number</PhoneNumberSpan>
          </PhoneNumberDiv>
          <PhoneNumberInput ref={inputPhonenumber} />
          {/* <PhoneNumberInput onChange={onChangePhonenumber} /> */}
          <MemoDiv>
            <MemoSpan>Memo</MemoSpan>
          </MemoDiv>
          <MemoInput ref={inputMemo} />
          {/* <MemoInput onChange={onChangeMemo} /> */}
        </SaveCallRecordingDiv>
      ) : (
        ''
      )}
      <RecordButtonDiv onClick={toggleRecord}>
        {manualRecord ? (
          <EndRecordButtonSpan>Save & End Call Recording</EndRecordButtonSpan>
        ) : (
          <StartRecordButtonSpan>Call Recording</StartRecordButtonSpan>
        )}
      </RecordButtonDiv>
    </>
  );
};

export default RecordButtonComponent;
