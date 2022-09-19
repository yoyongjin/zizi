/* eslint-disable no-console */
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import TitleComponent from './TitleComponent';
import ListComponent from './ListComponent';
// import PagingComponent from './PagingComponent';
import PagingBoxComponenet from './PagingBoxComponenet';

const BodyDiv = styled.div`
  box-sizing: border-box;
  height: 550px;
  width: 972px;
  background: white;
  flex-grow: 1;
  padding: 10px 15px 26px 37px;
  /* background-color: #aaa; */
`;

const BodyComponent = () => {
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]); // 보여줄 data
  const [page, setPage] = useState(1); // 현재 페이지
  const handlePageChange = (page: any) => {
    setPage(page);
  };
  const [dataPerPage] = useState(12); // 페이지당 data 개수
  const indexOfLastData = page * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;

  const recordState = useSelector(
    // (state: any) => state.recordStateReducer.recordState
    (state: any) => state.recorder.recordState
  );
  console.log(`####ListComponent Rendering..${recordState}`);

  useEffect(() => {
    console.log('Renderling ListComponent.tsx - ipcRenderer.sendQureyToMain');
    window.ipcDbChannel.sendQureyToMain('select * from call', (list: any) => {
      list.sort((item1: any, item2: any) => item2.Id - item1.Id);
      // console.log(`list: ${list}`);
      setData(list);
      // console.log(`data: ${data}`);
      // console.log(`indexOfFirstData: ${indexOfFirstData}`);
      // console.log(`indexOfLastData: ${indexOfLastData}`);
      setCurrentData(list.slice(indexOfFirstData, indexOfLastData));
      // console.log(`currentData: ${currentData}`);
    });
  }, [recordState, indexOfFirstData, indexOfLastData, page]);

  return (
    <BodyDiv>
      <TitleComponent />
      <ListComponent currentData={currentData} />
      <PagingBoxComponenet
        totalCount={data.length}
        dataPerPage={dataPerPage}
        pageRangeDisplayed={5}
        handlePageChange={handlePageChange}
        page={page}
      />
    </BodyDiv>
  );
};

export default BodyComponent;
