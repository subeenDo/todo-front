import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secPassword, setSecPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        setError('');

        if (!name || !email || !password || !secPassword) {
            setError("모든 필드를 입력해주세요.");
            return;
        }

        if (password !== secPassword) {
            setError("패스워드가 일치하지 않습니다. 다시 입력해주세요.");
            return;
        }

        try {
            const response = await api.post('/user', { name, email, password });
            if (response.status === 200) {
                navigate('/login');  
            } else {
                throw new Error("회원가입에 실패했습니다.");  
            }
        } catch (error) {
            setError(error.message || "회원가입 중 오류가 발생했습니다.");  
        }
    };

    return (
        <div className="display-center">
            {error && <div className="error-message">{error}</div>} 
            <Form className="login-box" onSubmit={handleSubmit}>
                <h1>회원가입</h1>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name"
                        onChange={(event) => setName(event.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicSecPassword">
                    <Form.Label>Re-enter the password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Re-enter the password"
                        onChange={(event) => setSecPassword(event.target.value)}
                    />
                </Form.Group>

                <Button className="button-primary" type="submit">
                    회원가입
                </Button>
            </Form>
        </div>
    );
};

export default RegisterPage;
