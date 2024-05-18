# AutomativeRepairAPI
Projeto de uma API em NestJS que simula uma oficina mecânica 

# Funcionalidades
### Agendamento de Serviços (Tabela de Agendamento)
A secretária ou mecânico poderá cadastrar um agendamento de serviço, que poderá ser de dois (ou três) tipos:

- Prospecção/Orçamento (descobrir nome melhor pra isso depois)
- Revisão 
- Reparos

Regras:
- Não pode cadastrar um serviço quando um mecânico já está alocado para um outro serviço

### Tipo de Serviço
Todo serviço deverá ter um tipo de serviço pré-cadastrado, como troca de óleo, troca de pneu, conserto de para-brisa, etc

### Clientes Cadastrados (Tabela de Clientes)
Para cada serviço é obrgitatório ter um cliente que deve ser cadastrado na base de dados. E cada cliente deve ter veículos cadastrados em seu nome

### Veículos (Tabela de Veículos)
Serão todos os veículos que o cliente levou para oficina fazer um serviço

### Mecânico Responsável pelo serviço (Tabela de Mecânicos)
Cada serviço terá também o ID do Mecânico
<br>Obs: Verificar se faz sentido ter uma lista no serviço para mais de um mecânico ou se apenas um mecânico basta
<br>Obs2: Verificar se faz sentido colocar uma especialização para o Mecânico (moto ou carro) e uma regra ao tentar cadastrar mecânicos em serviços que são de Carro, mas o mecânico tem apenas a especialização para carro. (Acho que não faz sentido agora)

### Histórico de Serviços (possivelmente um Método)
Método que irá filtrar todos os serviços por cliente ou por veículo. Ou pelos dois

### Gestão de Estoque (Tabela de Estoque)
Para cada serviço deve-se fazer um controle de saldo da quantidade de peças. 
Também deve ter um método para incluir a quantidade de peças e o valor comprado

### Atualização dos valores das peças (método)
Como no final de tudo terá um PDF que irá exportar o total do serviço, deve-se também ter um método para atulizar o valor das peças utilizas em serviço. 
Mas tem que ficar atento a regra, o cliente apenas pagará o valor na hora do contrato.

### Histórico de Atualização dos valores 
Criar uma tabela com o histórico de mudança dos valores

### Diagnóstico do Veículo
Obs: Verificar se faz sentido para essa primeira versão

Criar um PDF ou um método que passa o Id do serviço e taga todos os detalhes

### Valor total do Serviço (Exportar em PDF)

### Enviar email para o cliente quando o serviço for finalizado (método)

## Para Depois

### Processo de Pagamentos (Microserviço)

 - Verificar se faz sentido colocar uma especialização para o Mecânico (moto ou carro) e uma regra ao tentar cadastrar mecânicos em serviços que são de Carro, mas o mecânico tem apenas a especialização para carro. (Acho que não faz sentido agora).

### Culture para Tipo de Serviços



# Arquitetura 
