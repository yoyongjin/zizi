/* eslint-disable no-console */
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { confirm } from 'react-confirm-box';
import DateStartToEnd from './DateStartToEnd';
import ListTitleComponent from './ListTitleComponent';
import ListContentComponent from './ListContentComponent';
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

const TitleDiv = styled.div`
  margin-bottom: 10px;
  justify-content: space-between;
  display: flex;
  align-items: flex-end;
  /* background-color: #bbb; */
`;

const TitleSpanContainer = styled.div`
  width: 119px;
  height: 21px;
`;

const TitleSpan = styled.span`
  width: 119px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.8px;
  /* text-align: left; */
  color: #3a3a40;
`;

const SearchForm = styled.form`
  display: flex;
  box-sizing: border-box;
  width: 771px;
  height: 34px;
  padding: 5px 15px;
  align-items: center;
  justify-content: space-evenly;
  gap: 15px;
  background-color: #d4d6d9;
  border-radius: 8px;
  opacity: 1;
`;
const SearchDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 230px;
`;
const SearchSpan = styled.span`
  font: normal normal 600 13px/20px Segoe UI;
  color: #707070;
  white-space: nowrap;
  opacity: 1;
`;
const SearchPhoneNum = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 7px;
  width: 191px;
`;
const SearchPhoneNumInput = styled.input`
  margin-left: 7px;
  box-sizing: border-box;
  width: 122px;
  height: 24px;
  border: 1px solid #707070;
  border-radius: 6px;
`;
const SearchMemo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 7px;
  width: 203px;
`;
const SearchMemoInput = styled.input`
  margin-left: 7px;
  box-sizing: border-box;
  width: 188px;
  height: 24px;
  border: 1px solid #707070;
  border-radius: 6px;
`;
const SearchBtn = styled.button`
  /* margin-left: 15px; */
  padding: 0;
  background: #707070;
  border: none;
  border-radius: 6px;
  opacity: 1;
  width: 74px;
  height: 24px;
  font: normal normal 600 14px Segoe UI;
  color: #fff;

  &:hover {
    cursor: pointer;
  }
`;
const ListDiv = styled.div`
  height: 420px;
  margin-top: 0;
  /* background-color: #ccc; */
`;

const BodyComponent = () => {
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]); // 보여줄 data
  const [page, setPage] = useState(1); // 현재 페이지
  const [dataPerPage] = useState(12); // 페이지당 data 개수
  const indexOfLastData = page * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
  const recordState = useSelector((state: any) => {
    return state.recorder.recordState;
  });

  const handlePageChange = (propPage: any) => {
    setPage(propPage);
  };
  const checkedItemHandler = (id: any, isChecked: any) => {
    if (isChecked) {
      // setCheckedItems(checkedItems.add(id));
      checkedItems.add(id);
      setCheckedItems(new Set(checkedItems));
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setCheckedItems(new Set(checkedItems));
    }

    // const arr = [...checkedItems];
    // arr.map((c, index) => console.log(`${index}@@@@checkedItem:${c}`));
  };

  const allCheckedHandler = (isChecked: any) => {
    if (isChecked) {
      setCheckedItems(new Set(currentData.map((mapData) => mapData.id)));
      setIsAllChecked(true);
    } else {
      console.log('allCheckedHandler', isChecked);
      checkedItems.clear();
      setIsAllChecked(false);
    }

    // const arr = [...checkedItems];
    // arr.map((c, index) => console.log(`${index}@@@@allcheckedItem:${c}`));
  };

  const onDeleteHandler = async () => {
    // if (window.confirm('Are you sure you want to delete?')) {
    if (await confirm('Are you sure you want to delete?')) {
      console.log('checkedItems', checkedItems);
      const ids = [...checkedItems];
      // 여기 DB 삭제
      window.ipcDbChannel.deleteCallQureyToMain(ids, (result: any) => {
        console.log('Call delete result:', result);
        checkedItems.clear();
        setCheckedItems(new Set());
        setDeleteState(!deleteState);
      });
    }
  };

  console.log(`^^^^Rendering BodyComponent..${recordState}`);
  // console.log('****checkedItems', checkedItems);
  console.log(
    `#$@%@#$%@#$%@#$date : ${new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).getDate()}`
  );

  const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  const lastDay = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  );
  console.log('date: ', firstDay.getDate(), lastDay.getDate());
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
  }, [recordState, indexOfFirstData, indexOfLastData, page, deleteState]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const startDate = formData.get('startDate');
    const endDate = formData.get('endDate');
    const phoneNumber = formData.get('phoneNum');
    const memo = formData.get('memo');
    console.log('&&&&&submit');
    // if (!startDate) console.log('startDate is null');
    console.log('startDate', startDate, typeof startDate);
    console.log('endDate', endDate, typeof endDate);
    console.log('phoneNum', phoneNumber, typeof phoneNumber);
    console.log('memo', memo, typeof memo);

    // 여기 DB 조회
    window.ipcDbChannel.searchQureyToMain(
      startDate,
      endDate,
      phoneNumber,
      memo,
      (list: any) => {
        console.log(
          'Renderling ListComponent.tsx - ipcRenderer.sendQureyToMain'
        );
        list.sort((item1: any, item2: any) => item2.id - item1.id);
        setData(list);
        console.log('data: ', data);
        setPage(1);
        setCurrentData(list.slice(indexOfFirstData, indexOfLastData));
        console.log('currentData: ', currentData);
      }
    );
  };

  return (
    <BodyDiv>
      <TitleDiv>
        <TitleSpanContainer>
          <TitleSpan>Call Recording List</TitleSpan>
        </TitleSpanContainer>
        <SearchForm onSubmit={onSubmitHandler}>
          {/* Date input */}
          <SearchDate>
            <SearchSpan>Date</SearchSpan>
            <DateStartToEnd />
          </SearchDate>
          <SearchPhoneNum>
            {/* PhoneNum input */}
            <SearchSpan>Phone No.</SearchSpan>
            <SearchPhoneNumInput name="phoneNum" />
          </SearchPhoneNum>

          {/* Memo input */}
          <SearchMemo>
            <SearchSpan>
              #<SearchMemoInput name="memo" />
            </SearchSpan>
          </SearchMemo>

          {/* Search button */}
          <SearchBtn>Search</SearchBtn>
        </SearchForm>
      </TitleDiv>
      <ListDiv>
        <ListTitleComponent allCheckedHandler={allCheckedHandler} />
        {currentData &&
          currentData.map((currentOneData: any) => {
            return (
              <ListContentComponent
                key={currentOneData.id}
                data={currentOneData}
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
        checkedItems={checkedItems}
        onDeleteHandler={onDeleteHandler}
      />
    </BodyDiv>
  );
};

export default BodyComponent;
