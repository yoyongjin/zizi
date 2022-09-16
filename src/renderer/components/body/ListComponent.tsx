/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
// import Pagination from 'react-js-pagination';
import PagingBoxComponenet from './PagingBoxComponenet';
import ListTitleComponent from './ListTitleComponent';
// import ListContentComponent from './ListContentComponent';
import playImg from '../../../../assets/play@3x.png';

const ListDiv = styled.div`
  height: 80%;
  margin-top: 23px;
`;

const ContentUl = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 16px;
  font-size: 12px;
  font-weight: normal;
  color: #707070;
  margin: 0;
  margin-bottom: 8px;
  padding: 0;
  padding-bottom: 7px;
  border-bottom: 1px solid #707070;
`;

const PlayeLi = styled.li`
  width: 5.67%;
  min-width: 24px;
  margin-left: 1.71%;
  display: flex;
`;

const PlayImg = styled.img`
  height: 16.5px;
  color: #707070;
  filter: invert(36%) sepia(18%) saturate(0%) hue-rotate(260deg)
    brightness(111%) contrast(77%);
`;

const DateLi = styled.li`
  width: 10.32%;
  min-width: 58px;
`;

const TimeLi = styled.li`
  width: 11.19%;
  min-width: 48px;
`;

const PhoneNumberLi = styled.li`
  width: 17.28%;
  min-width: 82px;
`;

const MemoLi = styled.li`
  width: 51.08%;
  min-width: 550px;
`;

const CheckboxLi = styled.li`
  width: 2.75%;
  display: flex;
`;

const PaginationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #337ab7;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: blue;
  }
`;

const ListComponent = () => {
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]); // 보여줄 data
  const [page, setPage] = useState(1); // 현재 페이지
  const handlePageChange = (page: any) => {
    setPage(page);
  };
  const [dataPerPage] = useState(10); // 페이지당 data 개수
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
    <ListDiv>
      <ListTitleComponent />
      {currentData &&
        currentData.map((d: any) => {
          return (
            <ContentUl key={d.Id}>
              <PlayeLi>
                <PlayImg src={playImg} />
              </PlayeLi>
              <DateLi>{d.Date}</DateLi>
              <TimeLi>{d.Time}</TimeLi>
              <PhoneNumberLi>{d.PhoneNumber}</PhoneNumberLi>
              <MemoLi>{d.Memo}</MemoLi>
              <CheckboxLi>
                <input type="checkbox" />
              </CheckboxLi>
            </ContentUl>
            // <ListContentComponent />
          );
        })}
      <PagingBoxComponenet
        totalCount={data.length}
        dataPerPage={dataPerPage}
        pageRangeDisplayed={5}
        handlePageChange={handlePageChange}
        page={page}
      />
    </ListDiv>
  );
};

export default ListComponent;
