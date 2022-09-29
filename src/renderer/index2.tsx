import { createRoot } from 'react-dom/client';
import { legacy_createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
// import rootReducer from './store/modules';
import PhoneSettingModal from './components/side/PhoneSettingModal';
import store from './store';
import CallPlayerModal from './components/side/CallPlayerModal';

// const store = legacy_createStore(rootReducer);
const container = document.getElementById('root2')!;
const root2 = createRoot(container);
root2.render(<>hello</>);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
