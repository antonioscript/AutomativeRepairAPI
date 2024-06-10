# AutomativeRepairAPI
Desenvolvimento de uma API utilizando o framework Nest.JS para simular o sistema de gestão de uma oficina mecânica. A API será responsável por gerenciar clientes, funcionários, serviços oferecidos, agendamentos, estoque de peças e ferramentas, além de proporcionar funcionalidades de autenticação e autorização para diferentes tipos de usuários.

Para acompanhar as features e o andamento do projeto clique [aqui](https://github.com/users/antonioscript/projects/11?pane=info). <br>



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

# Sumário

# Índice de Conteúdos
- [Features](#features)
- [Arquitetura](#arquitetura)
  - [Intro](#subtópico-1)
  - [Banco de Dados]()
  - [Estrutura do Banco de Dados]()
- [Instruções de execução](#instruções-de-execução)

## Features {#features}





![Flow Chart1](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/d1a4fa2d-320b-4251-bf7e-18a42b572f4f)
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
A aplicação desse projeto é uma API Rest usando o framework Nest.JS, utilizando o banco de dados MySQL e Docker.

## Banco de Dados
O banco de dados escolhido para a aplicação foi o MySQL, por ser um dos bancos mais antigos do mercado e pela sua ampla utilização na indústria de software. 

## Abordagem Code First
Para construir a API foi utilizada a abordagem "Code First", onde o foco principal está na escrita do código-fonte para definir os modelos de dados e a lógicas de negócios. A principal vantagem dessa abordagem é a agilidade no desenvolvimento, já que as alterações nos modelos e da lógica podem ser refletidas diretamente no banco através das "migrations", que são scripts SQLs gerados através das alterações no modelo por meio do código. Além disso, qualquer pessoa que tenha em mãos o projeto consegue ter exatamente a mesma estrutura do banco e tem acesso a todas as modificaçõe, pois as migrations também servem como uma espécie de histórico das alterações do banco.

## Modelo do Banco de Dados
Atualmente esse é o modelo do banco de dados mais recente da aplicação:

![image](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/94da6bda-8469-4cd8-9c48-97f91afafe84)

Data da última atualização: *10/06/2024*

## Visualização da API
Para visualizar a API foi optado a utilização do Swagger, ferramenta que oferece uma interface intuitiva sem a necessidade de instalar ferramentas adicionais para testar e executar a aplicação. Além disso, ele simplifica o processo de documentação, gerando automaticamente a documentação a partir do código-fonte da aplicação. 

![image](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/373ec201-4dd4-4663-b51e-8d203ca0ae59)

Data da última atualização: *10/06/2024*

## ORM
Falar sobre o Prisma

## Arquitetura de Código
A arquitetura de código escolhida foi a arquitetura 'Clean Architecture', que é um tipo de arquitetura bastante moderna, que foi idealizada pelo Uncle Bob. O objetivo dessa arquitetura é promover a separação de preocupações e a manutenção da independência entre as diferentes camadas da aplicação, divindido-as entre: Domínio, Aplicação, Infraestrutura e Apresentação.

![image](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/ed9be3ea-e49b-437b-af77-a6349de80ec0)

No projeto a Clean Architecture foi adaptada dessa forma:

![image](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/d278f659-c3da-426c-8303-72109332fa84)

Onde podemos visualizar as camadas de domínio, aplicação, infraestrutura e apresentação. 

### Domain
Na cama de domínio, no centro da arquitetura, estão as entidades. As entidades representam os conceitos centrais da aplicação, é a unidade básica do sistema. 

![image](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/b5be471e-5a9d-41c5-9299-2f918185ba13)

Além das entidades, também temos o mapeamento dessas entidades, que consiste na transformação da entidade em uma resposta para o cliente. Isso é discutido melhor aqui:

### Infrastructure
Como o próprio nome já diz, na infraestrutura alocamos tudo aquilo que é essencial para a estrutura do sistema, como as configurações do banco, os módulos da aplicação, os repositórios e tudo aquilo que é compartilhado para toda a API.

![image](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/4c9e113c-5b98-40ed-874e-6030c992ec69)

### Application
Para a camada de aplicação estão as regras de negócio e tudo aquilo que é responsável para a lógica do sistema. Na cama de aplicação estão presentes os casos de uso (que são discutidos de forma mais ampla aqui), os handlers, os DTOs e  as regras de negócio chamadas de rules.

![image](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/346dd968-7f8e-42a6-bb5e-ef2065a2dabb)

### Presentation
E para a cama de apresentação, está presente tudo aquilo que faz a ligação dos dados entre servidor e cliente, que no caso da API, são os Controllers, responsáveis por forneceer os endpoints da aplicação.

![image](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/12de8853-48b1-42fa-9201-1a78f212eefd)

## Repository Pattern
Um dos Design Patterns utilizado na aplicação foi o Repository Pattern, que consiste em separar as camadas de acesso ados dados e a lógica de negócios, proporcionando uma abstração na fonte dos dados, fazendo que a camada da lógica de negócios seja independente das outras camadas.

Para o projeto em questão, foi utilizado uma classe abstrata, usando os conceitos de Generics. Onde essa classe consiste em abstrair métodos genéricos que serão utilizados por todas as entidades da API. Esses métodos consistem nas aplicações básicas como Create, Read, Update e Delete. 
``` Typescript
import { BaseEntity } from "src/core/domain/entities/base.entity";

export abstract class IGenericRepository<T extends BaseEntity> {

    abstract getAll(): Promise<T[]>;
    abstract getById(id: number): Promise<T>;
    abstract create(data: T): Promise<T>;
    abstract update(id: number, data: T): Promise<T>
    abstract delete(id: number): Promise<number>
}
```
<sub>*src\core\infrastructure\repositories\igeneric-repository.ts*. [Visualize aqui](https://github.com/antonioscript/AutomativeRepairAPI/blob/master/api/src/core/infrastructure/Repositories/igeneric-repository.ts)</sub>

O objetivo de se utilizar o Repository Pattern vai além do simples fato de reduzir a duplicidade de código, ele oculta os detalhes de como os dados são persistidos e recuperados, sem que a lógica de negócios conheça os detalhes da implementação, tornando assim o código mais flexível. 

Para a invocação do repositório, cada entidade herda as configurações da classe abstrata genérica. Que também é o lugar de criar um método específico daquela entidade em questão:

``` Typescript
import { IGenericRepository } from "../igeneric-repository";
import { VehicleEntity } from "src/core/domain/entities/vehicle.entity";

export abstract class VehicleRepository extends IGenericRepository<VehicleEntity> {}
```
<sub>*src\core\infrastructure\repositories\vehicle\vehicle.repository.ts*. [Visualize aqui](https://github.com/antonioscript/AutomativeRepairAPI/blob/master/api/src/core/infrastructure/Repositories/vehicle/vehicle.repository.ts)</sub>


E para a implementação, que é onde de fato ocorre a lógica de acesso ao banco de dados, foi criada uma outra classe com os detalhes dessa aplicação:

``` Typescript

export class VehiclePrismaRepository extends IGenericRepository<VehicleEntity> {
  
  constructor(private readonly prisma: PrismaService) {
    super()
  }
  
  async getAll(): Promise<VehicleEntity[]> {
        return await this.prisma.vehicle.findMany({
            include: {
                customer: true,
                vehicleType: true
            }
        });
    }
	
   async getById(id: number): Promise<VehicleEntity> {
        return await this.prisma.vehicle.findUnique({ 
            where: { 
                id 
            },
            include: {
                customer: true,
                vehicleType: true
            }
        })
        
    }
    
      async create(data: RequestVehicleDto): Promise<VehicleEntity> {
        return await this.prisma.vehicle.create({ 
            data,
            include: {
                customer: true,
                vehicleType: true
            }
        }) 
    }
    
      async update(id: number, data: UpdateVehicleDto): Promise<VehicleEntity> {
        return await this.prisma.vehicle.update({
          where: { id },
          data,
          include: {
              customer: true,
              vehicleType: true
          }
        })
    }
      

      async delete(id: number): Promise<number> {
        await this.prisma.vehicle.delete({ 
            where: { 
                id 
            } 
        });
        return id;
    }

}
```
<sub>*src\core\infrastructure\repositories\vehicle\vehicle.prisma.repository.ts*. [Visualize aqui](https://github.com/antonioscript/AutomativeRepairAPI/blob/master/api/src/core/infrastructure/Repositories/vehicle/vehicle.prisma.repository.ts)</sub>

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

