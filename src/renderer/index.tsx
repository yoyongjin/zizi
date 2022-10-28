import { createRoot } from 'react-dom/client';
import { legacy_createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
// import rootReducer from './store/modules';
import store from './store';
import PhoneSettingModal from './components/side/PhoneSettingModal';
import CallPlayerModal from './components/side/CallPlayerModal';
import STTModal from './components/side/STTModal';

// const store = legacy_createStore(rootReducer);
const container = document.getElementById('root')!;
const root = createRoot(container);
console.log('index.tsx');
root.render(
  <Provider store={store}>
    <App />
    <PhoneSettingModal />
    <CallPlayerModal />
    <STTModal />
  </Provider>
);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
