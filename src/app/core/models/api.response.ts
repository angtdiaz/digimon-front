export interface ApiResponse<T> {
  results: T | T[];
  message: string;
}
