import React, { useEffect, useState } from "react";
import TodoBoard from "../components/TodoBoard";
import api from "../utils/api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Navigate } from "react-router-dom"

const TodoPage = ({user, setUser}) => {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const getTasks = async () => {
    const response = await api.get("/tasks");
    console.log("taskList", response.data.data);
    setTodoList(response.data.data);
  };
  useEffect(() => {
    getTasks();
  }, []);
  const addTodo = async () => {
    try {
      const response = await api.post("/tasks", {
        task: todoValue,
        isComplete: false,
      });
      if (response.status === 200) {
        getTasks();
      }
      setTodoValue("");
    } catch (error) {
      console.log("error:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      console.log(id);
      const response = await api.delete(`/tasks/${id}`);
      if (response.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const task = todoList.find((item) => item._id === id);
      const updateData = {
        isComplete: !task.isComplete,
      };
  
      if (user) {
        updateData.author = user._id;
      }
  
      const response = await api.put(`/tasks/${id}`, updateData);
      if (response.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleLogout = () => {
    
    sessionStorage.removeItem("token");

    setUser(null);

    setRedirectToLogin(true);

  };

  
  return (
    <Container>
      <Row className="add-item-row align-items-center">
        <Col xs={12} sm={10}>
          <h2 className="user-title" style={{ display: 'inline' }}>
            {user.name}님 환영합니다.
          </h2>
        </Col>
        <Col xs={12} sm={2} className="d-flex justify-content-end">
          <button className="button-delete" onClick={handleLogout}>
            Logout
          </button>
        </Col>
      </Row>

      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            onChange={(event) => setTodoValue(event.target.value)}
            className="input-box"
            value={todoValue}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button onClick={addTodo} className="button-add">
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard
        todoList={todoList}
        deleteItem={deleteItem}
        toggleComplete={toggleComplete}
      />
    </Container>
  );
};

export default TodoPage;