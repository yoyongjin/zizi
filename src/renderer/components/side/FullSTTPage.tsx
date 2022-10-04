import React from 'react';

import styled from 'styled-components';
import UserImg from '../../../../assets/user.png';
import STTHeader from './STTHeader';

const FullContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  background-color: #d4d6d9;
  min-width: 1000px;
`;
const ConversationContainer = styled.div`
  overflow-y: hidden;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  height: 100%;
  margin: 24px 25px;
  padding: 0 30px;
  background-color: #fff;
  border: 1px solid #707070;
  border-radius: 10px;
  opacity: 1;
`;

const CallerSection = styled.section`
  display: flex;
  flex-direction: column;
  /* background-color: #dda; */
  width: 50%;
  padding: 24px 30px 0 0;
  border-right: 1px dashed #707070;
`;
const ReceiverSection = styled.section`
  display: flex;
  flex-direction: column;
  /* background-color: #dda; */
  width: 50%;
  padding-left: 30px;
  padding-top: 24px;
`;
const CallerTitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 118px;
`;
const ReceiverTitleContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 118px;
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
  margin: 0 24px;
`;
const ScrollDiv = styled.div`
  overflow-y: auto;
  padding-right: 1rem;
  margin: 24px 0;
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
  padding-top: 20px;
`;

const FullSTTPage = () => {
  return (
    <FullContainer>
      <STTHeader />
      <ConversationContainer>
        <CallerSection>
          <CallerTitleContainer>
            <ProfileImg src={UserImg} />
            <SpeakerSpan>Speaker 1</SpeakerSpan>
          </CallerTitleContainer>
          <ScrollDiv>
            <STTContent>
              Mauris neque nisi, faucibus non elementum in, convallis et eros.
              Sed pretium sem libero, vel pellentesque purus ultrices ut. In
              quis leo id massa pulvinar euismod cursus non justo. Sed sagittis
              et urna non efficitur. Nulla nec lacus tincidunt, rutrum arcu in,
              euismod diam. Donec neque tellus, congue sed velit sed,
              scelerisque scelerisque urna. Praesent mi sem, tincidunt eget
              facilisis in, pharetra et sapien. Proin sagittis erat magna,Mauris
              neque nisi, faucibus non elementum in, convallis et eros. Sed
              pretium sem libero, vel pellentesque purus ultrices ut. In quis
              leo id massa pulvinar euismod cursus non justo. Sed sagittis et
              urna non efficitur. Nulla nec lacus tincidunt, rutrum arcu in,
              euismod diam. Donec neque tellus, congue sed velit sed,
              scelerisque scelerisque urna. Praesent mi sem, tincidunt eget
              facilisis in, pharetra et sapien. Proin sagon efficitur. Nulla nec
              lacus tincidunt, rutrum arcu in, euismod diam. Donec neque tellus,
              congue sed velit sed, scelerisque scelerisque urna. Praesent mi
              sem, tincidunt eget facilisis in, pharetra et sapien. Proin
              sagittis erat magna,Mauris neque nisi, faucibus non elementum in,
              convallis et eros. Sed pretium sem libero, vel pellentesque purus
              ultrices ut. In quis leo id massa pulvinar euismod cursus non
              justo. Sed sagittis et urna non efficitur. Nulla nec lacus
              tincidunt, rutrum arcu in, euismod diam. Donec neque tellus,
              congue sed velit sed, scelerisque scelerisque urna. Praesent mi
              sem, tincidunt eget facilisis in, pharetra et sapien. Proin
              sagittis erat magna,Mauris neque nisi, faucibus non elementum in,
              convallis et eros. Sed pretium sem libero, vel pellentesque purus
              ultricsent mi sem, tincidunt eget facilisis in, pharetra et
              sapien. Proin sagittis erat magna,
            </STTContent>
          </ScrollDiv>
        </CallerSection>
        <ReceiverSection>
          <ReceiverTitleContainer>
            <SpeakerSpan>Speaker 2</SpeakerSpan>
            <ProfileImg src={UserImg} />
          </ReceiverTitleContainer>
          <ScrollDiv>
            <STTContent>
              Mauris neque nisi, faucibus non elementum in, convallis et eros.
              Sed pretium sem libero, vel pellentesque purus ultrices ut. In
              quis leo id massa pulvinar euismod cursus non justo. Sed sagittis
              et urna non efficitur. Nulla nec lacus tincidunt, rutrum arcu in,
              euismod diam. Donec neque tellus, congue sed velit sed,
              scelerisque scelerisque urna. Praesent mi ses et urna non
              efficitur. Nulla nec lacus tincidunt, rutrum arcu in, euismod
              diam. Donec neque tellus, conaesent mi sem, tincidunt eget
              facilisis in, pharetra et sapien. Proin sagittis erat magna,Mauris
              neque nisi, faucibus non elementum in, convallis et eros. Sed
              pretium sem libero, vel pellentesque purus ultrices ut. In quis
              leo id massa pulvinar euismod cursunt, rutrum arcu in, euismod
              diam. Donec neque tellus, conaesent mi sem, tincidunt eget
              facilisis in, pharetra et sapien. Proin sagittis erat magna,Mauris
              neque nisi, faucibus non elementum in, convallis et eros. Sed
              pretium sem libero, vel pellentesque purus ultrices ut. In quis
              leo id massa pulvinar euismod cursus nnon efficitur. Nulla nec
              lacus tincidunt, rutrum arcu in, euismod diam. Donec neque tellus,
              congue sed velit sed, scelerisque scelerisque urna. Praesent mi
              ses et urna non efficitur. Nulla nec lacus tincidunt, rutrum arcu
              in, euismod diam. Donec neque tellus, conaesent mi sem, tincidunt
              eget facilisis in, pharetra et sapien. Proin sagittis erat
              magna,Mauris neque nisi, faucibus non elementum in, convallis et
              eros. Sed pretium sem libero, vel pellentesque purus ultrices ut.
              In quis leo id massa pulvinar euismod cursunt, rutrum arcu in,
              euismod diam. Donec neque tellus, conaesent mi sem, tincidunt eget
              facilisis in, pharetra et sapien. Proin sagittis erat magna,Mauris
              neque nisi, faucibus non elementum in, convallis et eros. Sed
              pretium sem libero, vel pellentesque purus ultrices ut. In quis
              leo id massa pulvinar euismod cursus non justo. Sed sagittis et
              urna non efficitur. Nulla nec lacus tincidunt, rutrum arcu in,
              euismod diam. Donec neque tellus, congue sed velit sed,
              scelerisque scelerisque urna. Praesent mi sem, tincidunt eget
              facilisis in, pharetra et sapien. Proin sagittis erat magna,
            </STTContent>
          </ScrollDiv>
        </ReceiverSection>
      </ConversationContainer>
    </FullContainer>
  );
};

export default FullSTTPage;
