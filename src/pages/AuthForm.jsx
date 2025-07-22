import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

// Background Image
const backgroundImage = "https://images.unsplash.com/photo-1557682250-33bd709cbe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80";

// ---------- Styled Components ----------

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Container = styled.div`
  position: relative;
  width: 900px;
  height: 550px;
  background: #f0f4f8;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  overflow: hidden;
  display: flex;
  transition: 0.8s ease-in-out;
`;

const Panel = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  top: 0;
  z-index: 1;
  transition: 0.8s ease-in-out;

  ${({ right }) => right ? css`right: 0;` : css`left: 0;`}
  ${({ active, right }) => active && css`
    transform: translateX(${right ? '-100%' : '100%'});
  `}
`;

const FormContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.8s ease-in-out;
  ${({ active }) => active && css`transform: translateX(-100%);`}
`;

const Form = styled.div`
  background: rgba(255,255,255,0.9);
  padding: 40px 30px;
  border-radius: 10px;
  width: 80%;
  max-width: 350px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border: none;
  border-radius: 30px;
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    opacity: 0.9;
  }
`;

const SidePanelContent = styled.div`
  position: relative;
  z-index: 2;
  color: #fff;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const SidePanel = styled.div`
  width: 50%;
  height: 100%;
  background: url(${backgroundImage}) center/cover no-repeat;
  position: absolute;
  top: 0;
  ${({ right }) => right ? css`right: 0;` : css`left: 0;`}
  z-index: 0;
  transition: 0.8s ease-in-out;
  ${({ active, right }) => active && css`
    transform: translateX(${right ? '-100%' : '100%'});
  `}

  &:after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 1;
  }
`;

const ToggleButton = styled.button`
  margin-top: 30px;
  padding: 10px 30px;
  border: 2px solid #fff;
  border-radius: 30px;
  background: transparent;
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  z-index: 2;
  transition: 0.3s;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

// ---------- Main Component ----------

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    localStorage.setItem('token', 'dummy-token');
    navigate('/dashboard');
  };

  const handleSignUp = () => {
    localStorage.setItem('token', 'dummy-token');
    navigate('/dashboard');
  };

  return (
    <Wrapper>
      <Container>
        <FormContainer active={isSignUp}>
          {!isSignUp ? (
            <Form>
              <Title>Sign In</Title>
              <Input type="email" placeholder="Email" />
              <Input type="password" placeholder="Password" />
              <SubmitButton onClick={handleSignIn}>Sign In</SubmitButton>
            </Form>
          ) : (
            <Form>
              <Title>Sign Up</Title>
              <Input type="text" placeholder="Name" />
              <Input type="email" placeholder="Email" />
              <Input type="password" placeholder="Password" />
              <Input type="password" placeholder="Confirm Password" />
              <SubmitButton onClick={handleSignUp}>Sign Up</SubmitButton>
            </Form>
          )}
        </FormContainer>

        <Panel right={!isSignUp} active={isSignUp}>
          <SidePanelContent>
            <h2>New Here?</h2>
            <p>Join Study-Genius and boost your learning journey!</p>
            <ToggleButton onClick={() => setIsSignUp(true)}>Sign Up</ToggleButton>
          </SidePanelContent>
        </Panel>

        <Panel right={isSignUp} active={!isSignUp}>
          <SidePanelContent>
            <h2>Welcome Back!</h2>
            <p>Already a member? Sign in and continue learning.</p>
            <ToggleButton onClick={() => setIsSignUp(false)}>Sign In</ToggleButton>
          </SidePanelContent>
        </Panel>

        <SidePanel right={!isSignUp} active={isSignUp} />
        <SidePanel right={isSignUp} active={!isSignUp} />
      </Container>
    </Wrapper>
  );
};

export default AuthForm;
