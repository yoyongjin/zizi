import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { sttModalToggle } from 'renderer/store/sttModalSlice';
import FullSTTPage from './FullSTTPage';
import closeImg from '../../../../assets/close@3x.png';

const CloseButton = styled.button`
  width: 20px;
  height: 20px;
  margin: 0 0 1px 10px;
  object-fit: contain;
  cursor: pointer;
`;

const TestDiv = styled.div`
  background-color: red;
`;

const STTModal = () => {
  const dispatch = useDispatch();
  const sttModalState = useSelector((state: any) => {
    return state.sttModaler.sttModalState;
  });
  const sttModalFileName = useSelector((state: any) => {
    return state.sttModaler.sttModalFileName;
  });
  const closeHandler = () => {
    console.log('closeHandler..');
    dispatch(sttModalToggle(false));
    window.windowChannel.windowFullScreenToMain(false);
  };
  console.log('Modal sttModalFileName:', sttModalFileName);
  return (
    <ReactModal
      isOpen={sttModalState}
      onRequestClose={() => dispatch(sttModalToggle(false))}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '',
        },
        // content: {
        //   width: '600px',
        //   height: '150px',
        //   margin: '148px 0 0 333px ',
        //   padding: '0 1rem 0 1rem',
        //   inset: '0',
        //   border: '0',
        //   borderRadius: '0',
        //   background: '#707070',
        //   boxSizing: 'border-box',
        // },
        content: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
      }}
    >
      <FullSTTPage />
    </ReactModal>
  );
};

export default STTModal;
