import ReactModal from 'react-modal';
import styled from 'styled-components';

const ModalHeaderDiv = styled.div`
  margin: 14px 0 0 19px;
`;

const ModalTitleSpan = styled.span`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.8px;
  text-align: left;
  color: #fff;
`;

const ModalContentDiv = styled.div`
  margin: 29px 113px 0 41px;
`;

const ModalContentSpan = styled.span`
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.5;
  letter-spacing: -0.6px;
  text-align: left;
  color: #fff;
  width: 446px;
  box-sizing: content-box;
`;

const ModalBottomDiv = styled.div`
  margin: 24px 0 0 48px;
  display: flex;
`;

const ModalInputDiv = styled.div`
  width: 180px;
  height: 36px;
  border-radius: 8px;
  border: solid 1px #3a3a40;
  background-color: #fff;
`;

const ModalSetButtonDiv = styled.div`
  width: 76px;
  height: 36px;
  margin-left: 9px;
  border-radius: 8px;
  background-color: #1f9fae;
  cursor: pointer;
`;

const ModalSetButtonSpan = styled.span`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 2.29;
  letter-spacing: -0.7px;
  color: #fff;
`;

ReactModal.setAppElement('#root');

const PhoneSettingModal = (props: any) => {
  const { modalState, setModalState, phoneSet } = props;
  return (
    <ReactModal
      isOpen={modalState}
      onRequestClose={() => setModalState(false)}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '',
        },
        content: {
          width: '600px',
          height: '300px',
          margin: '148px 0 0 333px ',
          padding: '0',
          inset: '0',
          border: '0',
          borderRadius: '0',
          background: '#707070',
          boxSizing: 'border-box',
        },
      }}
    >
      <ModalHeaderDiv>
        <ModalTitleSpan>Phone Setting</ModalTitleSpan>
      </ModalHeaderDiv>
      <ModalContentDiv>
        <ModalContentSpan>
          1. 통화녹음을 하고자 하는 휴대전화를 ZiBox2가 연결된 PC와 같은
          인터넷망으로 WIFI 접속 2. 휴대전화에서 ZiBox2 어플리케이션을 실행 (
          미설치 시 다음 링크에서 다운로드 후 설치 ) 3. ZiBox2 어플리케이션에서
          고유번호 확인 후 아래에 입력
        </ModalContentSpan>
      </ModalContentDiv>
      <ModalBottomDiv>
        <ModalInputDiv />
        <ModalSetButtonDiv>
          <ModalSetButtonSpan onClick={() => phoneSet()}>
            Set
          </ModalSetButtonSpan>
        </ModalSetButtonDiv>
      </ModalBottomDiv>
    </ReactModal>
  );
};

export default PhoneSettingModal;
