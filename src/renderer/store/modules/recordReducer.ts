const RECORDING_START = 'RECORDING_START';
const RECORDING_STOP = 'RECORDING_STOP';

export const recordingStart = () => {
  return { type: RECORDING_START };
};

export const recordingStop = () => {
  return { type: RECORDING_STOP };
};

const initialState = {
  recordState: false,
};

export default function recordStateReducer(state = initialState, action: any) {
  switch (action.type) {
    case RECORDING_START:
      console.log('recordStateReducer - RECORDING_START');
      return {
        recordState: true,
      };
    case RECORDING_STOP:
      console.log('recordStateReducer - RECORDING_STOP');
      return {
        recordState: false,
      };
    default:
      return state;
  }
}
