/* eslint-disable no-console */
import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Record from 'renderer/utils/Record';
import { recordToggle } from '../../store/recordSlice';
import StopWatch from './StopWatch';
import recordImg from '../../../../assets/rec_sta@2x.png';

interface PhoneNumberInputProps {
  toggle: boolean;
}

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

// const PhoneNumberInput = styled.input<PhoneNumberInputProps>`
// border: ${(props) => props.toggle ? 'solid 1px red' : 'solid 1px #707070'};
const PhoneNumberInput = styled.input`
  width: 180px;
  height: 36px;
  border-radius: 8px;
  border: solid 1px #707070;
  box-sizing: border-box;
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

const MemoInput = styled.textarea`
  width: 180px;
  height: 108px;
  border-radius: 8px;
  border: solid 1px #707070;
  box-sizing: border-box;
  resize: none;
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
  const dispatch = useDispatch();
  const recordState = useSelector((state: any) => {
    return state.recorder.recordState;
  });
  const [phoneNumeberInputValue, setPhoneNumeberInputValue] = useState('');

  useEffect(() => {
    setPhoneNumeberInputValue('');
  }, [manualRecord]);

  console.log(`RecordButtonComponent.tsx - Record state: ${recordState}`);

  const init = React.useRef<boolean>(false);
  const recorder = React.useRef<any>(new Record());

  const dateFormat = (nowDate: Date) => {
    console.log('type:', typeof nowDate);
    return `${nowDate.getFullYear()}${
      nowDate.getMonth() + 1 < 10
        ? `0${nowDate.getMonth() + 1}`
        : nowDate.getMonth() + 1
    }${nowDate.getDate() < 10 ? `0${nowDate.getDate()}` : nowDate.getDate()}${
      nowDate.getHours() < 10 ? `0${nowDate.getHours()}` : nowDate.getHours()
    }${
      nowDate.getMinutes() < 10
        ? `0${nowDate.getMinutes()}`
        : nowDate.getMinutes()
    }${
      nowDate.getSeconds() < 10
        ? `0${nowDate.getSeconds()}`
        : nowDate.getSeconds()
    }`;
  };

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
          console.log(`#################RENDERER TIME: ${Date.now()}`);
          if (recorder.current.recording) {
            // recorder.current.stop(`${Date.now()}`);
            // const fileName = dateFormat(new Date(userKey));
            // recorder.current.stop(dateFormat(new Date()));
            recorder.current.stop(userKey);
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
      let phoneNumberText = inputPhonenumber.current.value;
      if (phoneNumberText) {
        dispatch(recordToggle(false));
        setManualRecord(false);

        const filename = dateFormat(new Date());
        recorder.current.stop(filename);

        const startDate = dateFormat(recorder.current.startDate);
        const substringDate = startDate.substring(0, 8);
        const substringTime = startDate.substring(8, 14);
        const formatDate = `${substringDate.substring(
          0,
          4
        )}.${substringDate.substring(4, 6)}.${substringDate.substring(6, 8)}`;
        const formatTime = `${substringTime.substring(
          0,
          2
        )}:${substringTime.substring(2, 4)}:${substringTime.substring(4, 6)}`;

        const memoText = inputMemo.current.value;

        phoneNumberText = phoneNumberText
          .trim()
          .replaceAll(' ', '')
          .replaceAll('-', '');
        console.log('toggleRecord phoneNumberText: ', phoneNumberText);

        window.ipcDbChannel.insertMenualQureyToMain(
          formatDate,
          formatTime,
          // inputPhonenumber.current.value,
          phoneNumberText,
          filename,
          // inputMemo.current.value,
          memoText,
          // memoText.replaceAll('<br>', '\r\n'),
          (result: any) => {
            console.log('Menual info insert result:', result);
          }
        );
      } else {
        inputPhonenumber.current.placeholder = ' Please insert phone number';
      }
    }
  };

  const handleChange = (e) => {
    const regex = /^[0-9\b -]{0,14}$/;
    if (regex.test(e.target.value)) {
      setPhoneNumeberInputValue(e.target.value);
    }
  };
  // useEffect(() => {
  //   if (phoneNumeberInputValue.length === 10) {
  //     setPhoneNumeberInputValue(
  //       phoneNumeberInputValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
  //     );
  //   }
  //   if (phoneNumeberInputValue.length === 13) {
  //     setPhoneNumeberInputValue(
  //       phoneNumeberInputValue
  //         .replace(/-/g, '')
  //         .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
  //     );
  //   }
  // }, [phoneNumeberInputValue]);
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
          {/* <PhoneNumberInput ref={inputPhonenumber} /> */}
          <PhoneNumberInput
            type="text"
            ref={inputPhonenumber}
            onChange={handleChange}
            value={phoneNumeberInputValue}
            // toggle={phoneNumeberInputValue === ''}
          />
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
