const RECORDINGSTART = 'RECORDINGSTART';
const RECORDINGSTOP = 'RECORDINGSTOP';

export const recordingStart = () => {
  return { type: RECORDINGSTART };
};

export const recordingStop = () => {
  return { type: RECORDINGSTOP };
};

const initialState = {
  recordState: false,
};

export default function recordStateReducer(state = initialState, action: any) {
  switch (action.type) {
    case RECORDINGSTART:
      return {
        recordState: true,
      };
    case RECORDINGSTOP:
      return {
        recordState: false,
      };
    default:
      return state;
  }
}
