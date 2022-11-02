/* eslint-disable no-console */
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import ReactAudioPlayer from 'react-audio-player';
import { callPlayerToggle } from '../../store/callPlayerSlice';
import closeImg from '../../../../assets/close@3x.png';

const ModalHeaderContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0;
  /* background-color: purple; */
  height: 30px;
`;
const ModalContentContainer = styled.div`
  display: flex;
  margin-top: 15px;
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
const QRImage = styled.div`
  width: 71px;
  height: 71px;
  background-color: #fff;
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
const PlayerContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  background-color: lightblue;
  width: auto;
  min-width: 450px;
  max-width: 500px;
`;

ReactModal.setAppElement('#root');

const CallPlayerModal = () => {
  const dispatch = useDispatch();
  const callPlayerState = useSelector((state: any) => {
    return state.callPlayer.callPlayerState;
  });
  const callPlayerFileName = useSelector((state: any) => {
    return state.callPlayer.callPlayerFileName;
  });
  const closeHandler = () => {
    dispatch(callPlayerToggle(false));
  };
  const filePath = `C:/ZiPhone/call/${callPlayerFileName}`;
  console.log('Modal callPlayerFileName:', callPlayerFileName);
  // console.log('Modal filePath:', filePath);
  return (
    <ReactModal
      isOpen={callPlayerState}
      onRequestClose={() => dispatch(callPlayerToggle(false))}
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
          height: '150px',
          margin: '148px 0 0 333px ',
          padding: '0 1rem 0 1rem',
          inset: '0',
          border: '0',
          borderRadius: '0',
          background: '#707070',
          boxSizing: 'border-box',
        },
      }}
    >
      {/* <ModalHeaderContainer>
        <ModalHeaderText>{callPlayerFileName}</ModalHeaderText>
        <CloseButton src={closeImg} onClick={closeHandler} />
      </ModalHeaderContainer>
      <ModalContentContainer>
    </ModalContentContainer> */}
      {/* /public/record/2022/09/28 */}
      <ModalHeaderContainer>
        <ModalHeaderText>{callPlayerFileName}</ModalHeaderText>
        <CloseButton src={closeImg} onClick={closeHandler} />
      </ModalHeaderContainer>
      <ModalContentContainer>
        <AudioPlayer
          src={filePath}
          // src={callPlayerFileName}
          autoPlay
          onPlay={console.log('onplay')}
          progressJumpSteps
        />
        {/* <ReactAudioPlayer src={callPlayerFileName} autoPlay controls /> */}
      </ModalContentContainer>
    </ReactModal>
  );
};

export default CallPlayerModal;
