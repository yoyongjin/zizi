import React from 'react';
import styled from 'styled-components';
import StopWatch from './StopWatch';
import recordImg from '../../../../assets/rec_sta@2x.png';

const SaveCallRecordingDiv = styled.div`
  margin-top: 24px;
`;

const TimeDiv = styled.div`
  font-size: 14px;
  font-weight: 600;
  letter-spacing: normal;
  color: #fff;
  height: fit-content;
  width: fit-content;
`;

const PhoneNumberDiv = styled.div`
  margin: 15px 0 8px 9px;
`;

const PhoneNumberSpan = styled.span`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: normal;
  text-align: left;
  color: #d4d6d9;
`;

const PhoneNumberInputDiv = styled.div`
  height: 36px;
  border-radius: 8px;
  border: solid 1px #707070;
`;

const MemoDiv = styled.div`
  margin: 15px 0 8px 9px;
`;

const MemoSpan = styled.div`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: normal;
  text-align: left;
  color: #d4d6d9;
`;

const MemoInputDiv = styled.div`
  height: 108px;
  border-radius: 8px;
  border: solid 1px #707070;
`;
const RecordingTimeContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 4px;
  align-items: center;
  gap: 18px;
`;
const RecordImg = styled.img`
  width: 15px;
  height: 15px;
  margin-top: 2px;
`;

const SaveCallRecordingComponent = () => {
  return (
    <SaveCallRecordingDiv>
      <RecordingTimeContainer>
        <RecordImg src={recordImg} />
        {/* <TimeDiv>03:24</TimeDiv> */}
        <StopWatch />
      </RecordingTimeContainer>
      <PhoneNumberDiv>
        <PhoneNumberSpan>Phone number</PhoneNumberSpan>
      </PhoneNumberDiv>
      <PhoneNumberInputDiv />
      <MemoDiv>
        <MemoSpan>Memo</MemoSpan>
      </MemoDiv>
      <MemoInputDiv />
    </SaveCallRecordingDiv>
  );
};

export default SaveCallRecordingComponent;
