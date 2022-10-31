import React, { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';
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

// const CallerSection = styled.section`
//   display: flex;
//   flex-direction: column;
//   /* background-color: #dda; */
//   width: 50%;
//   padding: 24px 30px 0 0;
//   /* border-right: 1px dashed #707070; */
// `;
// const ReceiverSection = styled.section`
//   display: flex;
//   flex-direction: column;
//   /* background-color: #dda; */
//   width: 50%;
//   padding-left: 30px;
//   padding-top: 24px;
// `;
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
  max-height: 92%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
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
    props.isLeftShadow ? ' 2px 2px 3px #b2b2b2' : ' -2px 2px 3px #b2b2b2'};
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

// const FullSTTPage = () => {
const FullSTTPage = ({ filteredData }: IFullSTTPage) => {
  // 1. 전체화면STT 눌렀을때 쌓인 stt 불러오게 useEffect[]로 하고
  // 2. 실시간은 내용 컴포넌트 렌더링
  // 3. 파일 경로랑 FullSTT 이어주기

  // const [sttLeftData, setSttLeftData] = useState<STTData[]>([]);
  // const [sttRightData, setSttRightData] = useState<STTData[]>([]);
  // // const [sttData, setSttData] = useState<STTData[]>([]);

  // // window.sttChannel.sendSttFull('send-stt-full', (datas: any) => {
  // //   console.log('FullSTTPage.tsx - ', datas);
  // //   // dispatch(connectToggle(true));
  // // });

  // useEffect(() => {
  //   const onSttRealTimeEvent = (e: any) => {
  //     console.log(`***********sttRealTimeEvent***********`);
  //     // console.log(e.detail);
  //     // console.log(e.detail.sttBuffer);
  //     // console.log(typeof e.detail.sttBuffer);
  //     const { channel, endTime, script, isFinal } = e.detail;
  //     // // setSttData.push(e.detail.sttBuffer);
  //     // setSttData(e.detail.sttBuffer);
  //     // // setSttData(e.detail.sttBuffer);
  //     // console.log(sttData);

  //     let setStateFn;
  //     if (channel === 'left') {
  //       setStateFn = setSttLeftData;
  //     } else {
  //       setStateFn = setSttRightData;
  //     }

  //     setStateFn((prev) => {
  //       if (prev.length === 0) {
  //         prev.push({
  //           script,
  //           ts: Date.now(),
  //           channel,
  //         });
  //       } else {
  //         prev[prev.length - 1].script = script;
  //         prev[prev.length - 1].channel = channel;
  //         if (prev[prev.length - 1].ts === -1) {
  //           prev[prev.length - 1].ts = Date.now();
  //         }
  //       }

  //       if (isFinal) {
  //         prev.push({
  //           ts: -1,
  //         });
  //         // console.log(prev);
  //       }

  //       return [...prev];
  //     });

  //     console.dir(`***********STTEvent1: ${e}`);
  //     console.dir(`***********STTEvent2: ${e.detail}`);
  //     console.dir(`***********STTEvent3: ${e.datas}`);
  //     console.log(`${channel}, ${endTime}, ${script}`);
  //     console.log(`***********sttRealTimeEvent***********`);
  //   };

  //   window.addEventListener('sttRealTimeEvent', onSttRealTimeEvent);

  //   return () => {
  //     window.removeEventListener('sttRealTimeEvent', onSttRealTimeEvent);
  //   };
  // }, []);

  // const dataToPrint = React.useMemo(() => {
  //   const data = [...sttLeftData, ...sttRightData];
  //   // const data = [...sttData];
  //   console.log('&&&&&&&&&&&&&&&&dataToPrint');
  //   console.log(data);

  //   data.map((d) => {
  //     return console.log(`%%%%%%%%%%% ${d.channel} ${d.script}`);
  //   });
  //   const filtered = data.filter((d) => d.ts > -1 && d.script);
  //   filtered.sort((d1, d2) => {
  //     return d1.ts - d2.ts;
  //   });

  //   return filtered;
  // }, [sttLeftData, sttRightData]);
  // }, [sttData]);

  // console.log(dataToPrint);
  const renderScripts = React.useMemo(() => {
    console.log('^^^^^^^^^^^^^^^^^^^^^^renderScripts');
    // return dataToPrint.map((d) => {
    return filteredData.map((d) => {
      console.log(`############## ${d.channel} ${d.script}`);
      return (
        <STTContent key={`${d.channel}_${d.ts}`} isLeft={d.channel === 'left'}>
          {d.channel === 'left' ? (
            <BalloonContainer>
              <STTBalloonTip isLeftTip />
              <STTBalloon isLeftShadow>{d.script}</STTBalloon>
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
    // }, [dataToPrint]);
  }, [filteredData]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollTo(0, messagesEndRef.current?.scrollHeight);
  };
  useEffect(() => {
    scrollToBottom();
    // }, [dataToPrint]);
  }, [filteredData]);

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

          <ScrollDiv ref={messagesEndRef}>{renderScripts}</ScrollDiv>
        </STTContentContainer>
      </STTContainer>
    </FullContainer>
  );
};

export default FullSTTPage;
