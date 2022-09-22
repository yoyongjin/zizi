import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';

import 'react-datepicker/dist/react-datepicker.css';

const SearchDateInput = styled.input`
  box-sizing: border-box;
  width: 90px;
  height: 24px;
  border: 1px solid #707070;
  border-radius: 6px;
`;

const SearchEndDate = () => {
  const [endDate, setEndDate] = useState(new Date());

  const startDateSelectHandler = () => {
    // startDate 골랐을 때 endDate는 startDate 이전이 될 수 없게.
    // startDate 고르면 endDate로 autoFocus되게.
    console.log('startDate Selected');
  };

  return (
    <div>
      <DatePicker
        selected={endDate}
        onSelect={startDateSelectHandler}
        onChange={(date) => setEndDate(date)}
        customInput={<SearchDateInput />}
      />
    </div>
  );
};

export default SearchEndDate;
