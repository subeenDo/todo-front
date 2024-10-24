import React from "react";
import TodoItem from "./TodoItem"

const TodoBoard = ({todoList, deleteItem, toggleComplete}) => {
  return (
    <div>
      <h2 className="todo-title">Todo List</h2>
      {todoList.length > 0 ? (
        todoList.map((item) => (
          <TodoItem 
            key={item._id}
            item={item} 
            completeTask={toggleComplete}
            deleteTask={deleteItem}
          />
        ))
      ) : (
        <h2>There is no Item to show</h2>
      )}
    </div>
  );
};

export default TodoBoard;