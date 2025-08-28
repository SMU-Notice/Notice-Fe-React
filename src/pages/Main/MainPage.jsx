import Main from './Main';
import PopularWeeklyBoard from '../PopularWeeklyBoard/PopularWeeklyBoard';
import MainBoard from '../MainBoard/MainBoard';
import Map from '../Map/Map';




const MainPage = () => {
  return(
    <>
    <Main 
    buttonText="메일받기"
    navigateTo="/MyPageEmailManage"
    descriptionText={`상명대학교 통합공지와 학과공지를 한 번에 보고\n관심 있는 글에 대한 메일 알림도 받아볼 수 있습니다`}/>
    <PopularWeeklyBoard/>
    <MainBoard/>
    <Map/>
    </>
  )
};

export default MainPage;