/* eslint-disable no-console */
import React, { useEffect } from 'react';
import styled from 'styled-components';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import ReactAudioPlayer from 'react-audio-player';

// import record from "https://hanzluo.s3-us-west-1.amazonaws.com/music/wuyuwuqing.mp3";

const EmptyBox = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0;
  margin: 0;
  padding-left: 1px;
  width: 20px;
  height: 50px;
`;
const FileName = styled.p`
  width: 125px;
  position: absolute;
  left: 530px;
  top: 468px;
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PlayerContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  background-color: lightblue;
  width: auto;
  min-width: 450px;
  max-width: 500px;
`;

const RecordPlayer = (props) => {
  // const recordSrc =
  //   'https://hanzluo.s3-us-west-1.amazonaws.com/music/wuyuwuqing.mp3';
  // const recordSrc = 'http://localhost:1212/20220927195514.wav';
  const recordSrc = props.fileName;
  const fileName = <EmptyBox />;
  // console.log('recordSrc: ', recordSrc);

  return (
    <PlayerContainer>
      {/* <AudioPlayer
        src={recordSrc}
        autoPlay
        onPlay={console.log('onplay')}
        progressJumpSteps
        customAdditionalControls={[fileName]}
        // other props here
      />
      <FileName>20220926120920.wav</FileName> */}
      {/* <FileNameContainer>`${recordSrc}`</FileNameContainer> */}
      <ReactAudioPlayer src={recordSrc} autoPlay controls />
    </PlayerContainer>
  );
};

export default RecordPlayer;
