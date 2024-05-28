export interface Result<T> {
    data: T;
    failed: boolean; 
    error: string | null; 
    Success(): Result<T>;
    Fail(error: string): Result<T>;
  }
  
  export function result<T>(data: T): Result<T> {
    const successResult: Result<T> = {
      data,
      failed: false,
      error: null,
      Success() {
        return successResult;
      },
      Fail(error: string) {
        return {
          data,
          failed: true,
          error,
          Success() {
            return successResult;
          },
          Fail(error: string) {
            return failureResult;
          }
        };
      }
    };
  
    const failureResult: Result<T> = {
      data,
      failed: true,
      error: null,
      Success() {
        return successResult;
      },
      Fail(error: string) {
        return failureResult;
      }
    };
  
    return successResult;
  }
  