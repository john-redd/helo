import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from 'styled-components';
import searchIcon from '../imgs/search_logo.png';
import axios from 'axios';
import Post from './Post';

const Dashboard = (props) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [userPosts, setUserPosts] = useState(false);
  const [filter, setFilter] = useState(false);

  const getPosts = () => {
    axios.get('/api/posts')
    .then(res => {
      if(!filter && !userPosts){

        let filteredPosts = res.data.filter(e => {
          return e.user_id !== props.user.user_id;
        })
        setPosts(filteredPosts);
      } else {
        setPosts(res.data)
      }
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    getPosts();
  }, [])

  const goToPost = (e) => {
    props.history.push(`/post/${e.target.id}`)
  }

  const filterPosts = () => {
    if(filter){
      setFilter(false)
    } else {
      setFilter(true);
    }
    // filteredPosts();
  }


  const filteredPosts = () => {
    if(filter && userPosts){
      let filteredPosts = posts.filter(e => {
        return e.title.toLowerCase().includes(search.toLowerCase());
      });
      setPosts(filteredPosts);
    }
    
    if(filter && !userPosts){
      let filteredPosts = posts.filter(e => {
        return e.title.toLowerCase().includes(search.toLowerCase());
      })

      filteredPosts = filteredPosts.filter(e => {
        return e.user_id !== props.user.user_id;
      })
      setPosts(filteredPosts);
    }

  }

  useEffect(() => {
    filteredPosts()
  }, [filter])

  return (
    <DashboardMC>
      <SearchBarMC>
        <SearchBar value={search} onChange={e => setSearch(e.target.value)} />
        <SearchIcon src={searchIcon} onClick={filterPosts} />
        <Button>Reset</Button>
        <Text>My Posts</Text>
        <input type="checkbox" checked/>
      </SearchBarMC>
      <PostsContainer>
        {/* {posts.map((e, i) => {
          return (
            <Post
              key={`Post ${i}`}
              postId={e.post_id}
              title={e.title}
              img={e.img}
              content={e.content}
              userId={e.user_id} />
          )
        })} */}
        {posts.map((e, i) => {
          return (
            // <NavLink to={`/post/${e.post_id}`}>
              <PostSnippet id={e.post_id} onClick={goToPost}>
                <Title>{e.title}</Title>
                <StyledDiv>
                    <RestyledText>by {e.username}</RestyledText>
                    <SmallerProfileImg src={e.profile_pic} />
                </StyledDiv>
              </PostSnippet>
            // </NavLink>
          )
        })}
      </PostsContainer>
    </DashboardMC>
  )
}

const mapStateToProps = reduxState => {
  const {user} = reduxState.userReducer;
  return {
    user
  }
}

export default connect(mapStateToProps)(Dashboard);

const DashboardMC = styled.section`
  background-color: #f2f2f2;
  width: calc(100% - 5vw);
  min-height: 100vh;
  height: fit-content;

  margin-left: 5vw;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const SearchBarMC = styled.section`
  background-color: white;
  width: calc(70% - 40px);
  height: calc(8% - 20px);

  margin-top: 25px;
  padding: 10px 20px;

  display: flex;
  // justify-content: center;
  align-items: center;
`

const SearchBar = styled.input`
  width: 60%;
  height: 16px;
  `
  
const SearchIcon = styled.img`
  background-color: #ff9770;
  height: 20px;
  `
  
const Button = styled.button`
  background: radial-gradient(#53514f, #565452);
  height: 20px;

  border: none;

  font-size: 10px;
  color: white;
`

const Text = styled.p`
  margin-left: 250px;
  font-size: 12px;
`

// const CheckBox = styled.

const PostsContainer = styled.section`
  background-color: white;
  width: calc(70% - 40px);
  // height: calc(8% - 20px);
  height: fit-content;
  // max-height: fit

  margin-top: 25px;
  margin-bottom: 25px;
  padding: 10px 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

const PostSnippet = styled.section`
  width: 95%;
  height: 40px;

  padding: 20px;
  margin: 10px;

  // border: 1px solid black;
  box-shadow: 0 0 5px -2px rgba(0, 0, 0, .5);

  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.h1`

`

export const StyledDiv = styled.div`
  // width: 100px;

  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`

export const RestyledText = styled(Text)`
  margin: 0;
`

export const SmallerProfileImg = styled.img`
  max-width: 30px;
  max-height: 30px;
  border-radius: 50%;

  margin-left: 5px;

  box-shadow: 0 0 5px -2px rgba(0, 0, 0, .5);
`