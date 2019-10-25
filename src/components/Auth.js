import React, {useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {updateUser} from '../redux/reducers/userReducer';
import heloLogo from '../imgs/helo_logo.png';

const Auth = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    axios.post('/auth/login', {username, password})
    .then(res => {
      props.updateUser(res.data);
      props.history.push('/dashboard');
      setUsername('');
      setPassword('');
    })
    .catch(err => alert(err.response.data));
  }

  const register = () => {
    axios.post('/auth/register', {username, password})
    .then(res => {
      props.updateUser(res.data);
      props.history.push('/dashboard');
      setUsername('');
      setPassword('');
    })
    .catch(err => alert(err.response.data))
  }

  return (
    <AuthMC>
      <LoginMC>
        <Logo src={heloLogo} />
        <Title>Helo</Title>
        <LabelAndInputContainer>
          <Label>Username:</Label>
          <Input 
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)} />
        </LabelAndInputContainer>
        <LabelAndInputContainer>
          <Label>Password:</Label>
          <Input 
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)} />
        </LabelAndInputContainer>
        <ButtonContainer>
          <Button onClick={login}>Login</Button>
          <Button onClick={register}>Register</Button>
        </ButtonContainer>
      </LoginMC>
    </AuthMC>
  )
}

const mapStateToProps = reduxState => {
  const {userReducer} = reduxState;
  const {user} = userReducer;
  return {
    user
  }
}

const mapDispatchToProps = {
  updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

const AuthMC = styled.section`
  background: linear-gradient(0.25turn, #ff72a4, #faa36e, #edf570);
  width: 100%;
  height: 100vh;
  
  display: flex;
  justify-content: center;
  align-items: center;
  
  color: white;
`
  
  const LoginMC = styled.section`
  background: linear-gradient(0.25turn, #ff7b6e, #faa36e, #ffce6f);
  width: 33%;
  height: 53%;
  
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  
  box-shadow: 0px 10px 15px 0px rgba(0,0,0,0.75);
  border-radius: 10px;

  padding: 10px;
`

const Logo = styled.img`
  width: 95px;
  height: 95px;
`

const Title = styled.h1`
  font-size: 60px;
  font-weight: bolder;
`

const LabelAndInputContainer = styled.section`
  width: 60%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Label = styled.label`
  
`

const Input = styled.input`
  width: 50%;

  padding: 5px;
  border: none;
`

const ButtonContainer = styled.section`
  width: 40%;

  display: flex;
  justify-content: space-between;
`

const Button = styled.button`
  background: radial-gradient(#4c4a47, #5c5b59);
  border: none;
  padding: 5px 10px;
  color: white;
`