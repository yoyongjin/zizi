import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { modalOpen, modalClose } from 'renderer/store/modules/modalReducer';
import phoneOffImg from '../../../../assets/phone_off@3x.png';
import wifiOffImg from '../../../../assets/wifi_off@3x.png';
import gearImg from '../../../../assets/gear@3x.png';

interface DisConnectDivProps {
  recordState: boolean;
}

const DisConnectDiv = styled.div<DisConnectDivProps>`
  height: 36px;
  min-width: 148px;
  padding-left: 15px;
  border-radius: 8px;
  border: solid 1px #efa0a0;
  background: #3a3a40 url({gearImg}) right 10px center;
  background-repeat: no-repeat;
  background-size: 20px;
  display: flex;
  align-items: center;
  cursor: ${(props) => (props.recordState ? 'default' : 'pointer')};
`;

const PhoneImg = styled.img`
  height: 19.7px;
  object-fit: contain;
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

const DisConnectComponent = () => {
  const dispatch = useDispatch();
  const recordState = useSelector(
    (state: any) => state.recordStateReducer.recordState
  );

  return (
    <DisConnectDiv
      recordState={recordState}
      onClick={() => (recordState ? '' : dispatch(modalOpen()))}
    >
      <PhoneImg src={phoneOffImg} />
      <WifiOffImg src={wifiOffImg} />
      <ConnectSpan>Disconnect</ConnectSpan>
      {/* <GearImg src={gearImg} /> */}
    </DisConnectDiv>
  );
};

export default DisConnectComponent;
