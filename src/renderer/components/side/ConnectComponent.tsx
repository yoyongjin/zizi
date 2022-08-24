import styled from 'styled-components';
import phoneOnImg from '../../../../assets/phone_on@3x.png';
import wifiOnImg from '../../../../assets/wifi_on@3x.png';
import gearImg from '../../../../assets/gear@3x.png';

const ConnectDiv = styled.div`
  height: 36px;
  border-radius: 8px;
  border: solid 1px #27daff;
  background-color: #3a3a40;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PhoneImg = styled.img`
  height: 19.7px;
  margin-left: 19px;
  object-fit: contain;
`;

const WifiImg = styled.img`
  height: 18.8px;
  margin-left: 2.2px;
  object-fit: contain;
`;

const ConnectSpan = styled.span`
  margin-left: 8.5px;
  font-size: 14px;
  font-weight: 600;
  color: #27daff;
`;

const GearImg2 = styled.img`
  height: 20px;
  margin-left: 30px;
  margin-right: 13px;
  object-fit: contain;
`;

const AutoRecordingDiv = styled.div`
  margin: 22px 0 0 34px;
`;

const AutoRecordingSpan = styled.span`
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.7px;
  text-align: left;
  color: #27daff;
`;

const LineDiv = styled.div`
  margin: 17px 0 0 0.5px;
  border-top: solid 1px #707070;
`;

const ConnectComponent = () => {
  return (
    <>
      <ConnectDiv>
        <PhoneImg src={phoneOnImg} />
        <WifiImg src={wifiOnImg} />
        <ConnectSpan>Connect</ConnectSpan>
        <GearImg2 src={gearImg} />
      </ConnectDiv>
      <AutoRecordingDiv>
        <AutoRecordingSpan>Auto Recording . . .</AutoRecordingSpan>
      </AutoRecordingDiv>
      <LineDiv />
    </>
  );
};

export default ConnectComponent;
