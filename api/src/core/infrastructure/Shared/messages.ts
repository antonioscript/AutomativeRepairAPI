export const messages= {
  DEFAULT_UPDATE_BAD_REQUEST:  `O ID passado como parâmetro é diferente do ID passado no corpo da solicitação`,

  USER_ALREADY_EXISTS: (email: string) => `Já existe um Usuário cadastrado com o email: '${email}'`,
  USER_NOT_FOUND: (id: number) => `Usuário de ID '${id}' não encontrado`,

  CUSTOMER_ALREADY_EXISTS: (firstName: string, lastName: string, cpf: string) => `Já existe um cliente cadastrado com os dados: ${firstName} ${lastName}, CPF: ${cpf}`,
  CUSTOMER_NOT_FOUND: (id: number) => `Cliente de ID '${id}' não encontrado`,

  VEHICLE_TYPE_ALREADY_EXISTS: (name: string) => `Já existe um Tipo de Veículo cadastrado com o nome: '${name}'`,
  VEHICLE_TYPE_NOT_FOUND: (id: number) => `Tipo de Veículo de ID '${id}' não encontrado`,

  VEHICLE_ALREADY_EXISTS: (plate: string) => `Já existe um Veículo cadastrado com a placa: '${plate}'`,
  VEHICLE_NOT_FOUND: (id: number) => `Veículo de ID '${id}' não encontrado`,
  };
  