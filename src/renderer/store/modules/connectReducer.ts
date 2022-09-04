const CONNECT_Y = 'CONNECT_Y';
const CONNECT_N = 'CONNECT_N';

export const connectY = () => {
  return { type: CONNECT_Y };
};

export const connectN = () => {
  return { type: CONNECT_N };
};

const initialState = {
  connectState: false,
};

export default function connectStateReducer(state = initialState, action: any) {
  switch (action.type) {
    case CONNECT_Y:
      console.log('connectStateReducer - CONNECT_Y');
      return {
        connectState: true,
      };
    case CONNECT_N:
      console.log('connectStateReducer - CONNECT_N');
      return {
        connectState: false,
      };
    default:
      return state;
  }
}
