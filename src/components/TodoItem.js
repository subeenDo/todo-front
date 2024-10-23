import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ item, deleteTask, completeTask }) => {
  const isComplete = item.isComplete;
  const backgroundColor = isComplete ?  '#7EADCF' : '#ffffff'; 
  const color = isComplete ?  '#ffffff':'#7EADCF'; 

  return (
    <Row>
      <Col xs={12}>
        <div className="todo-item" style={{ backgroundColor, color }}>
          <div className="todo-content">{item.task}  by {item.author ? item.author.name : 'Unknown'}</div>
          
          <div>
            <button
              className="button-delete"
              onClick={() => deleteTask(item._id)}
            >
              삭제
            </button>
            <button
              className="button-delete button-complete"
              onClick={() => completeTask(item._id)}
            >
              {isComplete ? `안끝남` : `끝남`}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
