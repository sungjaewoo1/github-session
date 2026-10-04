import type { Filter } from "./types";

interface TodoFilterProps {
  filter: Filter;
  onChange: (filter: Filter) => void;
}

function TodoFilter({ filter, onChange }: TodoFilterProps) {
  return (
    <div>
      <button onClick={() => onChange("all")}>전체</button>
      <button onClick={() => onChange("active")}>진행중</button>
      <button onClick={() => onChange("done")}>완료</button>
      <span>현재 필터: {filter}</span>
    </div>
  );
}

export default TodoFilter;
