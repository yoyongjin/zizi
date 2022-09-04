const MODAL_OPEN = 'MODAL_OPEN';
const MODAL_CLOSE = 'MODAL_CLOSE';

export const modalOpen = () => {
  return { type: MODAL_OPEN };
};

export const modalClose = () => {
  return { type: MODAL_CLOSE };
};

const initialState = {
  modalState: false,
};

export default function modalStateReducer(state = initialState, action: any) {
  switch (action.type) {
    case MODAL_OPEN:
      return {
        modalState: true,
      };
    case MODAL_CLOSE:
      return {
        modalState: false,
      };
    default:
      return state;
  }
}
