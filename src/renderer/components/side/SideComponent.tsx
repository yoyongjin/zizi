/* eslint-disable no-console */
import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { connectToggle } from '../../store/connectSlice';
import DisConnectComponent from './DisConnectComponent';
import ConnectComponent from './ConnectComponent';
import RecordButtonComponent from './RecordButtonComponent';

interface SideDivProps {
  connectState: boolean;
}

const SideDiv = styled.div<SideDivProps>`
  width: 228px;
  height: 100%;
  padding: 20px 28px 0 20px;
  background-color: #3a3a40;
  box-sizing: border-box;
  display: block;
  cursor: ${(props) => (props.connectState ? 'pointer' : '')};
  position: relative;
`;

const IpDiv = styled.div`
  /* padding: 0 28px 0 20px; */
  width: 150px;
  justify-content: center;
  align-items: center;
  /* font-size: 14px;
  font-weight: 600; */
  font: normal normal normal 14px/32px Segoe UI;
  letter-spacing: -0.7px;
  color: #d4d6d9;
  display: block;
  position: absolute;
  bottom: 116px;
`;

const PathDiv1 = styled.div`
  /* padding: 0 28px 0 20px; */
  width: 192px;
  justify-content: center;
  align-items: center;
  /* font-size: 14px;
  font-weight: 600; */
  color: #d4d6d9;
  font: normal normal normal 14px/24px Segoe UI;
  display: block;
  position: absolute;
  bottom: 83px;
`;

const PathDiv2 = styled.div`
  /* padding: 0 28px 0 20px; */
  width: 192px;
  justify-content: center;
  align-items: center;
  /* font-size: 14px;
  font-weight: 600; */
  color: #aaaaaa;
  font: normal normal normal 14px/20px Segoe UI;
  display: block;
  position: absolute;
  bottom: 46px;
`;

const SideComponent = (props: any) => {
  const dispatch = useDispatch();
  const [ip, setIp] = useState('');

  const recordState = useSelector((state: any) => {
    return state.recorder.recordState;
  });
  const connectState = useSelector((state: any) => {
    return state.connector.connectState;
  });
  console.log(`####SideComponent Rendering..`);

  useEffect(() => {
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
    <SideDiv connectState={connectState}>
      {connectState ? <ConnectComponent /> : <DisConnectComponent />}
      {connectState ? '' : <RecordButtonComponent />}

      <IpDiv>IP Address : {ip}</IpDiv>
      <PathDiv1>Recording file storage :</PathDiv1>
      <PathDiv2>D:\zibox2-standard-test\zibox2-standard\public</PathDiv2>
    </SideDiv>
  );
};

export default SideComponent;
