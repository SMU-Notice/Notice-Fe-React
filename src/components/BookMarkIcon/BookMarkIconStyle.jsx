import styled from "styled-components";
import BookMarkIcon from '../../assets/bookmark.svg?react';

const BookmarkWrapper = styled.div`
  position: relative;
  display: inline-block;
  transform: translateY(3px);
`;

const BookmarkButton = styled(BookMarkIcon)`
  fill: ${({ isBookmarked }) => (isBookmarked ? '	#DC143C' : '#ccc')};
  width: 17px;
  height: 17px;
  margin-right: 2px;
  margin-left: 8px;
  cursor: pointer;
`;

const FolderList = styled.div`
  position: absolute;
  top: 20px;
  background: white;
  border: 1px solid #ccc;
  padding: 8px;
  width: 200px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  font-family: 'Paperlogy', 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif;
`;

const FolderItem = styled.div`
  padding: 6px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const AddFolder = styled.div`
  margin-top: 8px;
  color: #007bff;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`;

const FolderInput = styled.input`
  margin-top: 8px;
  padding: 6px;
  width: 100%;
  box-sizing: border-box;
`;

export {BookmarkWrapper, BookmarkButton, FolderList, FolderItem, AddFolder, FolderInput};