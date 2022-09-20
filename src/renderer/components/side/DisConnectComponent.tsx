import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
// import { modalOpen, modalClose } from 'renderer/store/modules/modalReducer';
import { modalToggle } from '../../store/modalSlice';
import phoneOffImg from '../../../../assets/phone_off@3x.png';
import wifiOffImg from '../../../../assets/wifi_off@3x.png';
import infoImg from '../../../../assets/info_icon@2x.png';
import gearImg from '../../../../assets/gear@3x.png';

interface DisConnectDivProps {
  recordState: boolean;
}

// const DisConnectDiv = styled.div<DisConnectDivProps>`
//   display: flex;
//   box-sizing: border-box;
//   height: 36px;
//   min-width: 148px;
//   padding-left: 15px;
//   border-radius: 8px;
//   border: solid 1px #efa0a0;
//   background: #3a3a40 url({gearImg}) right 10px center;
//   background-repeat: no-repeat;
//   background-size: 20px;
//   align-items: center;
//   cursor: ${(props) => (props.recordState ? 'default' : 'pointer')};
// `;

const DisConnectDiv = styled.div<DisConnectDivProps>`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 36px;
  min-width: 148px;
  padding: 10px 7px;
  border-radius: 8px;
  border: solid 1px #efa0a0;
  cursor: ${(props) => (props.recordState ? 'default' : 'pointer')};
`;

const PhoneImg = styled.img`
  /* height: 19.7px; */
  /* object-fit: contain; */
  width: 22px;
  height: auto;
  margin-left: 2px;
`;

const WifiOffImg = styled.img`
  height: 18.8px;
  margin-left: 2.2px;
  object-fit: contain;
`;

const ConnectSpan = styled.span`
  margin-left: 8.5px;
  font-size: 14px;
  font-weight: 600;
  color: #efa0a0;
`;

const GearImg = styled.img`
  height: 20px;
  margin-left: 25px;
  margin-right: 13px;
  object-fit: contain;
`;

const InfoImg = styled.img`
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  margin-left: 18px;
  margin-right: 10px;
`;

const DisConnectComponent = () => {
  const dispatch = useDispatch();
  const recordState = useSelector(
    // (state: any) => state.recordStateReducer.recordState
    (state: any) => {
      return state.recorder.recordState;
    }
  );

  return (
    <DisConnectDiv recordState={recordState}>
      <PhoneImg src={phoneOffImg} />
      <WifiOffImg src={wifiOffImg} />
      <ConnectSpan>Disconnect</ConnectSpan>
      {/* <GearImg src={gearImg} /> */}
      <InfoImg
        src={infoImg}
        onClick={() => (recordState ? '' : dispatch(modalToggle(true)))}
      />
    </DisConnectDiv>
  );
};

export default DisConnectComponent;
