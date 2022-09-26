/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Pagination from 'react-js-pagination';
// import page_r from '../../../../assets/page_r@2x.png';
// import page_rr from '../../../../assets/page_rr@2x.png';
// import page_f from '../../../../assets/page_f@2x.png';
// import page_ff from '../../../../assets/page_ff@2x.png';
import page_r from '../../../../assets/page_r.png';
import page_rr from '../../../../assets/page_rr.png';
import page_f from '../../../../assets/page_f.png';
import page_ff from '../../../../assets/page_ff.png';

const PaginationBox = styled.div`
  display: flex;
  justify-content: space-between;
  /* background-color: red; */
  .pagination {
    display: flex;
    /* justify-content: center; */
    background-color: #fff;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    /* border: 1px solid #e2e2e2; */
    display: flex;
    justify-content: center;
    align-items: center;
    /* font-size: 1rem; */
    font: normal normal 600 16px/25px Segoe UI;
  }
  /* ul.pagination li:first-child {'
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  } */
  ul.pagination li a {
    text-decoration: none;

    /* color: #337ab7; */
    /* font-size: 1rem; */
    /* align-items: center; */
    justify-content: center;
    /* background-color: red; */
    color: #3a3a40;
    font: normal normal 600 16px/25px Segoe UI;
  }
  ul.pagination li.active a {
    /* color: white; */
    color: #3a3a40;
  }
  ul.pagination li.active {
    /* background-color: #337ab7; */
    text-decoration: underline;
  }
  /* ul.pagination li a:hover,
  ul.pagination li a.active {
    color: blue;
  } */
`;

const DeleteSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  /* background-color: red; */
`;
const MovePageImgContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PagingBoxComponenet = (props: any) => {
  const {
    totalCount,
    dataPerPage,
    pageRangeDisplayed,
    handlePageChange,
    page,
    onDeleteHandler,
  } = props;

  return (
    <PaginationBox>
      <Pagination
        activePage={page}
        itemsCountPerPage={dataPerPage}
        totalItemsCount={totalCount || 0}
        pageRangeDisplayed={pageRangeDisplayed}
        // prevPageText="‹"
        // nextPageText="›"
        firstPageText={
          <MovePageImgContainer>
            <img src={page_rr} alt="처음페이지" />
          </MovePageImgContainer>
        }
        prevPageText={
          <MovePageImgContainer>
            <img src={page_r} alt="이전페이지" />
          </MovePageImgContainer>
        }
        nextPageText={
          <MovePageImgContainer>
            <img src={page_f} alt="다음페이지" />
          </MovePageImgContainer>
        }
        lastPageText={
          <MovePageImgContainer>
            <img src={page_ff} alt="마지막페이지" />
          </MovePageImgContainer>
        }
        onChange={handlePageChange}
      />
      {/* page_ff@2x.png */}
      <DeleteSpan onClick={onDeleteHandler}>Delete</DeleteSpan>
    </PaginationBox>
  );
};
export default PagingBoxComponenet;
