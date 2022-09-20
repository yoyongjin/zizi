import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ListTitleComponent from './ListTitleComponent';
import ListContentComponent from './ListContentComponent';
import PagingBoxComponenet from './PagingBoxComponenet';

const ListDiv = styled.div`
  height: 420px;
  margin-top: 0;
  /* background-color: #ccc; */
`;

const ListComponent = () => {
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]); // 보여줄 data
  const [page, setPage] = useState(1); // 현재 페이지
  const [dataPerPage] = useState(12); // 페이지당 data 개수
  const indexOfLastData = page * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [isAllChecked, setIsAllChecked] = useState(false);
  const recordState = useSelector((state: any) => {
    return state.recorder.recordState;
  });

  const handlePageChange = (page: any) => {
    setPage(page);
  };
  const checkedItemHandler = (id, isChecked) => {
    if (isChecked) {
      setCheckedItems(checkedItems.add(id));
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
    }

    // const arr = [...checkedItems];
    // arr.map((c, index) => console.log(`${index}@@@@checkedItem:${c}`));
  };

  const allCheckedHandler = (isChecked: any) => {
    if (isChecked) {
      setCheckedItems(new Set(currentData.map((data) => data.id)));
      setIsAllChecked(true);
    } else {
      checkedItems.clear();
      setIsAllChecked(false);
    }

    // const arr = [...checkedItems];
    // arr.map((c, index) => console.log(`${index}@@@@allcheckedItem:${c}`));
  };

  console.log(`@@@@Rendering ListComponent..${recordState}`);
  console.log('****checkedItems', checkedItems);

  useEffect(() => {
    console.log('Renderling ListComponent.tsx - ipcRenderer.sendQureyToMain');
    window.ipcDbChannel.sendQureyToMain(
      'select * from tb_call',
      (list: any) => {
        list.sort((item1: any, item2: any) => item2.id - item1.id);
        setData(list);
        setCurrentData(list.slice(indexOfFirstData, indexOfLastData));
      }
    );
  }, [recordState, indexOfFirstData, indexOfLastData, page]);

  return (
    <>
      <ListDiv>
        <ListTitleComponent allCheckedHandler={allCheckedHandler} />
        {currentData &&
          currentData.map((data: any) => {
            return (
              <ListContentComponent
                key={data.id}
                data={data}
                checkedItemHandler={checkedItemHandler}
                isAllChecked={isAllChecked}
              />
            );
          })}
      </ListDiv>
      <PagingBoxComponenet
        totalCount={data.length}
        dataPerPage={dataPerPage}
        pageRangeDisplayed={5}
        handlePageChange={handlePageChange}
        page={page}
      />
    </>
  );
};

export default ListComponent;
