import type { Movie } from "../types";

interface MovieCardProps {
  movie: Movie;
  onSelect: (id: number) => void;
}

function MovieCard({ movie, onSelect }: MovieCardProps) {
  return (
    <li onClick={() => onSelect(movie.id)}>
      {movie.title} ({movie.genre})
    </li>
  );
}

export default MovieCard;