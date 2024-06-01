export interface Result<T> {
  data: T;
  failed: boolean;
  error: string | null;
  Success(): Result<T>;
  PaginationSuccess(pagination: any): Result<any>; 
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
    PaginationSuccess(pagination) {
      return {
        data,
        pagination, 
        failed: false,
        error: null,
        Success() {
          return successResult;
        },
        PaginationSuccess(pagination) {
          return this.PaginationSuccess(pagination);
        },
        Fail(error: string) {
          return failureResult;
        }
      };
    },
    Fail(error: string) {
      return failureResult;
    }
  };

  const failureResult: Result<T> = {
    data,
    failed: true,
    error: null,
    Success() {
      return successResult;
    },
    PaginationSuccess(pagination) {
      return {
        data,
        pagination, 
        failed: true,
        error: null,
        Success() {
          return successResult;
        },
        PaginationSuccess(pagination) {
          return this.PaginationSuccess(pagination);
        },
        Fail(error: string) {
          return failureResult;
        }
      };
    },
    Fail(error: string) {
      return failureResult;
    }
  };

  return successResult;
}
