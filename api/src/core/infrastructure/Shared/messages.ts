export const messages= {
  CUSTOMER_ALREADY_EXISTS: (firstName: string, lastName: string, cpf: string) => `Já existe um cliente cadastrado com os dados: ${firstName} ${lastName}, CPF: ${cpf}`,
  CUSTOMER_NOT_FOUND: (id: number) => `Cliente de ID '${id}' não encontrado`,
  };
  