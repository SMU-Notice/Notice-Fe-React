import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SidebarNav from "../../components/SideBarNav/SideBarNav";
import { CheckID } from "./CheckID";
import MajorSelect from "./MajorSelect";
import { EmailInput } from "./EmailInput";

const MyPageEmailManage = () => {
  const navigate = useNavigate();

  const goToBookmark = () => navigate("/MyPageBookMark");
  const goToEmailManage = () => navigate("/MyPageEmailManage");
  const goToProfile = () => navigate("/MyPageProfileEdit");

  return (
    <Container style={{ "--header-h": "10vh" }}>
      <SidebarNav
        width={100}
        headerHeight="10vh"
        onGoBookmark={goToBookmark}
        onGoEmail={goToEmailManage}
        onGoProfile={goToProfile}
      />

      <Main>
        <Title>회원 정보</Title>

        <Section>
          <CheckID />
        </Section>

        <Section>
          <h2 style={{ fontSize: "25px"}}>메일 수정하기</h2>
          <EmailInput />
        </Section>

        <Section>
          <MajorSelect />
        </Section>
      </Main>
    </Container>
  );
};

export default MyPageEmailManage;

const Container = styled.div`

  height: calc(100vh - var(--header-h, 0));

  display: flex;
  font-family: "Cafe24Ssurround", sans-serif;

  margin: 0;
`;

const Main = styled.main`
  flex: 1;
  padding: 0 10vh 10vh;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 48px;
  margin-top: 30px;
  margin-bottom: 50px;
`;

const Section = styled.section`
  margin-bottom: 90px;
`;
