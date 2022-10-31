/* eslint-disable no-console */
import React, { useState, useEffect, Fragment } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
// import { modalOpen, modalClose } from 'renderer/store/modules/modalReducer';
// import { connectY, connectN } from 'renderer/store/modules/connectReducer';
import { connectToggle } from '../../store/connectSlice';
import { modalToggle } from '../../store/modalSlice';
import closeImg from '../../../../assets/close@3x.png';
import qrCode from '../../../../assets/qr_code.png';

const ModalHeaderContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 15px;
  /* background-color: purple; */
  height: 35px;
`;
const ModalContentContainer = styled.div`
  display: flex;
  margin-top: 29px;
  /* background-color: lightcoral; */
  padding-right: 7 0px;
`;

const ModalQRContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: yellow; */
  padding: 0 50px;
`;
const QRImage = styled.img`
  width: 71px;
  height: 71px;
  /* background-color: #fff; */
`;

const ConnectInfoContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* background-color: #ccc; */
  height: 106px;
`;

const ModalHeaderText = styled.p`
  margin: 0;
  font: normal normal 600 16px/20px Segoe UI;
  color: #fff;
  margin-left: 2px;
  /* background-color: #ccc;  */
`;

const ConnectInfoText = styled.p`
  font: normal normal normal 12px/1rem Segoe UI;
  padding: 0;
  margin: 0;

  color: #fff;
  /* background-color: red; */
`;

const DownloadText = styled.p`
  font: normal normal normal 12px/1rem Segoe UI;
  color: #fff;
`;

const CloseButton = styled.img`
  width: 20px;
  height: 20px;
  margin: 0 0 1px 10px;
  object-fit: contain;
  cursor: pointer;
`;
ReactModal.setAppElement('#root');

const PhoneSettingModal = () => {
  // const [ip, setIp] = useState('');
  const dispatch = useDispatch();
  const modalState = useSelector((state: any) => {
    return state.modaler.modalState;
  });
  const closeHandler = () => {
    dispatch(modalToggle(false));
  };
  // useEffect(() => {
  //   window.connectChannel.sendSeverIp('send-serverip', (serverIp: string) => {
  //     console.log('PhoneSettingModal.tsx - Connected server ip:', serverIp);
  //     setIp(serverIp);
  //   });
  // }, []);
  return (
    <ReactModal
      isOpen={modalState}
      onRequestClose={() => dispatch(modalToggle(false))}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '',
        },
        content: {
          width: '600px',
          height: '207px',
          margin: '148px 0 0 333px ',
          padding: '0',
          inset: '0',
          border: '0',
          borderRadius: '0',
          background: '#707070',
          boxSizing: 'border-box',
        },
      }}
      // style={{
      //   overlay: {
      //     position: 'fixed',
      //     top: 0,
      //     left: 0,
      //     right: 0,
      //     bottom: 0,
      //     backgroundColor: '',
      //   },
      //   content: {
      //     top: 0,
      //     left: 0,
      //     right: 0,
      //     bottom: 0,
      //   },
      // }}
    >
      <ModalHeaderContainer>
        <ModalHeaderText>휴대전화 연결하기</ModalHeaderText>
        <CloseButton src={closeImg} onClick={closeHandler} />
      </ModalHeaderContainer>
      <ModalContentContainer>
        <ModalQRContainer>
          <QRImage src={qrCode} />
          <DownloadText>APP Download</DownloadText>
        </ModalQRContainer>
        <ConnectInfoContainer>
          <ConnectInfoText>Step1. 휴대전화 앱을 설치하세요.</ConnectInfoText>
          <ConnectInfoText>
            Step2. 앱을 실행한 후 연결할 PC의 IP주소를 입력하세요.
          </ConnectInfoText>
          {/* <ConnectInfoText>현재 PC의 IP주소: {ip}</ConnectInfoText> */}
          <ConnectInfoText>현재 PC의 IP주소: </ConnectInfoText>
          <ConnectInfoText>
            연결이 완료되면 자동으로 통화 녹음이 실행됩니다.
          </ConnectInfoText>
        </ConnectInfoContainer>
      </ModalContentContainer>
    </ReactModal>
  );
};

export default PhoneSettingModal;
