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
        // month
        onChange={(date) => setStartDate(date)}
        customInput={<SearchDateInput />}
        dateFormat="yyyy.MM.dd"
        selectsStart
        endDate={endDate}
        fixedHeight
        focusSelectedMonth
        placeholderText="startDate"
        maxDate={endDate}
        disabledKeyboardNavigation

        // dayClassName={(d) => ({d.getDate() === date.getDate() ? "custom-day" : "gray-day"})}
      />
      <SearchSpan>~</SearchSpan>
      <DatePicker
        selected={endDate}
        name="endDate"
        onChange={(date) => setEndDate(date)}
        // onSelect={endSelectHandler}
        customInput={<SearchDateInput />}
        dateFormat="yyyy.MM.dd"
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={!endDate ? startDate : null}
        fixedHeight
        placeholderText="endDate"
        disabledKeyboardNavigation
      />
    </DateInputContainer>
  );
};

export default DateStartToEnd;
