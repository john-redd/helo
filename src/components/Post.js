import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {StyledDiv, RestyledText, SmallerProfileImg} from './Dashboard';
import noImg from '../imgs/no_image.jpg';

const Post = (props) => {
  const [post, setPost] = useState({});

  const getPost = () => {
    axios.get(`/api/posts/${props.match.params.id}`)
    .then(res => setPost(res.data))
    .catch(err => console.log(err));
  }

  useEffect(() => {
    getPost();
  }, [])

  return (
    <PostMC>
      <PostContainer>
        <PostHeader>
          <PostTitle>{post.title}</PostTitle>
          <StyledDiv>
            <RestyledText>by {post.username}</RestyledText>
            <SmallerProfileImg src={post.profile_pic} />
          </StyledDiv>
        </PostHeader>
        <PostImgAndContentContainer>
          <PostImg src={post.img === '' ? noImg : post.img} />
          <PostContent>{post.content}</PostContent>
        </PostImgAndContentContainer>
      </PostContainer>
    </PostMC>
  )
}

export default Post;

const PostMC = styled.section`
  background-color: #f2f2f2;
  width: calc(100% - 5vw);
  height: 100vh;

  margin-left: 5vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  `
  
  const PostContainer = styled.section`
  background-color: white;
  width: 75%;
  height: fit-content;

  padding: 20px;
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  box-shadow: 0 0 5px -2px rgba(0, 0, 0, .5);
`

const PostHeader = styled.section`
  width: 95%;
  height: 60px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

const PostTitle = styled.h1`
  color: #ff9770;
  font-size: 35px;
  font-weight: bold;
`

const PostImgAndContentContainer = styled.section`
  width: 90%;

  display: flex;
  justify-content: center;

  margin-right: 0px;
`

const PostImg = styled.img`
  width: 45%;
  margin-right: 2.5%;

  box-shadow: 0 0 5px -2px rgba(0, 0, 0, .5);
`

const PostContent = styled.p`
  width: 45%;
  margin-left: 2.5%;

  font-size: 12px;
`