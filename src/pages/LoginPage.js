import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginPage = ({user, setUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    try {

      const response = await api.post('/user/login', { email, password });
      //console.log('Response:', response); 

      if (response.status === 200) {
        setUser(response.data.user);
        sessionStorage.setItem("token", response.data.token);
        api.defaults.headers["authorization"]="Bearer "+response.data.token;
        setError("");
        navigate("/")
      } else {
        throw new Error(response.data.message || '로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('Login Error:', error); 
      setError(error.message || '서버와의 통신에 문제가 발생했습니다.');
    }
  };
  if(user){
    return <Navigate to = "/"/>
  }
  return (
    <div className="display-center">
      {error && <div className="error-message">{error}</div>} 
      <Form className="login-box" onSubmit={handleLogin}>
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
