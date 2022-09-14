import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Pagination from 'react-js-pagination';
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
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(5);

  const handlePageChange = (page2: any) => {
    setPage(page2);
  };
  const itemChange = (e: any) => {
    setItems(Number(e.target.value));
  };

  const recordState = useSelector(
    (state: any) => state.recordStateReducer.recordState
  );
  console.log(`####ListComponent Rendering..`);

  useEffect(() => {
    console.log('ListComponent.tsx - ipcRenderer.sendQureyToMain');
    window.ipcDbChannel.sendQureyToMain('select * from call', (list: any) => {
      list.sort((item1: any, item2: any) => item2.id - item1.id);
      setData(list);
    });
  }, []);

  return (
    <ListDiv>
      <ListTitleComponent />
      {data &&
        data
          // .slice(items * (page - 1), items * (page - 1) + items)
          .map((d: any) => {
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
      <PaginationBox>
        <Pagination
          activePage={1}
          itemsCountPerPage={5}
          totalItemsCount={300}
          pageRangeDisplayed={2}
          onChange={handlePageChange}
        />
      </PaginationBox>
    </ListDiv>
  );
};

export default ListComponent;
