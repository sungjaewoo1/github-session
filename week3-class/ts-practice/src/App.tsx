import { useState } from "react";
import MovieCard from "./components/MovieCard";
import type { Genre, Movie } from "./types";

function App() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState<Genre>("action");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selected, setSelected] = useState<Movie | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.target.value as Genre);
  };

  const handleAdd = () => {
    if (title.trim() === "") return;
    setMovies([...movies, { id: Date.now(), title, genre }]);
    setTitle("");
  };

  const handleSelect = (id: number) => {
    const found = movies.find((movie) => movie.id === id);
    setSelected(found ?? null);
  };

  return (
    <div>
      <input value={title} onChange={handleChange} placeholder="영화 제목" />
      <select value={genre} onChange={handleGenreChange}>
        <option value="action">액션</option>
        <option value="comedy">코미디</option>
        <option value="drama">드라마</option>
      </select>
      <button onClick={handleAdd}>추가</button>

      <ul>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onSelect={handleSelect} />
        ))}
      </ul>

      {selected !== null && <p>선택: {selected.title}</p>}
    </div>
  );
}

export default App;