# AutomativeRepairAPI
Desenvolvimento de uma API utilizando o framework Nest.JS para simular o sistema de gestão de uma oficina mecânica. A API será responsável por gerenciar clientes, funcionários, serviços oferecidos, agendamentos, estoque de peças e ferramentas, além de proporcionar funcionalidades de autenticação e autorização para diferentes tipos de usuários.

Para acompanhar as features e o andamento do projeto clique [aqui](https://github.com/users/antonioscript/projects/11?pane=info). <br>
![Flow Chart](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/b260da1e-c2c6-4587-bd19-8897772d4fa4)

![Flow Chart1](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/d1a4fa2d-320b-4251-bf7e-18a42b572f4f)

</br></br><p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

# Funcionalidades
## Agendamento
O começo de todo serviço dentro da aplicação é criar primeiramente um agendamento. A Assistência Mecânica não pode iniciar qualquer tipo de atendimento sem um agendamento, que pode se encaixar am algum desses status:
- Agendado
- Confirmado
- Cancelado
- Concluído

## Vistoria
Após o agendamento acontece a vistoria, onde será informado o diagnóstico geral do veículo, o principal problema e os serviços que devem ser feitos, bem como o valor total do serviço. Caso o cliente esteja de acordo, então é gerado a ordem de serviço. 
Obs: Dentro de Vistoria acontece outros passos.

Regra: Toda Vistoria só deve ter no máximo 7 dias para o cliente dar resposta, caso contrário, deverá ser criada outra com atualização dos novos valores. 

## Ordem de Serviço 
A ordem de serviço gerada já será pré-preenchida com os serviços definidos na Vistoria. Caso precise de algo adicional além do orçado com o cliente (e que não foi capaz de enxergar na vistoria), é preciso gerar obrigatoriamente um aditivo (com a permissão do cliente).

## Aditivo de Serviço 
O Atitivo será apenas a inclusão de mais serviços, além do previsto junto com o cliente

## Sub-processos dentro de Vistoria

### Tipos de Serviços
A mecânica só realizará serviços que estão cadastrados de acordo com a capacidade da mecânica: Troca de Óleo, balanceamento, conserto de motor, troca de pneu etc. E na maioria dos serviços existe peças que serão utilizadas para esses tipos de serviços. Conserto de motor, por exemplo, precisa de bomba de água, correia dentada, vela de ingnição, etc.
Então para isso, existe também um cadastro de Tipo de Peças.

### Tipo de Peças
O cadastro de peças é simples, contendo informações do nome da peça, modelo, código do fornecedor,  e valor de cada peça para o cliente, etc. Para essa tabela, existe outra tabela que conterá a quantidade de peças para cada tipo de peças, entre outras informações.
Nesse cadastro o funcionário atualiza os valores das peças que serão cobradas pelo cliente

Regra: Se uma peça foi cobrada no momento do orçamento por 100 reais para um cliente específico e depois ela foi atualizada para um valor de 140 reais, por exemplo, o cliente deve pagar o valor que foi estabelecido no momento da vistoria e não o valor da peça atualizada. 

Regra: Para cada valor atualizado, deve-se criar uma tabela com as alterações, que seria o histórico de valores cadastrados e o tempo que esse valor foi utilizado. 

### Peças
Supondo que exista um tipo de peça que foi cadastrado como "Pneu Aro 15". Então na tabela de Peças deverá conter a quantidade de Peças com o tipo de Pneu Aro 15. Onde pode existir, por exemplo, 20 itens do tipo "Penu Aro 15" e cada item será cadastrado com as iformações de código de barras, código do fornecedor, etc. 

### Regra Vistoria
Tendo esse conceito, no momento de cadatrar a vistoria, irá puxar todas as peças disponíveis e verificar se existem essas peças. Caso não exista essas peças, ainda assim pode-se gerar um pedido de ordem de serviço, mas a ordem de serviço só deve ser iniciada quando chegar o abastecimento das peças. 

No momento que uma vistoria é criada, deve-se fazer a subtração das peças no banco de dados, bem como a quantidade disponível, controle de saldo, valor, etc. Caso uma vistoria não venha a se tornar uma ordem de serviço, as peças alocadas para a vistoria devem ficar disponíveis novamente no banco. 

# Outros Cadastros

### Veículos (Tabela de Veículos)
Serão todos os veículos que o cliente levou para oficina fazer um serviço. Um cliente pode ter vários veículos

### Clientes Cadastrados (Tabela de Clientes)
Para cada veículo cadastrado é obrgitatório ter um cliente que deve ser cadastrado na base de dados. E cada cliente deve ter veículos cadastrados em seu nome

### Mecânico Responsável pelo serviço (Tabela de Mecânicos)
Cada serviço terá também o ID do Mecânico
<br>Obs: Verificar se faz sentido ter uma lista no serviço para mais de um mecânico ou se apenas um mecânico basta
<br>Obs2: Verificar se faz sentido colocar uma especialização para o Mecânico (moto ou carro) e uma regra ao tentar cadastrar mecânicos em serviços que são de Carro, mas o mecânico tem apenas a especialização para carro. (Acho que não faz sentido agora)

### Histórico de Serviços (possivelmente um Método)
Método que irá filtrar todos os serviços por cliente ou por veículo. Ou pelos dois

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


## Segurança

### JWT Token

### Hash Senha
Para ocultar a senha no banco de dados, foi utilizado a biblioteca node chamada 'bcrypt', responsável por esconder informações sensíveis do usuário

[Imagem do Banco aqui com as senhas em formato de asterisco]

### CORS (Cross-origin Resource Sharing)
Foi utilizado o conceito de CORS para aumentar a segurança da aplicação utilizando dependências nativas do Nest.JS

### Limitação de Taxa 
Para limitar o tráfego da rede em uma possível massa de fluxo foi utilizado a biblioteca 'throttler'.
``` typescript
@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
```


No projeto em questão foi utilizado a configuração padrão que permite uma quantidade máxima de 10 solicitações em 60000 milissegundos



# Como Executar a Aplicação

## Prisma
No diretório do prisma, execute o seguinte código no terminal:

```bash
$ AutomativeRepairAPI\api\src\core\infrastructure\prisma> npx prisma generate

