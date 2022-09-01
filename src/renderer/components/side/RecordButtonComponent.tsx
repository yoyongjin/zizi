import React from 'react';
import styled from 'styled-components';
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
  const { recordState, changeRecordState } = props;
  // console.log("RecordButtonComponent zibox2Client: " + props.zibox2Client);
  console.log(`RecordButtonComponent.tsx - Record state: ${recordState}`);
  console.log(`asdf:${ZiBox.getInstance().checkRecStatus()}`);

  const recordingStart = () => {
    console.log(`RecordButtonComponent.tsx - Recording start(recordingStart)`);

    // const deviceInfos = props.zibox2Client.getDevices();
    // console.log("micDevices: " + deviceInfos.micDevices);
    // console.log("speakerDevices: " + deviceInfos.speakerDevices);

    // props.zibox2Client.recordingStart();
    // ZiBox.getInstance().recordingStart();
    changeRecordState();
  };

  const recordingStop = () => {
    console.log('Recording stop');
    // props.zibox2Client.recordingStop();
    // ZiBox.getInstance().recordingStop();
    changeRecordState();
  };

  const recording = async () => {
    console.log('Recording function');
    window.recordChannel.send('send-recordStart', true);
    console.log(`1RecStatus: ${ZiBox.getInstance().checkRecStatus()}`);
    let result;
    if (ZiBox.getInstance().checkRecStatus()) {
      // 녹취 중 O
      // result = ZiBox.getInstance().recordingStop();
      // if (result) {
      //   console.log('Recording Stop & Save..');
      //   ZiBox.getInstance().recSave();
      // }
    } else {
      // 녹취 중 X
      // result = await ZiBox.getInstance().recordingStart();
      window.recordChannel.send('send-recordStart', true);
    }
    // console.log(`2RecStatus: ${ZiBox.getInstance().checkRecStatus()}`);
    // if (result) {
    //   console.log('Recording State Change..');
    //   props.setRecordState(ZiBox.getInstance().checkRecStatus());
    // }
  };

  return (
    <RecordButtonDiv onClick={recording}>
      {recordState ? (
        <EndRecordButtonSpan>Save & End Call Recording</EndRecordButtonSpan>
      ) : (
        <StartRecordButtonSpan>Call Recording</StartRecordButtonSpan>
      )}
    </RecordButtonDiv>
  );
};

export default RecordButtonComponent;
