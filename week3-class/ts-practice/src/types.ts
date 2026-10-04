export type Genre = "action" | "comedy" | "drama";

export interface Movie {
  id: number;
  title: string;
  genre: Genre;
}