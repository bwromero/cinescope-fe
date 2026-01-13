export interface Movie {
  id: number;
  title: string;
  overview: string;
  synopsis: string;
  posterPath: string;
  backdropPath: string;      // ✅ Already have
  releaseDate: string;
  voteAverage: number;
  rating: number;
  voteCount: number;         // ✅ Add
  runtime: number;           // ✅ Add (in minutes)
  tagline: string;           // ✅ Add
  status: string;            // ✅ Add ("Released", "Post-Production", etc.)
  popularity: number;
  genreIds?: number[];
}
  
  export interface PageResponse<T> {
    page: number;
    totalPages: number;
    totalResults: number;
    results: T[];
  }
  
  export interface Genre {
    id: number;
    name: string;
  }