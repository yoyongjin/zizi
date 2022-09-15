/* eslint-disable no-console */
import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
// import {
//   recordingStart,
//   recordingStop,
// } from 'renderer/store/modules/recordReducer';
import Record from 'renderer/utils/Record';
import { recordToggle } from '../../store/recordSlice';
import ZiBox from '../../zibox';

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

const RecordButtonComponent = (props: any) => {
  const { manualRecord, setManualRecord } = props;
  const dispatch = useDispatch();
  const recordState = useSelector(
    // (state: any) => state.recordStateReducer.recordState
    (state: any) => state.recorder.recordState
  );

  console.log(`RecordButtonComponent.tsx - Record state: ${recordState}`);
  console.log(`@@@@Rendering.. ${ZiBox.getInstance().checkRecStatus()}`);

  const init = React.useRef<boolean>(false);
  const recorder = React.useRef<any>(new Record());

  React.useEffect(() => {
    if (init.current) return;
    init.current = true;
    if (!manualRecord) {
      window.recordChannel.startRecord(
        'send-record-start',
        async (userKey: string) => {
          console.log('RecordButtonComponent.tsx - Auto startRecord');
          if (!ZiBox.getInstance().checkRecStatus()) {
            // dispatch(recordingStart());
            dispatch(recordToggle(true));
            await ZiBox.getInstance().recordingStart(`${Date.now()}.wav`);
            console.log(
              `RecordButtonComponent.tsx - Auto Record start: ${recordState}`
            );
          }
        }
      );

      window.recordChannel.stopRecord(
        'send-record-stop',
        async (userKey: string) => {
          console.log('RecordButtonComponent.tsx - Auto stopRecord');
          if (ZiBox.getInstance().checkRecStatus()) {
            // dispatch(recordingStop());
            dispatch(recordToggle(false));
            console.log('Stop!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            const result = await ZiBox.getInstance().recordingStop();
            if (result) {
              console.log('Recording Stop & Save..');
              await ZiBox.getInstance().recSave();
            }
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
      await recorder.current.start();
      setManualRecord(true);
      dispatch(recordToggle(true));
    } else {
      recorder.current.stop(`${Date.now()}`);
      setManualRecord(false);
      dispatch(recordToggle(false));
    }

    // console.log(`1RecStatus: ${ZiBox.getInstance().checkRecStatus()}`);
    // // 지박스 연결 시
    // if (manualRecord && ZiBox.getInstance().checkRecStatus()) {
    //   // if (recordState) {
    //   // 녹취 중 O
    //   // await ZiBox.getInstance().recordingStop();
    //   setManualRecord(false);
    //   dispatch(recordToggle(false));
    //   const result = await ZiBox.getInstance().recordingStop();
    //   if (result) {
    //     console.log('Recording Stop & Save..');
    //     ZiBox.getInstance().recSave();
    //   }
    //   console.log(`RecordButtonComponent.tsx - Record stop: ${recordState}`);
    // } else {
    //   // 녹취 중 X
    //   setManualRecord(true);
    //   dispatch(recordToggle(true));
    //   await ZiBox.getInstance().recordingStart(`${Date.now()}.wav`);
    //   console.log(`RecordButtonComponent.tsx - Record start: ${recordState}`);
    // }
    // console.log(`2RecStatus: ${ZiBox.getInstance().checkRecStatus()}`);
  };

  return (
    <RecordButtonDiv onClick={toggleRecord}>
      {manualRecord ? (
        <EndRecordButtonSpan>Save & End Call Recording</EndRecordButtonSpan>
      ) : (
        <StartRecordButtonSpan>Call Recording</StartRecordButtonSpan>
      )}
    </RecordButtonDiv>
  );
};

export default RecordButtonComponent;
