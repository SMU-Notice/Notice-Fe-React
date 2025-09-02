import Main from './Main';
import PopularWeeklyBoard from '../PopularWeeklyBoard/PopularWeeklyBoard';
import MainBoard from '../MainBoard/MainBoard';
import Map from '../Map/Map';
import FAQAccordion from '../../components/FAQaccordion/FAQaccordion';
import YouTubeCarousel from '../../components/YouTubeCarousel/YouTubeCarousel';
import TrafficPopup from "../../components/TrafficPopup/TrafficPopup";
import React, { useState, useEffect } from "react";


const MainPage = () => {
  const [open, setOpen] = useState(true);
  return(
    <>
    <TrafficPopup open={open} onClose={() => setOpen(false)}/>
    <Main 
    buttonText="메일받기"
    navigateTo="/MyPageEmailManage"
    descriptionText={`상명대학교 통합공지와 학과공지를 한 번에 보고\n관심 있는 글에 대한 메일 알림도 받아볼 수 있습니다`}/>
    <YouTubeCarousel/>
    <PopularWeeklyBoard/>
    <MainBoard/>
    <Map/>
    <FAQAccordion/>
    </>
  )
};

export default MainPage;