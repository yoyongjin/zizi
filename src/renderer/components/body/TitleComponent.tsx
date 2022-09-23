import React, { useState } from 'react';
import styled from 'styled-components';
// import SearchStartDate from './SearchStartDate';
// import SearchEndDate from './SearchEndDate';
import DateStartToEnd from './DateStartToEnd';

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

const TitleComponent = () => {
  console.log('***** TitleComponent rendering...');

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    console.log('&&&&&submit');
    console.log('startDate', data.get('startDate'));
    console.log('endDate', data.get('endDate'));
    console.log('phoneNum', data.get('phoneNum'));
    console.log('memo', data.get('memo'));

    // 여기 DB 조회
    // window.ipcDbChannel.sendQureyToMain(
    //   'select * from tb_call',
    //   (list: any) => {
    //     list.sort((item1: any, item2: any) => item2.id - item1.id);
    //     setData(list);
    //     setCurrentData(list.slice(indexOfFirstData, indexOfLastData));
    //   }
    // );
  };

  return (
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
          <SearchPhoneNumInput />
        </SearchPhoneNum>

        {/* Memo input */}
        <SearchMemo>
          <SearchSpan>
            #<SearchMemoInput />
          </SearchSpan>
        </SearchMemo>

        {/* Search button */}
        <SearchBtn>Search</SearchBtn>
      </SearchForm>
    </TitleDiv>
  );
};

export default TitleComponent;
