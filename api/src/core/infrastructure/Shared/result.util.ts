export interface Result<T> {
  data: T;
  failed: boolean; 
  error: string | null; 
  Success(): Result<T>;
  PaginationSuccess(pagination: any): Result<any>; // Modificamos o tipo de retorno para corresponder ao resultado da paginação
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
      // Aqui retornamos um novo objeto Result com os dados e as informações de paginação incluídas
      return result({ data, pagination });
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
      // Aqui retornamos um novo objeto Result com os dados e as informações de paginação incluídas
      return result({ data, pagination });
    },
    Fail(error: string) {
      return failureResult;
    }
  };

  return successResult;
}

