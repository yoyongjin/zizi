/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
// import Record from 'renderer/utils/Record';
// import recordSingleton from 'renderer/utils/RecordSingleton';
import { connectToggle } from '../../store/connectSlice';
import DisConnectComponent from './DisConnectComponent';
import ConnectComponent from './ConnectComponent';
import RecordButtonComponent from './RecordButtonComponent';
import STTModal from './STTModal';

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
  /* cursor: ${(props) => (props.connectState ? 'pointer' : '')}; */
  position: relative;
`;

const IpDiv = styled.div`
  /* padding: 0 28px 0 20px; */
  /* width: 150px; */
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
  /* background-color: #fff; */
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
  // const init = React.useRef<boolean>(false);
  // // const recorder = React.useRef<any>(new Record());
  // const recorder = recordSingleton.getInstance();
  // const recordState = useSelector((state: any) => {
  //   return state.recorder.recordState;
  // });
  const connectState = useSelector((state: any) => {
    return state.connector.connectState;
  });
  console.log(
    `@@@@@@@@@@@@@@@@@@@@@@@@@@@SideComponent.tsx Rendering.. - Connect state: ${connectState}`
  );
  // console.log(`####SideComponent Rendering..${connectState}`);

  useEffect(() => {
    console.log('!!!!!!!!!!!!!!!!!!! SideComponent useEffect(()');
    window.connectChannel.sendSeverIp('send-serverip', (serverIp: string) => {
      console.log('SideComponent.tsx - Connected server ip:', serverIp);
      setIp(serverIp);
    });

    window.connectChannel.checkConnect((result: boolean) => {
      console.log('SideComponent.tsx - Check connect result:', result);
      if (result) dispatch(connectToggle(true));
      else dispatch(connectToggle(false));
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

  return (
    <SideDiv connectState={connectState}>
      {connectState ? <ConnectComponent /> : <DisConnectComponent />}
      {connectState ? (
        ''
      ) : (
        // <RecordButtonComponent init={init} recorder={recorder} />
        <RecordButtonComponent />
      )}

      {/* <IpDiv>IP Address : {ip}</IpDiv> */}
      <IpDiv>IP アドレス : {ip}</IpDiv>
      {/* <PathDiv1>Recording file storage :</PathDiv1> */}
      <PathDiv1>記録ファイルの保存 :</PathDiv1>
      <PathDiv2>D:\zibox2-standard-test\zibox2-standard\public</PathDiv2>
      <STTModal />
      {/* <STTModal recorder={recorder} /> */}
    </SideDiv>
  );
};

export default SideComponent;
