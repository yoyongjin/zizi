import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import {
  sttModalToggle,
  setSttModalFileName,
} from 'renderer/store/sttModalSlice';
import logoImg from '../../../../assets/zibox2_logo@3x.png';
import hideImg from '../../../../assets/hide@3x.png';
import closeImg from '../../../../assets/close@3x.png';

const HeaderContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 4%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding-right: 25px;
  background-color: #3a3a40;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;
  width: 120px;
  /* background-color: red; */
`;

const LogoImg = styled.img`
  height: 18.4px;
  margin-left: 16.8px;
  object-fit: contain;
`;

const STTspan = styled.span`
  font: 18pt Segoe UI;
  color: #27daff;
  opacity: 1;
  line-height: 1.8rem;
  height: 32px;
  vertical-align: middle;
`;

const WindowBtnContainer = styled.div`
  display: flex;
  align-items: center;
`;
const HideButton = styled.img`
  width: 20px;
  height: 20px;
  margin: 0 10px 1px 44px;
  object-fit: contain;
  cursor: pointer;
`;

const CloseButton = styled.img`
  width: 20px;
  height: 20px;
  margin: 0 0 1px 10px;
  object-fit: contain;
  cursor: pointer;
`;

const STTHeader = () => {
  const dispatch = useDispatch();

  const sttModalHandler = () => {
    console.log(
      '-------------------------------------------window fullscreen off'
    );
    window.windowChannel.windowFullScreenToMain(false);
    dispatch(sttModalToggle(false));
  };

  const windowMinimize = () => {
    // currentWindow.minimize();
    console.log('-------------------------------------------window minimize..');
    window.windowChannel.windowMinimizeToMain();
  };

  return (
    <HeaderContainer>
      <TitleContainer>
        <LogoImg src={logoImg} />
        <STTspan>STT</STTspan>
      </TitleContainer>
      <WindowBtnContainer>
        <HideButton src={hideImg} onClick={windowMinimize} />
        <CloseButton
          src={closeImg}
          onClick={() => {
            sttModalHandler();
          }}
        />
      </WindowBtnContainer>
    </HeaderContainer>
  );
};

export default STTHeader;
