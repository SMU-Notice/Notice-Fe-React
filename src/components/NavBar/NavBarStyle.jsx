import styled from 'styled-components';

const Navibar = styled.div`
  position: relative;
  top: 0;
  width: 100%;
  background: rgba(9, 20, 77, 1); 
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  z-index: 1;
  height: 10vh;
`;

const NavButton = styled.button`
  background: none;
  color: white;
  padding: 0.5rem 1rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    font-size: 14px;
  }
  font-family: 'Cafe24Ssurround', 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif;
`;

const NavibarTitle = styled.div`
  font-weight: bold;
  font-size: 35px;
  font-family: 'Nunito', 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif;
`

const SmuIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  transform: translateY(px);
`


export {NavButton, Navibar, NavibarTitle, SmuIcon};