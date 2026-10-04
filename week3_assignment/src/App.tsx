import { useState } from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import TodoFilter from "./TodoFilter";
import type { Todo, Filter } from "./types";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now(), text, done: false }]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const visibleTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.done;
    if (filter === "done") return todo.done;
    return true;
  });

  const selectedTodo = todos.find((todo) => todo.id === selectedId);

  return (
    <div>
      <h1>할 일 목록</h1>
      <TodoInput onAdd={addTodo} />
      <TodoFilter filter={filter} onChange={setFilter} />
      <ul>
        {visibleTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onRemove={removeTodo}
            onSelect={setSelectedId}
          />
        ))}
      </ul>
      {selectedTodo !== undefined && (
        <p>선택한 할 일: {selectedTodo.text}</p>
      )}
    </div>
  );
}

export default App;
