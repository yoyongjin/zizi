import React, { useState } from 'react';
import styled from 'styled-components';

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
  box-sizing: border-box;
  padding: 5px 15px 5px 0px;
  align-items: center;
  background-color: #d4d6d9;
  display: flex;
  justify-content: space-between;
  width: 771px;
  height: 34px;
  border-radius: 8px;
  opacity: 1;
`;
interface SearchSpanProps {
  searchItem: string;
}
interface SearchDateInputProps {
  dateStartEnd: string;
}
const SearchDateInput = styled.input<SearchDateInputProps>`
  margin-left: ${(props) => (props.dateStartEnd === 'START' ? '7px' : '3px')};
  box-sizing: border-box;
  width: 90px;
  height: 24px;
  border: 1px solid #707070;
  border-radius: 6px;
`;
const SearchPhoneNumInput = styled.input`
  margin-left: 7px;
  box-sizing: border-box;
  width: 122px;
  height: 24px;
  border: 1px solid #707070;
  border-radius: 6px;
`;
const SearchMemoInput = styled.input`
  margin-left: 7px;
  box-sizing: border-box;
  width: 188px;
  height: 24px;
  border: 1px solid #707070;
  border-radius: 6px;
`;

const SearchSpan = styled.span<SearchSpanProps>`
  /* margin-left: ${(props) =>
    props.searchItem === 'DATE' ? '13px' : '15px'}; */
  margin-left: ${(props) => {
    switch (props.searchItem) {
      case 'DATE':
        return '13px';
      case 'TILDE':
        return '2px';
      default:
        return '15px';
    }
  }};
  /* font: normal normal 600 13px/20px Segoe UI; */
  font: normal normal 600 13px/20px Segoe UI;
  color: #707070;
  opacity: 1;
`;

const SearchDate = styled.div`
  /* margin-left: 13px; */
`;
const SearchPhoneNum = styled.div`
  /* margin-left: 15px; */
`;
const SearchMemo = styled.div`
  /* margin-left: 15px; */
`;

const SearchBtn = styled.button`
  margin-left: 15px;
  padding: 0;
  background: #707070;
  border: none;
  border-radius: 6px;
  opacity: 1;
  width: 74px;
  height: 24px;
  font: normal normal 600 14px Segoe UI;
  color: #fff;
`;

const TitleComponent = () => {
  console.log('***** TitleComponent rendering...');

  // const [startDate, setStartDate] = useState('');
  // const [endDate, setEndDate] = useState('');
  // const [phoneNum, setPhoneNum] = useState('');
  // const [memo, setMemo] = useState('');

  // const startDateHandler = (e) => {
  //   e.preventDefault();
  //   setStartDate(e.target.value);
  // };

  // const endDateHandler = (e) => {
  //   e.preventDefault();
  //   setEndDate(e.target.value);
  // };

  // const phoneNumHandler = (e) => {
  //   e.preventDefault();
  //   setPhoneNum(e.target.value);
  // };

  // const memoHandler = (e) => {
  //   e.preventDefault();
  //   setMemo(e.target.value);
  // };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    console.log('&&&&&submit');
    console.log('startDate', data.get('startDate'));
    console.log('endDate', data.get('endDate'));
    console.log('phoneNum', data.get('phoneNum'));
    console.log('memo', data.get('memo'));

    // 여기 DB 조회
  };

  return (
    <TitleDiv>
      <TitleSpanContainer>
        <TitleSpan>Call Recording List</TitleSpan>
      </TitleSpanContainer>
      <SearchForm onSubmit={onSubmitHandler}>
        <SearchDate>
          <SearchSpan searchItem="DATE">Date</SearchSpan>
          <SearchDateInput
            dateStartEnd="START"
            // onChange={startDateHandler}
            name="startDate"
          />
          <SearchSpan searchItem="TILDE">~</SearchSpan>
          <SearchDateInput
            dateStartEnd="END"
            // onChange={endDateHandler}
            name="endDate"
          />
        </SearchDate>
        <SearchPhoneNum>
          <SearchSpan searchItem="PHONENUM">
            Phone No.
            <SearchPhoneNumInput
              // onChange={phoneNumHandler}
              name="phoneNum"
            />
          </SearchSpan>
        </SearchPhoneNum>
        <SearchMemo>
          <SearchSpan searchItem="MEMO">
            #
            <SearchMemoInput
              // onChange={memoHandler}
              name="memo"
            />
          </SearchSpan>
        </SearchMemo>
        <SearchBtn>Search</SearchBtn>
      </SearchForm>
    </TitleDiv>
  );
};

export default TitleComponent;
