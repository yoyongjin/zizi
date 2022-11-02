import React, { useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { sttModalToggle } from 'renderer/store/sttModalSlice';
import FullSTTPage from './FullSTTPage';
import FUllSTTFilePage from './FullSTTFilePage';
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
  isFinal: boolean;
};

const STTModal = () => {
  const dispatch = useDispatch();
  const sttModalState = useSelector((state: any) => {
    return state.sttModaler.sttModalState;
  });
  const sttModalFileName = useSelector((state: any) => {
    return state.sttModaler.sttModalFileName;
  });
  const sttModalMode = useSelector((state: any) => {
    return state.sttModaler.sttModalMode;
  });

  console.log('Rendering STTModal.tsx sttModalFileName:', sttModalFileName);

  const [sttLeftData, setSttLeftData] = useState<STTData[]>([]);
  const [sttRightData, setSttRightData] = useState<STTData[]>([]);
  const recordState = useSelector((state: any) => {
    return state.recorder.recordState;
  });

  useEffect(() => {
    const onSttRealTimeEvent = (e: any) => {
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
            isFinal,
          });
        } else {
          prev[prev.length - 1].script = script;
          prev[prev.length - 1].channel = channel;
          prev[prev.length - 1].isFinal = isFinal;
          if (prev[prev.length - 1].ts === -1) {
            prev[prev.length - 1].ts = Date.now();
          }
        }

        if (isFinal) {
          prev.push({
            ts: -1,
          });
        }

        return [...prev];
      });
    };
    console.log('useEffect[] STTModal.tsx');

    window.addEventListener('sttRealTimeEvent', onSttRealTimeEvent);

    return () => {
      window.removeEventListener('sttRealTimeEvent', onSttRealTimeEvent);
    };
  }, []);

  useEffect(() => {
    if (recordState) {
      console.log('useEffect[recordState] STTModal.tsx');
      setSttLeftData([]);
      setSttRightData([]);
    }
  }, [recordState]);

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
      {/* <FullSTTPage recorder={recorder} /> */}
      {sttModalMode === 'REALTIME' ? (
        <FullSTTPage filteredData={dataToPrint} />
      ) : (
        <FUllSTTFilePage sttModalFileName={sttModalFileName} />
      )}
    </ReactModal>
  );
};

export default STTModal;
