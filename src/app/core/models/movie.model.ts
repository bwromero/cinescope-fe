export interface Movie {
    id: number;
    title: string;
    overview: string;
    posterPath: string;
    backdropPath: string;
    releaseDate: string;
    voteAverage: number;
    voteCount: number;
    popularity: number;
    genreIds: number[];
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