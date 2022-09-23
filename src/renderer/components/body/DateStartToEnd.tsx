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
const SearchSpan = styled.span`
  font: normal normal 600 13px/20px Segoe UI;
  color: #707070;
  white-space: nowrap;
  opacity: 1;
`;
const DateInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DateStartToEnd = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <DateInputContainer>
      <DatePicker
        name="startDate"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        customInput={<SearchDateInput />}
        dateFormat="yyyy/MM/dd"
        selectsStart
        startDate={startDate}
        endDate={endDate}
        maxDate={endDate}
        fixedHeight
        showPreviousMonths={false}
        placeholderText="startDate"
      />
      <SearchSpan>~</SearchSpan>
      <DatePicker
        name="endDate"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        customInput={<SearchDateInput />}
        dateFormat="yyyy/MM/dd"
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        fixedHeight
        showPreviousMonths={false}
        placeholderText="endDate"
      />
    </DateInputContainer>
  );
};

export default DateStartToEnd;
