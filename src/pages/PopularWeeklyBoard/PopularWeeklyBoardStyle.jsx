import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  padding: 20px;
  position: relative;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 25px;
  text-align: center;
  color: #09144D;
  font-family: 'Cafe24Ssurround', 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif;
`;

const NoticeList = styled.div`
  width: 60%;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const NoticeItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.1s ease-in-out, font-weight 0.1s ease-in-out;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #f0f8ff;
    font-weight: bold;
    color: #09144D;
  }
`;

const Rank = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => (props.first ? "20px" : "15px")};
  font-weight: bold;
  background-color: ${(props) => (props.first ? "gold" : "#09144D")};
  margin-right: 10px;
  margin-left: 10px;
  width: ${(props) => (props.first ? "25px" : "20px")};
  height: ${(props) => (props.first ? "25px" : "20px")};
  color: white;
  border-radius: 50%;
  text-align: center;
  font-family: 'Cafe24Ssurround', 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif;
`;

const NoticeText = styled.div`
  flex: 1;
`;

const DateAndViews = styled.div`
  font-size: 12px;
  color: #777;
`;

const NoticeTitle = styled.div`
  font-size: ${(props) => (props.first ? "20px" : "15px")};
  font-weight: ${(props) => (props.first ? "bold" : "")};
  margin-bottom: 3px;
`

const CalendarIcon = styled.img`
  width: 11px;
  height: 11px;
  margin-right: 2px;
  margin-left: 2px;
`

const ViewIcon = styled.img`
  width: 11px;
  height: 11px;
  margin-right: 2px;
  margin-left: 8px;
`

export {Container, Title, NoticeList, NoticeItem, Rank, NoticeText, DateAndViews, NoticeTitle, CalendarIcon, ViewIcon};