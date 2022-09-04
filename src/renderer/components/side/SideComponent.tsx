/* eslint-disable no-console */
import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { connectY, connectN } from 'renderer/store/modules/connectReducer';
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
`;

const SideComponent = (props: any) => {
  const dispatch = useDispatch();
  const recordState = useSelector(
    (state: any) => state.recordStateReducer.recordState
  );
  const connectState = useSelector(
    (state: any) => state.connectStateReducer.connectState
  );

  console.log(`SideComponent.tsx - Record state: ${recordState}`);
  console.log(`SideComponent.tsx - Connect state: ${connectState}`);

  useEffect(() => {
    console.log(
      `SideComponent.tsx - Change Record state(useEffect): ${recordState}`
    );
  }, [recordState]);

  return (
    <SideDiv
      connectState={connectState}
      onClick={() => (connectState ? dispatch(connectN()) : '')}
    >
      {connectState ? <ConnectComponent /> : <DisConnectComponent />}

      <PhoneSettingModal />

      {recordState ? <SaveCallRecordingComponent /> : ''}

      {connectState ? '' : <RecordButtonComponent />}
    </SideDiv>
  );
};

export default SideComponent;
