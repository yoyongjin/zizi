import React, { useState, useEffect, createContext } from 'react';
import { ipcRenderer } from 'electron';
import styled from 'styled-components';
import HeaderComponent from './components/header/HeaderComponent';
import SearchComponent from './components/header/SearchComponent';
import SideComponent from './components/side/SideComponent';
import BodyComponent from './components/body/BodyComponent';
// import { ZiBox } from './zibox.ts';
import './App.css';

const AppDiv = styled.div`
  height: 100%;
  background-color: #fff;
`;

const ContentDiv = styled.div`
  display: flex;
  width: 100%;
  height: 92.3%;
`;

function App() {
  // ZiBox.getInstance();
  const [searchState, setSearchState] = useState(false);

  console.log(`App.tsx - Search state: ${searchState}`);

  const changeSearchState = () => {
    setSearchState(!searchState);
    console.log(
      `App.tsx - Change search state(changeSearchState): ${searchState}`
    );
  };
  // console.log("App zibox2Client: " + zibox2Client);

  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   ipcRenderer.send(
  //     // ipcRenderer.send("latest-query", "select * from call");
  //     'latest-query',
  //     'select * from call'
  //   );
  // }, []);

  //@ts-ignore
  // window.standardApi.receive("sql-return-latest", (data) => {
  //     // ipcRenderer.on("sql-return-latest", (event, arg) => {
  //     console.log(`Received data from main process`);
  //     // console.table(data);
  //     setData(data);
  //     // setData(arg);
  //     //@ts-ignore
  //     window.standardApi.removeListeners("sql-return-latest");
  //     // ipcRenderer.removeListeners("sql-return-latest");
  // });

  // ipcRenderer.on("sql-return-latest", (event, arg) => {
  //     setData(arg);
  //     ipcRenderer.removeAllListeners("sql-return-latest");
  // });

  return (
    <AppDiv>
      <HeaderComponent
        changeSearchState={changeSearchState}
        searchState={searchState}
      />
      <ContentDiv>
        {searchState ? <SearchComponent /> : ''}
        <SideComponent />
        <BodyComponent />
      </ContentDiv>
    </AppDiv>
  );
}

export default App;
