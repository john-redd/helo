import React, {useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import noImg from '../imgs/no_image.jpg';

const Form = (props) => {
  const [title, setTitle] = useState('');
  const [imgURL, setImgURL] = useState('');
  const [content, setContent] = useState('');

  const addPost = () => {
    axios.post('/api/posts', {title, img: imgURL, content, userId: props.user.user_id})
    .then(res => {
      console.log(res.response);
      setTitle('');
      setImgURL('');
      setContent('');
      props.history.push('/dashboard');
    })
    .catch(err => console.log(err));
  }

  return (
    <FormMC>
      <FormContainer>
        <FormHeader>
          <FormTitle>New Post</FormTitle>
        </FormHeader>
        <InputsContainer>
          <InputContainer>
            <Label>Title:</Label>
            <Input onChange={e => setTitle(e.target.value)} value={title} />
          </InputContainer>
          <FormImg src={noImg} />
          <InputContainer>
            <Label>Image URL:</Label>
            <Input onChange={e => setImgURL(e.target.value)} value={imgURL} />
          </InputContainer>
          <InputContainer>
            <Label>Content:</Label>
            <TextArea onChange={e => setContent(e.target.value)} value={content} />
          </InputContainer>
          <InputContainer>
            <Button onClick={addPost} >Post</Button>
          </InputContainer>
        </InputsContainer>
      </FormContainer>
    </FormMC>
  )
}

const mapStateToProps = reduxState => {
  const {user} = reduxState.userReducer;
  return {
    user
  }
}

export default connect(mapStateToProps)(Form);

const FormMC = styled.section`
  background-color: #f2f2f2;
  width: calc(100% - 5vw);
  height: 100vh;

  margin-left: 5vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  `
  
  const FormContainer = styled.section`
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

const FormHeader = styled.section`
  width: 95%;
  height: 60px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

const FormTitle = styled.h1`
  color: #ff9770;
  font-size: 35px;
  font-weight: bold;
`

const InputsContainer = styled.section`
  width: 100%;
  height: 550px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

const InputContainer = styled.section`
  width: 90%;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const Label = styled.label`
  width: 100%;
  margin-bottom: 5px;
`

const Input = styled.input`
  width: 100%;
`

const FormImg = styled.img`
  width: 500px;
  height: 250px;
  margin-right: 2.5%;

  box-shadow: 0 0 5px -2px rgba(0, 0, 0, .5);
`

const TextArea = styled.textarea`
  height: 100px;
  width: 100%;
`

const Button = styled.button`
  background: radial-gradient(#53514f, #565452);
  width: 50px;
  height: 25px;

  text-align: center;

  border: none;
`