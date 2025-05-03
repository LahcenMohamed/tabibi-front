export interface Result<T> {
  statusCode: number;     // This will be the numeric value of HttpStatusCode (e.g., 200, 400, 500)
  succeeded: boolean;
  message: string;
  error?: string | null;
  data?: T | null;
}
