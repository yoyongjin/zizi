import React from 'react';
import styled from 'styled-components';

const SaveCallRecordingDiv = styled.div`
  margin-top: 24px;
`;

const TimeDiv = styled.div`
  font-size: 14px;
  font-weight: 600;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
  height: fit-content;
  width: fit-content;
  margin-left: 73px;
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

const SaveCallRecordingComponent = () => {
  return (
    <SaveCallRecordingDiv>
      <TimeDiv>03:24</TimeDiv>
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
