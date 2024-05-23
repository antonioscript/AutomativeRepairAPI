# AutomativeRepairAPI
Desenvolvimento de uma API utilizando o framework NestJS para simular o sistema de gestão de uma oficina mecânica. A API será responsável por gerenciar clientes, funcionários, serviços oferecidos, agendamentos, estoque de peças e ferramentas, além de proporcionar funcionalidades de autenticação e autorização para diferentes tipos de usuários.

Para acompanhar as features e o andamento do projeto clique [aqui](https://github.com/users/antonioscript/projects/11?pane=info).


# Brainstorm
## Funcionalidades
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
Exportar em PDF os detalhes do serviço, discriminando as peças que foram utilizadas e o valor total do serviço

### Enviar email para o cliente quando o serviço for finalizado (método)
Criar um agendamento de email para enviar para o cliente quando o serviço estiver finalizado

## Para outra versão do sistema
Acreedito que não dá tempo de fazer o que está logo abaixo, mas fica muito interessante para uma próxima versão da API

### Processo de Pagamentos (Microserviço)
Criar uma processamento de pagamentos em microservico e consequentemente mudar toda a arquitetura da aplicação para microserviço

### Culture para Tipo de Serviços
Incorporar o uso de idiomas nos serviços


# Arquitetura 
Descrever aqui depois a arquitetura do código, frameworks, banco, etc

## Visualização da API
Para visualizar a API eu optei por utilizar o Swagger, ferramenta para documentar APIs

## Abordagem Code First

## Arquitetura de Código
A arquiterua de código escolhida foi a arquitetura Clean Architecture
![image](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/ed9be3ea-e49b-437b-af77-a6349de80ec0)


## Banco de Dados
Mysql...

## ORM

## Repository Pattern
Optei por implementar o padrão Repository para separar as camadas de acesso aos dados e lógica de negócios. O padrão Repository proporciona uma abstração sobre a fonte de dados, permitindo que a lógica de negócios seja independente das outras camadas.

## Mapeamento de Entidades
Mapper
