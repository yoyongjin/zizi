import { render } from '@testing-library/react';
import React, { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';
import UserImg1 from '../../../../assets/user1.png';
import UserImg2 from '../../../../assets/user2.png';
import STTHeader from './STTHeader';

const FullContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const STTContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
  height: 100%;
  /* overflow: hidden; */
  background-color: #d4d6d9;
  /* padding-bottom: 50px; */
`;

const STTContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 97%;
  height: 75%;
  /* justify-content: space-between; */
  box-sizing: border-box;
  margin: 24px 25px;
  padding: 20px 20px;
  background-color: #fff;
  border: 1px none #707070;
  border-radius: 10px;
`;

const STTHeaderContainer = styled.div`
  display: flex;
`;
const CallerHeaderContainer = styled.div`
  display: flex;
  /* background-color: #fdfd00; */
  width: 50%;
  justify-content: flex-end;
`;
const ReceiverHeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 50%;
  /* height: 100px; */
  /* background-color: #fdf; */
`;
const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  /* margin: 0 24px; */
`;
const SpeakerSpan = styled.span`
  font: normal normal bold 42px/34px Segoe UI;
  letter-spacing: 0px;
  color: #707070;
  opacity: 1;
  margin: auto 24px;
`;

const ScrollDiv = styled.div`
  max-height: 92%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 3px 1rem;
  margin-top: 20px;
  flex: 1;
  /* background-color: #bebe; */
  &::-webkit-scrollbar {
    border: 1px solid #ccc;
    border-radius: 2px;
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #2f4f4f;
  }
`;

const STTContent = styled.p`
  font: normal normal normal 30px/34px Segoe UI;
  color: #707070;
  margin: 0px;
  margin-top: 10px;
  padding-top: 0px;
  max-width: 48%;
  align-self: ${(props: any) => (props.isRight ? 'flex-start' : 'flex-end')};
  /* z-index: 99999; */
  /* background-color: black; */
`;
const STTBalloonTip = styled.div`
  width: 0px;
  height: 0px;
  margin-top: 10px;
  border-top: 5px solid transparent;
  border-right: 15px solid #f2f2f2;
  border-bottom: 10px solid transparent;
  transform: ${(props: any) => (props.isRightTip ? '' : 'rotate(180deg)')};
`;

const BalloonContainer = styled.div`
  display: flex;

  /* background-color: #ccc; */
`;

const STTBalloon = styled.div`
  background-color: #f2f2f2;
  border-radius: 5px;
  /* box-shadow: 5px 5px 6px #b2b2b2; */
  box-shadow: ${(props: any) =>
    props.isisRightShadow ? ' 2px 2px 3px #b2b2b2' : ' -2px 2px 3px #b2b2b2'};
  height: auto;
  /* width: 425px; */
  padding: 3px 15px 7px 15px;
  word-break: break-all;
  white-space: normal;
`;

const STTProcessContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2.5%;
  box-sizing: border-box;
  width: 97%;
  height: 18%;
  margin-bottom: 20px;
  /* max-height: 18%; */
  /* background-color: #e3e; */
`;

const STTProcess = styled.div`
  display: flex;
  flex-direction: column;
  /* overflow-y: scroll; */
  overflow-y: auto;
  width: 97%;
  max-height: 100%;
  /* height: 75%; */
  /* justify-content: space-between; */
  box-sizing: border-box;
  padding: 10px 20px;
  background-color: #fff;
  border: 1px none #707070;
  border-radius: 10px;
  opacity: 1;
  &::-webkit-scrollbar {
    border: 1px solid #ccc;
    border-radius: 2px;
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #2f4f4f;
  }
`;

type STTData = {
  script?: string;
  ts: number;
  channel?: 'left' | 'right';
  isFinal: boolean;
  // endTimes: number;
};

interface IFullSTTPage {
  filteredData: Array<STTData>;
}

// const FullSTTPage = () => {
const FullSTTPage = ({ filteredData }: IFullSTTPage) => {
  const renderScripts = React.useMemo(() => {
    console.log('^^^^^^^^^^^^^^^^^^^^^^renderScripts');
    return filteredData.map((d) => {
      console.log(`############## ${d.channel} ${d.script}`);
      return (
        <STTContent
          key={`${d.channel}_${d.ts}`}
          isRight={d.channel === 'right'}
        >
          {d.channel === 'right' ? (
            <BalloonContainer>
              <STTBalloonTip isRightTip />
              <STTBalloon isRightShadow>{d.script}</STTBalloon>
            </BalloonContainer>
          ) : (
            <BalloonContainer>
              <STTBalloon>{d.script}</STTBalloon>
              <STTBalloonTip />
            </BalloonContainer>
          )}
        </STTContent>
      );
    });
  }, [filteredData]);

  // const rightScriptProcess = React.useMemo(() => {
  //   return filteredData.map((d) => {
  //     return <p key={`${d.channel} ${d.script}`}>asdf</p>;
  //   });
  // }, [filteredData]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollTo(0, messagesEndRef.current?.scrollHeight);
  };

  const lastDataIsFinal = React.useMemo(() => {
    if (filteredData.length > 0) {
      return filteredData[filteredData.length - 1].isFinal;
    }
    return false;
  }, [filteredData]);

  useEffect(() => {
    scrollToBottom();
    // const currentSTTDataIsFinal = filteredData[filteredData.length - 1].isFinal;
    console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
  }, [lastDataIsFinal]);

  return (
    <FullContainer>
      <STTHeader />
      <STTContainer>
        <STTContentContainer>
          <STTHeaderContainer>
            <ReceiverHeaderContainer>
              <ProfileImg src={UserImg1} />
              <SpeakerSpan>Speaker 1</SpeakerSpan>
            </ReceiverHeaderContainer>
            <CallerHeaderContainer>
              <SpeakerSpan>Speaker 2</SpeakerSpan>
              <ProfileImg src={UserImg2} />
            </CallerHeaderContainer>
          </STTHeaderContainer>
          <ScrollDiv ref={messagesEndRef}>{renderScripts}</ScrollDiv>
        </STTContentContainer>
        <STTProcessContainer>
          <STTProcess>left</STTProcess>
          <STTProcess>right</STTProcess>
        </STTProcessContainer>
      </STTContainer>
    </FullContainer>
  );
};

export default FullSTTPage;
