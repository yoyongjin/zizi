import React, { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';
// import UserImg from '../../../../assets/user.png';
import UserImg1 from '../../../../assets/user1.png';
import UserImg2 from '../../../../assets/user2.png';
import STTHeader from './STTHeader';

const FullContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const STTContainer = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
  background-color: #d4d6d9;
  padding-bottom: 50px;
`;

const STTContentContainer = styled.div`
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  box-sizing: border-box;
  margin: 24px 25px;
  padding: 30px 30px;
  background-color: #fff;
  border: 1px solid #707070;
  border-radius: 10px;
  opacity: 1;
`;

const HeaderContainer = styled.div`
  display: flex;
  padding-bottom: 1.5rem;
`;
const CallerHeaderContainer = styled.div`
  display: flex;
  /* background-color: #fdfd; */
  width: 50%;
`;
const ReceiverHeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 50%;
  height: 118px;
  /* background-color: #fdf; */
`;
const ProfileImg = styled.img`
  width: 118px;
  height: 118px;
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
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 0px;
  flex: 1;
  &::-webkit-scrollbar {
    border: 1px solid #ccc;
    border-radius: 2px;
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #2f4f4f;
  }
  /* background-color: lightblue; */
`;

const STTContent = styled.p`
  font: normal normal normal 30px/34px Segoe UI;
  color: #707070;
  margin: 0px;
  margin-top: 10px;
  padding-top: 0px;
  max-width: 50%;

  align-self: ${(props: any) => (props.isLeft ? 'flex-start' : 'flex-end')};
`;
const STTBalloonTip = styled.div`
  width: 0px;
  height: 0px;
  margin-top: 10px;
  border-top: 5px solid transparent;
  border-right: 15px solid #f2f2f2;
  border-bottom: 10px solid transparent;
  transform: ${(props: any) => (props.isLeftTip ? '' : 'rotate(180deg)')};
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
    props.isLeftShadow ? ' 5px 5px 6px #b2b2b2' : ' -5px 5px 6px #b2b2b2'};
  height: auto;
  /* width: 425px; */
  padding: 3px 15px 7px 15px;
  word-break: break-all;
  white-space: normal;
`;

type STTData = {
  script?: string;
  ts: number;
  channel?: 'left' | 'right';
  // script?: string;
  // endTimes: number;
  // channel?: 'left' | 'right';
};

interface IFullSTTPage {
  filteredData: Array<STTData>;
}

const FullSTTFilePage = (props) => {
  const { sttModalFileName } = props;
  const [sttFileContent, setSttFileContent] = useState([]);

  useEffect(() => {
    window.sttChannel.getSttData(sttModalFileName, (datas: any) => {
      console.log('FullSTTFilePage.tsx - ', datas);
      setSttFileContent(datas);
    });
  }, []);

  return (
    <FullContainer>
      <STTHeader />
      <STTContainer>
        <STTContentContainer>
          <HeaderContainer>
            <CallerHeaderContainer>
              <ProfileImg src={UserImg2} />
              <SpeakerSpan>Speaker 1</SpeakerSpan>
            </CallerHeaderContainer>
            <ReceiverHeaderContainer>
              <SpeakerSpan>Speaker 2</SpeakerSpan>
              <ProfileImg src={UserImg1} />
            </ReceiverHeaderContainer>
          </HeaderContainer>

          <ScrollDiv>
            {sttFileContent &&
              sttFileContent.map((data: any) => {
                console.log(data);

                return (
                  <STTContent
                    key={`${data.channel}_${data.ts}`}
                    isLeft={data.channel === 'speaker1'}
                  >
                    {data.channel === 'speaker1' ? (
                      <BalloonContainer>
                        <STTBalloonTip isLeftTip />
                        <STTBalloon isLeftShadow>{data.script}</STTBalloon>
                      </BalloonContainer>
                    ) : (
                      <BalloonContainer>
                        <STTBalloon>{data.script}</STTBalloon>
                        <STTBalloonTip />
                      </BalloonContainer>
                    )}
                  </STTContent>
                );
              })}
          </ScrollDiv>
          {/* <ScrollDiv /> */}
        </STTContentContainer>
      </STTContainer>
    </FullContainer>
  );
};

export default FullSTTFilePage;
