import { useState } from "react";
import type { ChangeEvent } from "react";

interface TodoInputProps {
  onAdd: (text: string) => void;
}

function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleClick = () => {
    if (text.trim() === "") return;
    onAdd(text);
    setText("");
  };

  return (
    <div>
      <input value={text} onChange={handleChange} placeholder="할 일 입력" />
      <button onClick={handleClick}>추가</button>
    </div>
  );
}

export default TodoInput;
