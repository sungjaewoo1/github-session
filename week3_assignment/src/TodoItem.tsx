import type { Todo } from "./types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
  onSelect: (id: number) => void;
}

function TodoItem({ todo, onToggle, onRemove, onSelect }: TodoItemProps) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <span onClick={() => onSelect(todo.id)}>{todo.text}</span>
      <button onClick={() => onRemove(todo.id)}>삭제</button>
    </li>
  );
}

export default TodoItem;
