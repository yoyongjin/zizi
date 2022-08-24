import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
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
  //height: 550px;
  padding: 20px 28px 0 20px;
  background-color: #3a3a40;
  box-sizing: border-box;
  display: block;
  cursor: ${(props) => (props.connectState ? 'pointer' : '')};
`;

const SideComponent = (props: any) => {
  // const { zibox2Client } = props;
  // console.log("SideComponent zibox2Client: " + zibox2Client);
  const [connectState, setConnectState] = useState(false);
  const [recordState, setRecordState] = useState(false);
  const [modalState, setModalState] = useState(false);

  console.log(`SideComponent.tsx - Connect state: ${connectState}`);
  console.log(`SideComponent.tsx - Record state: ${recordState}`);
  console.log(`SideComponent.tsx - Modal state: ${modalState}`);

  useEffect(() => {
    console.log(
      `SideComponent.tsx - Change Record state(useEffect): ${recordState}`
    );
  }, [recordState]);

  const changeRecordState = () => {
    setRecordState(!recordState);
    console.log(
      `SideComponent.tsx - Change Record state(changeRecordState): ${recordState}`
    );
  };

  const changeModalState = () => {
    setModalState(!modalState);
    console.log(
      `SideComponent.tsx - Change Modal state(changeModalState): ${modalState}`
    );
  };

  const changeConnectState = () => {
    setConnectState(!connectState);
    console.log(
      `SideComponent.tsx - Change Connect state(changeConnectState): ${connectState}`
    );
  };

  const phoneSet = () => {
    setModalState(!modalState);
    setConnectState(true);
    console.log(
      `SideComponent.tsx - Set Modal, Connect state(phoneSet): ${modalState}, ${connectState}`
    );
  };

  return (
    <SideDiv
      connectState={connectState}
      onClick={() => (connectState ? setConnectState(false) : '')}
    >
      {connectState ? (
        <ConnectComponent />
      ) : (
        <DisConnectComponent
          recordState={recordState}
          setModalState={setModalState}
        />
      )}

      <PhoneSettingModal
        modalState={modalState}
        setModalState={setModalState}
        phoneSet={phoneSet}
      />

      {recordState ? <SaveCallRecordingComponent /> : ''}

      {connectState ? (
        ''
      ) : (
        <RecordButtonComponent
          recordState={recordState}
          setRecordState={setRecordState}
        />
      )}
    </SideDiv>
  );
};

export default SideComponent;
