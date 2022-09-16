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
          <SearchSpan searchItem="DATE">Date</SearchSpan>
          <SearchDateInput dateStartEnd="START" />
          <SearchSpan searchItem="TILDE">~</SearchSpan>
          <SearchDateInput dateStartEnd="END" />
        </SearchDate>
        <SearchPhoneNum>
          <SearchSpan searchItem="PHONENUM">
            Phone No.
            <SearchPhoneNumInput />
          </SearchSpan>
        </SearchPhoneNum>
        <SearchMemo>
          <SearchSpan searchItem="MEMO">
            #<SearchMemoInput />
          </SearchSpan>
        </SearchMemo>
        <SearchBtn>Search</SearchBtn>
      </SearchForm>
    </TitleDiv>
  );
};

export default TitleComponent;
