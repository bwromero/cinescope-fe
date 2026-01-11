export interface Movie {
    id: number;
    title: string;
    overview: string;
    synopsis: string;
    posterPath: string;
    backdropPath: string;
    releaseDate: string;
    voteAverage: number;
    rating: number;
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