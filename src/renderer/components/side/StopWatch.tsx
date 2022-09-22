/* eslint-disable react/button-has-type */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StopWatchContainer = styled.div`
  color: #fff;
`;

const StopWatch = () => {
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);

  const [secIsSingle, setSecIsSingle] = useState(true);
  const [minIsSingle, setMinIsSingle] = useState(true);

  const recordState = useSelector((state: any) => {
    return state.recorder.recordState;
  });

  console.log('^^^^^^^^^^^^Rendering stopwatch.. recordState:', recordState);

  useEffect(() => {
    if (recordState) {
      setSecond(0);
      setMinute(0);
      setSecIsSingle(true);
      setMinIsSingle(true);
    }
  }, [recordState]);

  useEffect(() => {
    let timePass: any;
    if (recordState) {
      timePass = setInterval(() => {
        setSecond((sec) => sec + 1);

        if (second / 9 === 1 && second % 9 === 0) {
          setSecIsSingle((prevState) => !prevState);
        }
        if (minute === 9 && second === 59) {
          setMinIsSingle((prevState) => !prevState);
        }
        if ((second + 1) % 60 === 0) {
          setMinute((min) => min + 1);
          setSecond(0);
          setSecIsSingle((prevState) => !prevState);
        }
      }, 1000);
    }
    return () => clearInterval(timePass);
  }, [second, minute, recordState]);

  return (
    <div>
      <StopWatchContainer>
        {minIsSingle ? `0${minute}` : minute}:
        {secIsSingle ? `0${second}` : second}
      </StopWatchContainer>
    </div>
  );
};

export default StopWatch;
