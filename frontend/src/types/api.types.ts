interface ApiResponse<T> {
  message?: string;
  data?: T;
  error?: string;
}

interface ApiError {
  message: string;
  error?: any;
}

export { type ApiResponse, type ApiError };
