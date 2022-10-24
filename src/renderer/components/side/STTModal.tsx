import React, { useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { sttModalToggle } from 'renderer/store/sttModalSlice';
import FullSTTPage from './FullSTTPage';
import closeImg from '../../../../assets/close@3x.png';

const CloseButton = styled.button`
  width: 20px;
  height: 20px;
  margin: 0 0 1px 10px;
  object-fit: contain;
  cursor: pointer;
`;

const TestDiv = styled.div`
  background-color: red;
`;

type STTData = {
  script?: string;
  ts: number;
  channel?: 'left' | 'right';
};

const STTModal = () => {
  const dispatch = useDispatch();
  const sttModalState = useSelector((state: any) => {
    return state.sttModaler.sttModalState;
  });
  const sttModalFileName = useSelector((state: any) => {
    return state.sttModaler.sttModalFileName;
  });
  const closeHandler = () => {
    console.log('closeHandler..');
    dispatch(sttModalToggle(false));
    window.windowChannel.windowFullScreenToMain(false);
  };
  console.log('Modal sttModalFileName:', sttModalFileName);

  const [sttLeftData, setSttLeftData] = useState<STTData[]>([]);
  const [sttRightData, setSttRightData] = useState<STTData[]>([]);

  // window.sttChannel.sendSttFull('send-stt-full', (datas: any) => {
  //   console.log('FullSTTPage.tsx - ', datas);
  //   // dispatch(connectToggle(true));
  // });

  useEffect(() => {
    const onSttRealTimeEvent = (e: any) => {
      // console.dir(`***********STTEvent1`);
      // console.dir(e);
      // console.log(e);
      console.log(`***********sttRealTimeEvent***********`);

      const { channel, endTime, script, isFinal } = e.detail;

      let setStateFn;
      if (channel === 'left') {
        setStateFn = setSttLeftData;
      } else {
        setStateFn = setSttRightData;
      }

      setStateFn((prev) => {
        if (prev.length === 0) {
          prev.push({
            script,
            ts: Date.now(),
            channel,
          });
        } else {
          prev[prev.length - 1].script = script;
          prev[prev.length - 1].channel = channel;
          if (prev[prev.length - 1].ts === -1) {
            prev[prev.length - 1].ts = Date.now();
          }
        }

        if (isFinal) {
          prev.push({
            ts: -1,
          });
          // console.log(prev);
        }

        return [...prev];
      });
      // console.dir(`***********STTEvent1: ${e}`);
      // console.dir(`***********STTEvent2: ${e.detail}`);
      // console.dir(`***********STTEvent3: ${e.datas}`);
      // console.log(`${channel}, ${endTime}, ${script}`);
      // console.log(`***********sttRealTimeEvent***********`);
    };

    window.addEventListener('sttRealTimeEvent', onSttRealTimeEvent);

    return () => {
      window.removeEventListener('sttRealTimeEvent', onSttRealTimeEvent);
    };
  }, []);

  const dataToPrint = React.useMemo(() => {
    const data = [...sttLeftData, ...sttRightData];

    const filtered = data.filter((d) => d.ts > -1 && d.script);
    filtered.sort((d1, d2) => {
      return d1.ts - d2.ts;
    });

    return filtered;
  }, [sttLeftData, sttRightData]);

  return (
    <ReactModal
      isOpen={sttModalState}
      onRequestClose={() => dispatch(sttModalToggle(false))}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '',
        },
        // content: {
        //   width: '600px',
        //   height: '150px',
        //   margin: '148px 0 0 333px ',
        //   padding: '0 1rem 0 1rem',
        //   inset: '0',
        //   border: '0',
        //   borderRadius: '0',
        //   background: '#707070',
        //   boxSizing: 'border-box',
        // },
        content: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          padding: 0,
          height: '100%',
        },
      }}
    >
      <FullSTTPage filteredData={dataToPrint} />
    </ReactModal>
  );
};

export default STTModal;
