/* eslint-disable no-console */
import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  recordingStart,
  recordingStop,
  getRecordState,
} from 'renderer/store/modules/recordReducer';
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

const RecordButtonComponent = () => {
  const dispatch = useDispatch();
  const recordState = useSelector(
    (state) => state.recordStateReducer.recordState
  );

  console.log(`RecordButtonComponent.tsx - Record state: ${recordState}`);
  // console.log(`Rendering.. :${ZiBox.getInstance().checkRecStatus()}`);

  const toggleRecord = async () => {
    // console.log(`1RecStatus: ${ZiBox.getInstance().checkRecStatus()}`);
    // if (ZiBox.getInstance().checkRecStatus()) {
    if (recordState) {
      // 녹취 중 O
      dispatch(recordingStop());
      console.log(`RecordButtonComponent.tsx - Record stop: ${recordState}`);
      // await ZiBox.getInstance().recordingStop();
    } else {
      // 녹취 중 X
      dispatch(recordingStart());
      console.log(`RecordButtonComponent.tsx - Record start: ${recordState}`);
      // await ZiBox.getInstance().recordingStart(`${Date.now()}.wav`);
    }

    // console.log(`2RecStatus: ${ZiBox.getInstance().checkRecStatus()}`);
  };

  return (
    <RecordButtonDiv onClick={toggleRecord}>
      {/* <RecordButtonDiv onClick={() => dispatch(recordingStart())}> */}
      {recordState ? (
        <EndRecordButtonSpan>Save & End Call Recording</EndRecordButtonSpan>
      ) : (
        <StartRecordButtonSpan>Call Recording</StartRecordButtonSpan>
      )}
    </RecordButtonDiv>
  );
};

export default RecordButtonComponent;
