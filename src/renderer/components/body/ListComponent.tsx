/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
// import Pagination from 'react-js-pagination';
import PagingBoxComponenet from './PagingBoxComponenet';
import ListTitleComponent from './ListTitleComponent';
import ListContentComponent from './ListContentComponent';
import playImg from '../../../../assets/play@3x.png';

const ListDiv = styled.div`
  height: 420px;
  margin-top: 0;
  /* background-color: #ccc; */
`;

const ContentUl = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  /* justify-content: flex-start; */
  height: 15px;
  font-size: 12px;
  font-weight: normal;
  color: #707070;
  margin: 0;
  /* margin-bottom: 8px; */
  padding: 0;
  padding: 7.5px 0;
  /* padding-bottom: 7px; */
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

const MemoInput = styled.input`
  width: 98%;
  border: none;
`;

const CheckboxLi = styled.li`
  width: 2.75%;
  display: flex;
`;

const ListComponent = (props: any) => {
  console.log('!@#!@#!@#!@#ListComponent Rerendering...');
  const [input, setInput] = useState('');

  const { currentData } = props;

  const [memoId, setMemoId] = useState('');
  const [memoContent, setMemoContent] = useState('');
  const [updateFlag, setUpdateFlag] = useState(false);

  const onFocus = (id, e) => {
    console.log(`onFocus event - id: ${id} memo: ${e.target.value}`);
    setMemoId(id);
    setMemoContent(e.target.value);
  };

  const onBlur = (id, e) => {
    console.log(`onBlur event - id: ${id} memo: ${e.target.value}`);
    setInput(e.target.value);

    if (memoId === id && memoContent !== e.target.value) {
      console.log('ListComponent.tsx - ipcRenderer.updateQureyToMain');

      // window.ipcDbChannel.sendQureyToMain(
      //   'select * from tb_call',
      //   (list: any) => {
      //     list.sort((item1: any, item2: any) => item2.Id - item1.Id);
      //   }
      // );
      setUpdateFlag(true);
    }
  };

  return (
    <ListDiv>
      <ListTitleComponent />
      {currentData &&
        currentData.map((data: any) => {
          return (
            <ListContentComponent key={data.id} data={data} />
            // <ContentUl key={d.id}>
            //   <PlayeLi>
            //     <PlayImg src={playImg} />
            //   </PlayeLi>
            //   <DateLi>{d.date}</DateLi>
            //   <TimeLi>{d.time}</TimeLi>
            //   <PhoneNumberLi>{d.phonenumber}</PhoneNumberLi>
            //   <MemoLi>
            //     <MemoInput
            //       defaultValue={d.memo}
            //       // value={input}
            //       onFocus={(e) => {
            //         onFocus(d.id, e);
            //       }}
            //       onBlur={(e) => {
            //         onBlur(d.id, e);
            //       }}
            //     />
            //   </MemoLi>
            //   <CheckboxLi>
            //     <input type="checkbox" />
            //   </CheckboxLi>
            // </ContentUl>
          );
        })}
    </ListDiv>
  );
};

export default ListComponent;
