import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import TodoBoard from "./components/TodoBoard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner"
import api from "./utils/api"

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [loading, setLoading] = useState(false);

  const getTasks = async () => {
    setLoading(true); 
    try {
      const response = await api.get('/tasks');
      setTodoList(response.data.data);
    } catch (error) {
      console.error("오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    try {
      const response = await api.post('/tasks', {
        task: todoValue,
        isComplete: false,
      });
      if (response.status === 200) {
        console.log("Task가 등록되었습니다.");
        setTodoValue(""); // 입력한 값 초기화
        getTasks(); // 업데이트된 목록 불러오기
      } else {
        throw new Error('Task를 추가할 수 없습니다.');
      }
    } catch (err) {
      console.error("오류:", err);
    }
  };

  const completeTask = async (id) => {
    try {
      const task = todoList.find((item) => item._id === id);
      const response = await api.put(`/tasks/${id}`, {
        isComplete: !task.isComplete,
      });
      if (response.status === 200) {
        console.log("상태가 변경되었습니다.");
        getTasks(); 
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      if (response.status === 200) {
        console.log("Task가 삭제되었습니다.");
        getTasks(); 
      } else {
        throw new Error('Task를 삭제할 수 없습니다.');
      }
    } catch (err) {
      console.error("오류 발생:", err);
    }
  };

  useEffect(() => {
    getTasks(); 
  }, []);

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(event) => setTodoValue(event.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>
            추가
          </button>
        </Col>
      </Row>

      {loading ? (
        <LoadingSpinner /> 
      ) : (
        <TodoBoard
          todoList={todoList}
          completeTask={completeTask}
          deleteTask={deleteTask}
        />
      )}
    </Container>
  );
}

export default App;
