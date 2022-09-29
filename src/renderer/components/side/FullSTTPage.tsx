import React from 'react';

import styled from 'styled-components';

import { FullScreen, useFullScreenHandle } from 'react-full-screen';

const FullScreenContainer = styled.div`
  display: flex;

  width: 100%;

  height: 100%;

  background-color: #fff;
`;

const FullSTTPage = () => {
  const handle = useFullScreenHandle();

  return (
    <div>
      <button onClick={handle.enter}>STT</button>

      <FullScreen handle={handle}>
        <FullScreenContainer></FullScreenContainer>
      </FullScreen>
    </div>
  );
};

export default FullSTTPage;
