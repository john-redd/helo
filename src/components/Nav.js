import React from 'react';
import axios from 'axios';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from 'styled-components';
import homeIcon from '../imgs/home_logo.png';
import newPostIcon from '../imgs/new_logo.png';
import logoutIcon from '../imgs/shut_down.png';

const Nav = (props) => {

  const logout = () => {
    axios.post('/auth/logout')
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  return (
    <NavMC props={props.location.pathname}>
      <ProfileImg src={props.user.profile_pic}/>
      <Username>{props.user.username}</Username>
      <Link to='/dashboard'>
        <HomeIcon src={homeIcon} />
      </Link>
      <Link to="/new">
        <NewPostIcon src={newPostIcon} />
      </Link>
      <Link to="/">
        <LogoutIcon src={logoutIcon} onClick={logout}/>
      </Link>
    </NavMC>
  )
}

const mapStateToProps = reduxState => {
  const {user} = reduxState.userReducer;
  return {
    user
  }
}

export default connect(mapStateToProps, null)(withRouter(Nav));

const NavMC = styled.section`
  background: linear-gradient(#ff9770, #ff7bbc);
  width: 5vw;
  min-height: 100vh;
  height: fit-content;

  float: left;

  position: fixed;
  box-shadow: 4px 0 5px -2px rgba(0, 0, 0, .5);

  display: ${props => props.props === "/" ? 'none' : 'inline'};

`

const ProfileImg = styled.img`
  max-width: 45px;
  max-height: 45px;
  border-radius: 50%;

  position: fixed;
  left: 15px;
  top: 15px;
`

const Username = styled.h1`
  font-size: 12px;

  position: fixed;
  top: 70px;
  left: 20px;
`

const NavIcon = styled.img`
  max-width: 40px;
  max-height: 40px;
  position: fixed;
  left: 20px;
`

const HomeIcon = styled(NavIcon)`
  top: 125px;
`

const NewPostIcon = styled(NavIcon)`
  top: 195px;
`

const LogoutIcon = styled(NavIcon)`
  bottom: 15px;
`