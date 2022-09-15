import styled from 'styled-components';

const TitleDiv = styled.div`
  height: 10%;
  justify-content: space-between;
  display: flex;
`;

const TitleSpan = styled.span`
  /* flex: 1; */
  font-size: 16px;
  font-weight: 600;
  line-height: 2;
  letter-spacing: -0.8px;
  /* text-align: left; */
  color: #3a3a40;
`;

const SearchForm = styled.form`
  box-sizing: border-box;
  padding: 5px 15px;
  align-items: center;
  background-color: #d4d6d9;
  display: flex;
  justify-content: space-between;
  width: 771px;
  height: 34px;
  border-radius: 8px;
  opacity: 1;
`;

const SearchDateInput = styled.input`
  box-sizing: border-box;
  width: 90px;
  height: 24px;
  border: 1px solid #707070;
  border-radius: 6px;
`;
const SearchPhoneNumInput = styled.input`
  box-sizing: border-box;
  width: 122px;
  height: 24px;
  border: 1px solid #707070;
  border-radius: 6px;
`;
const SearchMemoInput = styled.input`
  box-sizing: border-box;
  width: 188px;
  height: 24px;
  border: 1px solid #707070;
  border-radius: 6px;
`;

const SearchSpan = styled.span`
  font: normal normal 600 13px/20px Segoe UI;
  color: #707070;
  opacity: 1;
`;

const SearchDate = styled.div``;
const SearchPhoneNum = styled.div``;
const SearchMemo = styled.div``;

const SearchBtn = styled.button`
  padding: 0;
  background: #707070;
  border-radius: 6px;
  opacity: 1;
  width: 74px;
  height: 24px;
  font: normal normal 600 14px/25px Segoe UI;
  color: #fff;
`;

const TitleComponent = () => {
  // const onChangeHandler = () => {

  // }
  return (
    <TitleDiv>
      <TitleSpan>Call Recording List</TitleSpan>
      <SearchForm>
        <SearchDate>
          <SearchSpan>Date</SearchSpan>
          <SearchDateInput />
          <SearchSpan>~</SearchSpan>
          <SearchDateInput />
        </SearchDate>
        <SearchPhoneNum>
          <SearchSpan>
            Phone No.
            <SearchPhoneNumInput />
          </SearchSpan>
        </SearchPhoneNum>
        <SearchMemo>
          <SearchSpan>
            #<SearchMemoInput />
          </SearchSpan>
        </SearchMemo>
        <SearchBtn>Search</SearchBtn>
      </SearchForm>
    </TitleDiv>
  );
};

export default TitleComponent;
