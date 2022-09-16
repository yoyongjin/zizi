/* eslint-disable no-console */
import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { IpcRendererEvent } from 'electron';
// import { connectY, connectN } from 'renderer/store/modules/connectReducer';
import { connectToggle, init } from '../../store/connectSlice';
import DisConnectComponent from './DisConnectComponent';
import ConnectComponent from './ConnectComponent';
import PhoneSettingModal from './PhoneSettingModal';
import RecordButtonComponent from './RecordButtonComponent';
import SaveCallRecordingComponent from './SaveCallRecordingComponent';

interface SideDivProps {
  connectState: boolean;
}

const SideDiv = styled.div<SideDivProps>`
  width: 228px;
  padding: 20px 28px 0 20px;
  background-color: #3a3a40;
  box-sizing: border-box;
  display: block;
  cursor: ${(props) => (props.connectState ? 'pointer' : '')};
  position: relative;
`;

const IpDiv = styled.div`
  /* padding: 0 28px 0 20px; */
  width: 180px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  display: block;
  position: absolute;
  bottom: 20px;
`;

const SideComponent = (props: any) => {
  const dispatch = useDispatch();
  const [ip, setIp] = useState('');
  const [manualRecord, setManualRecord] = useState(false);

  const recordState = useSelector(
    // (state: any) => state.recordStateReducer.recordState
    (state: any) => state.recorder.recordState
  );
  const connectState = useSelector(
    // (state: any) => state.connectStateReducer.connectState
    (state: any) => state.connector.connectState
  );
  console.log(`####SideComponent Rendering..`);

  useEffect(() => {
    // console.log('side..');
    // dispatch(init);
    window.connectChannel.sendSeverIp('send-serverip', (serverIp: string) => {
      console.log('SideComponent.tsx - Connected server ip:', serverIp);
      setIp(serverIp);
    });
  }, []);

  window.connectChannel.sendConnectY('send-connect-y', (socketId: string) => {
    console.log('SideComponent.tsx - Connected socket id:', socketId);
    dispatch(connectToggle(true));
  });

  window.connectChannel.sendConnectN('send-connect-n', (socketId: string) => {
    console.log('SideComponent.tsx - Disconnected socket id:', socketId);
    dispatch(connectToggle(false));
  });

  console.log(`SideComponent.tsx - Record state: ${recordState}`);
  console.log(`SideComponent.tsx - Connect state: ${connectState}`);

  return (
    <SideDiv
      connectState={connectState}
      // onClick={() => (connectState ? dispatch(connectN()) : '')}
    >
      {connectState ? <ConnectComponent /> : <DisConnectComponent />}

      <PhoneSettingModal />

      {manualRecord ? <SaveCallRecordingComponent /> : ''}

      {connectState ? (
        ''
      ) : (
        <RecordButtonComponent
          manualRecord={manualRecord}
          setManualRecord={setManualRecord}
        />
      )}
      <IpDiv>IP Address : {ip}</IpDiv>
    </SideDiv>
  );
};

export default SideComponent;
