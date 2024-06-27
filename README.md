# AutomativeRepairAPI
Desenvolvimento de uma API utilizando o framework Nest.JS para simular um sistema de gestão de uma oficina mecânica. A API será responsável por gerenciar clientes, funcionários, serviços oferecidos, agendamentos, estoque de peças e ferramentas, além de proporcionar funcionalidades de autenticação e autorização para diferentes tipos de usuários.

Acesse a aplicação clicando [aqui](https://antonio-rocha-automative-api.calmbay-9783cb9a.eastus.azurecontainerapps.io/api).

Para acompanhar as features e o andamento do projeto clique [aqui](https://github.com/users/antonioscript/projects/11?pane=info).


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


# Índice
- [Features](#features)
  - [Cadastro de Peças](#cadastro-de-peças)
  - [Cadastro de Serviço](#cadastro-de-serviço)
  - [Cadastro de Cliente](#cadastro-de-cliente)
  - [Agendamento](#agendamento)
  - [Cadastro de Veículo](#Cadastro-de-Veículo)
  - [Vistoria](#vistoria)
  - [Ordem de Serviço](#ordem-de-serviço)
  - [Aditivo de Serviço](#aditivo-de-serviço)
  - [Módulo de Autenticação](#módulo-de-autenticação)
 
- [Arquitetura](#arquitetura)
  - [Banco de dados](#banco-de-dados)
  - [Abordagem Code First](#abordagem-code-first)
  - [Modelo do Banco de Dados](#modelo-do-banco-de-dados)
  - [Visualização da API](#visualização-da-api)
  - [ORM](#orm)
  - [Arquitetura de Código](#arquitetura-de-código)
     - [Domain](#domain)
     - [Infrastructure](#infrastructure)
     - [Application](#application)
     - [Presentation](#presentation)
  - [Mapeamento de Entidades](#mapeamento-de-entidades)
  - [Máscaras de Validação](#máscaras-de-validação)
  - [Repository Pattern](#repository-pattern)
  - [CQRS (Command Query Responsibility Segregation)](#cqrs-command-query-responsibility-segregation)
  - [Centralização das Mensagens de Retorno](#centralização-das-mensagens-de-retorno)
  - [Método Paginado e Corpo de Resposta](#método-paginado-e-corpo-de-resposta)
  - [Segurança](#segurança)
     - [CORS (Cross-Origin Resource Sharing)](#cors-cross-origin-resource-sharing)
     - [Limitação de Taxa](#limitação-de-taxa)
     - [JWT Token](#jwt-token)
     - [Hash Senha](#hash-senha)

- [Como Executar a Aplicação](#Como-Executar-a-Aplicação)
  - [Acesse a API via URL](#Acesse-a-API-via-URL)
  - [Inicie um Container Docker](#Inicie-um-Container-Docker)
  - [Execute a API Localmente](#Execute-a-API-Localmente)    

# Features
A fim de facilitar o entendimento da aplicação, foi criado um diagrama mostrando o principal fluxo da API que será discutido posteriormente: 


</br>![AutomativeRepairAPI](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/9d95b812-79cd-4ae2-8a02-9c66f59badfc)

## Cadastro de Peças
Uma das elementos fundamentais do sistema são os serviços. Todo serviço obrigatoriamente é formado por um conjunto de peças ou itens mecânicos necessários para a realização daquele serviço: 

![image](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/bfa6889a-a33d-43eb-8c89-90f058566754)
<sub>GET - baseUrl/parts/paginated</sub>

No processo de cadastro de peças, são incluídos diversos campos essenciais, tais como o nome da peça, fornecedor, fabricante, código de barras e observações pertinentes. Além destes, há o campo de quantidade, indicando a disponibilidade da peça em estoque, e o campo de valor, representando o custo que será adicionado ao orçamento final do cliente.

## Cadastro de Serviço
Após o cadastro das peças, o próximo passo é o cadastro do serviço com as respectivas peças que fazem parte daquele serviço:

![image](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/52cf4873-ad2a-4d85-89c2-287b446b26b9)
<sub>POST - baseUrl/services</sub>

<b>Resposta JSON</b>
``` JSON
{
  "data": {
    "id": 21,
    "name": "Conserto de Motor Elétrico CA/CC",
    "value": 305,
    "observation": "Conserto geral de motor elétrico",
    "parts": [
      {
        "id": 21,
        "serviceId": 21,
        "partId": 12,
        "part": {
          "id": 12,
          "name": "Radiador de Água",
          "supplier": "Autopeças Ferreira",
          "manufacturer": "Valeo",
          "barcode": "2345678901234",
          "observation": "Radiador de água de alta qualidade, com tecnologia de dissipação térmica avançada para manter a temperatura do motor estável.",
          "quantity": 20,
          "value": 200
        }
      },
      {
        "id": 22,
        "serviceId": 21,
        "partId": 7,
        "part": {
          "id": 7,
          "name": "Correia Dentada",
          "supplier": "Autopeças Costa",
          "manufacturer": "Dayco",
          "barcode": "7890123456789",
          "observation": "Correia dentada de alto desempenho, resistente ao calor e à abrasão, garantindo sincronização precisa do motor.",
          "quantity": 20,
          "value": 80
        }
      },
      {
        "id": 23,
        "serviceId": 21,
        "partId": 4,
        "part": {
          "id": 4,
          "name": "Vela de Ignição",
          "supplier": "Autopeças Oliveira",
          "manufacturer": "NGK",
          "barcode": "4567890123456",
          "observation": "Vela de ignição de platina para motores a gasolina, garantindo uma centelha mais eficiente.",
          "quantity": 40,
          "value": 25
        }
      }
    ]
  },
  "failed": false,
  "error": null
}
```
Observe que o valor total do serviço é de R$ 305,00, resultante da soma dos custos individuais de todas as peças associadas a esse serviço (200, 80, 25), calculados automaticamente pela API.

## Cadastro de Cliente
No que diz respeito ao fluxo comercial,a primeira etapa é verificar se o cliente que requisita algum serviço está registrado no sistema. Se não estiver, é necessário criar um novo cliente utilizando o método POST de 'Customers':

![image](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/c1363589-c09e-40c8-b914-6399b71db35c)
<sub>POST - baseUrl/customers</sub>

A feature também conta com algumas validações adicionais, como o formato do CPF, por exemplo.

![image](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/5ddc3685-2427-4e82-9408-94df7dc08029)
<sub>POST - baseUrl/customers</sub>

## Agendamento
Após o cadastro de um cliente, o primeiro procedimento para qualquer serviço dentro da aplicação é a criação de um agendamento. A Assistência Mecânica não pode iniciar nenhum tipo de atendimento sem um agendamento prévio. Um agendamento pode apresentar os seguintes status:

- Agendado
- Confirmado
- Cancelado
- Concluído
Por padrão, ao ser criado, um agendamento é automaticamente atribuído ao status 'Agendado'.

![image](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/68936320-9095-4ba2-bf7e-80362f22924b)
<sub>POST - baseUrl/appointments</sub>

## Cadastro de Veículo
Antes de iniciar uma vistoria, é necessário cadastrar o veículo do cliente que agendou o serviço, caso o veículo ainda não esteja registrado no sistema.

![image](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/a70272aa-d8c2-4501-a812-97b07e654c22)
<sub>POST - baseUrl/vehicles</sub>


## Vistoria
Após o agendamento, ocorre a vistoria, na qual será fornecido um diagnóstico geral do veículo, identificando o problema principal, os serviços a serem realizados, assim como o valor total do serviço e das peças necessárias.

Por exemplo, suponha que na vistoria seja detectado um problema no motor, exigindo os seguintes serviços: <b>Conserto de Motor</b> e <b>Troca de Pneu</b>:

![image](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/601de582-d8ad-4a35-a339-b44ae41dd47a)

<b>Resposta JSON</b>
``` JSON
{
  "data": {
    "id": 16,
    "appointmentId": 15,
    "vehicleId": 29,
    "vehicle": {
      "id": 29,
      "customerId": 103,
      "vehicleTypeId": 1,
      "plate": "JMN1B50",
      "brand": "Volkswagen",
      "model": "T-Cross",
      "year": 2023
    },
    "inspectionDate": "2024-06-10T23:30:06.247Z",
    "hasServiceOrder": false,
    "value": 925,
    "services": [
      {
        "id": 16,
        "inspectionId": 16,
        "serviceId": 22,
        "service": {
          "id": 22,
          "name": "Troca de Peneu Aro 16",
          "value": 435,
          "observation": "Serviço de troca de peneu do tipo Aro 16",
          "parts": [
            {
              "id": 24,
              "serviceId": 22,
              "partId": 31,
              "part": {
                "id": 31,
                "name": "Pneu Aro 16",
                "supplier": "Michelin",
                "manufacturer": "Michelin",
                "barcode": "3456782012345",
                "observation": "Peneu Aro 16",
                "quantity": 11,
                "value": 435
              }
            }
          ]
        }
      },
      {
        "id": 17,
        "inspectionId": 16,
        "serviceId": 21,
        "service": {
          "id": 21,
          "name": "Conserto de Motor Elétrico CA/CC",
          "value": 305,
          "observation": "Conserto geral de motor elétrico",
          "parts": [
            {
              "id": 21,
              "serviceId": 21,
              "partId": 12,
              "part": {
                "id": 12,
                "name": "Radiador de Água",
                "supplier": "Autopeças Ferreira",
                "manufacturer": "Valeo",
                "barcode": "2345678901234",
                "observation": "Radiador de água de alta qualidade, com tecnologia de dissipação térmica avançada para manter a temperatura do motor estável.",
                "quantity": 20,
                "value": 200
              }
            },
            {
              "id": 22,
              "serviceId": 21,
              "partId": 7,
              "part": {
                "id": 7,
                "name": "Correia Dentada",
                "supplier": "Autopeças Costa",
                "manufacturer": "Dayco",
                "barcode": "7890123456789",
                "observation": "Correia dentada de alto desempenho, resistente ao calor e à abrasão, garantindo sincronização precisa do motor.",
                "quantity": 20,
                "value": 80
              }
            },
            {
              "id": 23,
              "serviceId": 21,
              "partId": 4,
              "part": {
                "id": 4,
                "name": "Vela de Ignição",
                "supplier": "Autopeças Oliveira",
                "manufacturer": "NGK",
                "barcode": "4567890123456",
                "observation": "Vela de ignição de platina para motores a gasolina, garantindo uma centelha mais eficiente.",
                "quantity": 40,
                "value": 25
              }
            }
          ]
        }
      }
    ]
  },
  "failed": false,
  "error": null
}
```
Perceba que o valor total estimado na vistoria, R$ 925,00, é a soma de todos os serviços solicitados pelo cliente, acrescido de um adicional de 25% de taxa de serviço, conforme a regra da mecânica. O serviço de troca de pneu custa R$ 435,00, e o conserto do motor R$ 305,00, totalizando R$ 740,00. Ao subtrair 25% do valor total dos serviços, resulta em R$ 185,00, que, somado ao valor dos serviços, totaliza R$ 925,00. Todo esse cálculo é realizado automaticamente pela API.

Além do valor, existe uma flag denominada 'hasServiceOrder', indicando se a vistoria criada possui uma Ordem de Serviço.

Dentro do processo de vistoria, há alguns procedimentos e regras a serem seguidos:

- Ao criar uma vistoria, o status do agendamento é alterado para 'Concluído';
- Toda vistoria deve ter um prazo máximo de 7 dias para que o cliente responda se deseja prosseguir com o serviço. Após esse período, a vistoria perde sua validade, e uma nova deve ser criada com a atualização dos valores;
- No momento do cadastro da vistoria, a API consulta todas as peças disponíveis e verifica se há aquelas necessárias para os serviços selecionados. Se não houver, mesmo assim é possível gerar uma Ordem de Serviço, porém esta só deve ser iniciada quando as peças estiverem disponíveis;
- Ao criar uma vistoria, as peças necessárias são subtraídas do banco de dados, incluindo a atualização da quantidade disponível, controle de saldo e valor. Caso uma vistoria não se torne uma Ordem de Serviço, as peças alocadas para ela devem ser disponibilizadas novamente no banco de dados.

## Ordem de Serviço
Se o cliente estiver de acordo com os valores do orçamento e os serviços a serem prestados, é iniciada uma Ordem de Serviço para dar início aos procedimentos de reparo do veículo.

A ordem de serviço gerada já estará pré-preenchida com os serviços definidos na vistoria. Caso seja necessário qualquer serviço adicional além do orçado com o cliente (e que não tenha sido identificado durante a vistoria), é obrigatório gerar um aditivo (com a permissão do cliente).

![image](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/deacd8f9-9bb0-4181-8e33-917a5fec91a4)

<b>Resposta JSON</b>
``` JSON
{
  "data": [
    {
      "id": 16,
      "appointmentId": 15,
      "vehicleId": 29,
      "vehicle": {
        "id": 29,
        "customerId": 103,
        "vehicleTypeId": 1,
        "plate": "JMN1B50",
        "brand": "Volkswagen",
        "model": "T-Cross",
        "year": 2023
      },
      "inspectionDate": "2024-06-10T23:30:06.247Z",
      "hasServiceOrder": true,
      "value": 925,
      "services": [
        {
          "id": 16,
          "inspectionId": 16,
          "serviceId": 22,
          "service": {
            "id": 22,
            "name": "Troca de Peneu Aro 16",
            "value": 435,
            "observation": "Serviço de troca de peneu do tipo Aro 16",
            "parts": [
              {
                "id": 24,
                "serviceId": 22,
                "partId": 31,
                "part": {
                  "id": 31,
                  "name": "Pneu Aro 16",
                  "supplier": "Michelin",
                  "manufacturer": "Michelin",
                  "barcode": "3456782012345",
                  "observation": "Peneu Aro 16",
                  "quantity": 11,
                  "value": 435
                }
              }
            ]
          }
        },
        {
          "id": 17,
          "inspectionId": 16,
          "serviceId": 21,
          "service": {
            "id": 21,
            "name": "Conserto de Motor Elétrico CA/CC",
            "value": 305,
            "observation": "Conserto geral de motor elétrico",
            "parts": [
              {
                "id": 21,
                "serviceId": 21,
                "partId": 12,
                "part": {
                  "id": 12,
                  "name": "Radiador de Água",
                  "supplier": "Autopeças Ferreira",
                  "manufacturer": "Valeo",
                  "barcode": "2345678901234",
                  "observation": "Radiador de água de alta qualidade, com tecnologia de dissipação térmica avançada para manter a temperatura do motor estável.",
                  "quantity": 20,
                  "value": 200
                }
              },
              {
                "id": 22,
                "serviceId": 21,
                "partId": 7,
                "part": {
                  "id": 7,
                  "name": "Correia Dentada",
                  "supplier": "Autopeças Costa",
                  "manufacturer": "Dayco",
                  "barcode": "7890123456789",
                  "observation": "Correia dentada de alto desempenho, resistente ao calor e à abrasão, garantindo sincronização precisa do motor.",
                  "quantity": 20,
                  "value": 80
                }
              },
              {
                "id": 23,
                "serviceId": 21,
                "partId": 4,
                "part": {
                  "id": 4,
                  "name": "Vela de Ignição",
                  "supplier": "Autopeças Oliveira",
                  "manufacturer": "NGK",
                  "barcode": "4567890123456",
                  "observation": "Vela de ignição de platina para motores a gasolina, garantindo uma centelha mais eficiente.",
                  "quantity": 40,
                  "value": 25
                }
              }
            ]
          }
        }
      ]
    }
  ],
  "failed": false,
  "error": null
}
```

## Aditivo de Serviço 
Uma regra adicional da mecânica estipula que para qualquer serviço adicional não previsto na vistoria, é necessário criar um aditivo de serviço. Atualmente, essa funcionalidade ainda está em desenvolvimento.

## Módulo de Autenticação
O módulo de autenticação consiste em um token que é gerado através de um login ou registro e com esse token o usuário consegue acessar os endpoints. 

![image](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/ea2bf162-7237-4b99-80e7-d4a1e1dc52c0)

Atualmente todos os endpoints estão livres de autenticação por conta de testes, mas a medida que novos módulos como cadastro de funcionários, mecãnicos, ele será totalmente implementado com o uso de regras de acesso.


# Arquitetura 
A arquitetura deste projeto consiste em uma API Rest desenvolvida com o framework Nest.JS, utilizando o banco de dados MySQL e Docker para facilitar a implantação e o gerenciamento de contêineres.

## Banco de Dados
O banco de dados escolhido para a aplicação foi o MySQL, por ser um dos bancos mais antigos do mercado e pela sua ampla utilização na indústria de software. 

## Abordagem Code First
Para desenvolver a API, foi adotada a abordagem "Code First", que se concentra na escrita do código-fonte para definir os modelos de dados e a lógica de negócios. A principal vantagem dessa abordagem é a agilidade no desenvolvimento, pois as alterações nos modelos e na lógica podem ser refletidas diretamente no banco de dados por meio das "migrations", que são scripts SQL gerados a partir das alterações no modelo via código.

Além disso, qualquer pessoa que tenha acesso ao projeto pode reproduzir exatamente a mesma estrutura do banco de dados e ter acesso a todas as modificações, pois as migrations também servem como um histórico das alterações no banco.

## Modelo do Banco de Dados
Atualmente esse é o modelo do banco de dados mais recente da aplicação:

![image](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/94da6bda-8469-4cd8-9c48-97f91afafe84)
<sub>Data da última atualização: *10/06/2024*</sub>

Nele podemos ver relações do tipo 'One-to-Many' e 'Many-to-many'.

## Visualização da API
Para visualizar a API, foi escolhida a utilização do Swagger, uma ferramenta que oferece uma interface intuitiva sem a necessidade de instalar ferramentas adicionais para testar e executar a aplicação. Além disso, o Swagger simplifica o processo de documentação, gerando automaticamente a documentação a partir do código-fonte da aplicação.

![image](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/373ec201-4dd4-4663-b51e-8d203ca0ae59)

<sub>Data da última atualização: *10/06/2024*</sub>

## ORM
Para fazer a comunicação da aplicação com o banco de dados, o framework escolhido foi o Prisma. O critério de escolha se deu pelo fato do prisma ser um ORM moderno, por ter uma comunidade muito grande no Github e pela forma como ele escala rapidamente a aplicação, sem a necessidade de ajustes adicionais, utilizando o conceito de migrations. 

Além disso, o Prisma oferece uma ferramenta de UI chamada Prisma Database, que permite visualizar os dados no banco de dados sem a necessidade de instalar uma ferramenta adicional.

## Arquitetura de Código
A arquitetura de código escolhida foi a arquitetura 'Clean Architecture', que é um tipo de arquitetura bastante moderna, que foi idealizada pelo Uncle Bob. O objetivo dessa arquitetura é promover a separação de preocupações e a manutenção da independência entre as diferentes camadas da aplicação, divindido-as entre: Domínio, Aplicação, Infraestrutura e Apresentação.

![image](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/ed9be3ea-e49b-437b-af77-a6349de80ec0)

No projeto a Clean Architecture foi adaptada dessa forma:

![image](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/d278f659-c3da-426c-8303-72109332fa84)

Onde podemos visualizar as camadas de domínio, aplicação, infraestrutura e apresentação. 

### Domain
Na cama de domínio, no centro da arquitetura, estão as entidades. As entidades representam os conceitos centrais da aplicação, é a unidade básica do sistema. 

![image](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/b5be471e-5a9d-41c5-9299-2f918185ba13)

Além das entidades, também temos o mapeamento dessas entidades, que consiste na transformação da entidade em uma resposta para o cliente. Isso é discutido melhor [aqui](#Mapeamento-de-Entidades).

### Infrastructure
Como o próprio nome já diz, na infraestrutura alocamos tudo aquilo que é essencial para a estrutura do sistema, como as configurações do banco, os módulos da aplicação, os repositórios e tudo aquilo que é compartilhado para toda a API.

![image](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/4c9e113c-5b98-40ed-874e-6030c992ec69)

### Application
Para a camada de aplicação estão as regras de negócio e tudo aquilo que é responsável para a lógica do sistema. Na cama de aplicação estão presentes os casos de uso (que são discutidos de forma mais ampla [aqui](#CQRS (Command-Query-Responsibility-Segregation))), os handlers, os DTOs e  as regras de negócio chamadas de rules.

![image](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/346dd968-7f8e-42a6-bb5e-ef2065a2dabb)

### Presentation
E para a cama de apresentação, está presente tudo aquilo que faz a ligação dos dados entre servidor e cliente, que no caso da API, são os Controllers, responsáveis por forneceer os endpoints da aplicação.

![image](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/12de8853-48b1-42fa-9201-1a78f212eefd)

### Mapeamento de Entidades
Para que os dados sensíveis da aplicação não fiquem visíveis para o cliente, utilizou-se uma técnica simples de mapeamento de entidades em associação com os DTOs, que são classes usadas para transportar dados entre processos, entre a camada de apresentação e a camada de serviço da API, encapsulando os dados e protegendo as informações confidenciais no momento da transferência dessas informações.

``` Typescript
import { Mapper } from "../mapper"

export class ResponseVehicleMapper extends Mapper<ResponseVehicleDto, VehicleEntity> {
  public mapFrom(data: ResponseVehicleDto): VehicleEntity {
    const vehicle = new VehicleEntity()

    vehicle.id = data.id
    vehicle.plate = data.plate

    vehicle.customerId = data.customerId
    vehicle.customer = data.customer

    vehicle.vehicleTypeId = data.vehicleTypeId
    vehicle.vehicleType = data.vehicleType

    vehicle.brand = data.brand
    vehicle.model = data.model
    vehicle.year = data.year

    return vehicle
  }

  public mapTo(data: VehicleEntity): ResponseVehicleDto {
    const vehicle = new ResponseVehicleDto()

    vehicle.id = data.id
    vehicle.plate = data.plate

    vehicle.customerId = data.customerId
    vehicle.customer = data.customer

    vehicle.vehicleTypeId = data.vehicleTypeId
    vehicle.vehicleType = data.vehicleType

    vehicle.brand = data.brand
    vehicle.model = data.model
    vehicle.year = data.year
    
    return vehicle
  }
}
```
<sub>*src\core\domain\mapping\vehicle\response-vehicle.mapper.ts*. [Visualize aqui](https://github.com/antonioscript/AutomativeRepairAPI/blob/master/api/src/core/domain/mapping/vehicle/response-vehicle.mapper.ts)</sub>

## Máscaras de Validação
Além do mapeamento de entidades, para os DTOs do tipo 'Request', que são aqueles responsáveis por fazer a mediação das solicitações de escrita, utilizou-se uma bilbioteca nativa do Nest.JS chamada 'class-validator', responsável por facilitar a validação de dados sem a necessidade de funções adicionais.

``` Typescript
export class RequestVehicleDto {

    id?: number

    @ApiProperty()
    @IsInt()
    customerId: number

    @ApiProperty()
    @IsString()
    @Matches(constants.REGEX_PLATE, {message: messages.PLATE_TYPE})
    plate: string

    @ApiProperty()
    @IsInt()
    vehicleTypeId: number;

    @ApiProperty({required: false})
    @IsString()
    brand?: string

    @ApiProperty({required: false})
    @IsString()
    model?: string

    @ApiProperty({required: false})
    @IsInt()
    year?: number
}
```
<sub>*src\core\application\dtos\vehicle\request-vehicle.dto.ts*. [Visualize aqui](https://github.com/antonioscript/AutomativeRepairAPI/blob/master/api/src/core/application/dtos/vehicle/request-vehicle.dto.ts)</sub>

Além do uso nativo dessas validações em relação as propriedades, também foi utilizado o uso de Regex para validação, por exemplo, de placas de veículos no formato Mercosul e formato de CPF:

``` Typescript
export const constants = {
  PAGE_DEFAULT:  1,
  PAGE_SIZE_DEFAULT: 10,
  APPOINTMENT_STATUS_DEFAULT: 1,
  PERCENTAGE_DEFAULT_SERVICE: 0.25,
  REGEX_CPF: /^\d{3}-\d{3}-\d{4}-\d{2}$/,
  REGEX_PLATE: /^[A-Z]{3}-\d{4}$|^[A-Z]{3}[0-9][A-Z][0-9]{2}$/,
  };
```
<sub>*src\core\infrastructure\shared\constants.ts*. [Visualize aqui](https://github.com/antonioscript/AutomativeRepairAPI/blob/master/api/src/core/infrastructure/Shared/constants.ts)</sub>

Os detalhes dos caracteres usados na expressão regular estão dentro de uma arquivo chamado 'constants' onde reúne todas as constantes que podem ser reaproveitadas na aplicação, evitando assim duplicidade de código.

## Repository Pattern
Um dos Design Patterns utilizado na aplicação foi o Repository Pattern, que consiste em separar as camadas de acesso dos dados e a lógica de negócios, proporcionando uma abstração na fonte dos dados, fazendo que a camada da lógica de negócios seja independente das outras camadas.

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

Para a invocação do repositório, cada entidade herda as configurações da classe abstrata genérica, que também é o lugar de criar algum método específico daquela entidade em questão:

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

## CQRS (Command Query Responsibility Segregation)
Um outro padrão de arquitetura utilizado foi o CQRS, que consiste em separar as interações com o banco de dados em operações de leitura e escrita, os chamados 'commands' e 'queries'. 

![image](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/2ca4dbbd-2887-41b1-af11-09e1ff0c7aa5)



Por padrão, o Nest.JS coloca toda as invocações do banco em uma única classe, na qual recebe o nome de 'services'. Essa mesma classe além de reunir todas as operações ao banco em um único local, faz isso também de forma direta, sem nenhum meio de transporte que possa desaclopar esse acesso. 

No entanto, o padão CQRS é mais recomendado em APIs robustas e de grande porte, como podemos ver na própria documentação do Nest:
> "Embora esse padrão geralmente seja suficiente para aplicações de pequeno e médio porte (modelo tradicional), pode não ser a melhor escolha para aplicações maiores e mais complexas. Nesses casos, o modelo CQRS (Command and Query Responsibility Segregation) pode ser mais apropriado e escalável (dependendo dos requisitos da aplicação)."
> — *[Nest.JS Documentation](https://docs.nestjs.com/recipes/cqrs)*

Por mais que o projeto em questão seja uma API de pequeno porte, a escolha em utilizar esse padrão foi simplesmente para experimentar e simular como funcionaria a arquitetura do Nest.JS em relação a grandes solicitações e acessos por parte da API. 

Na aplicação, os commands e queries foram alocados na camada de aplicação, no diretório de casos de uso, que são as lógicas de negócios da API. Para operações de escrita os métodos foram organizados em commands e os métodos de leitura em queries:

![image](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/42eefbda-306e-4a24-b49f-1cbce76a47c1)

Todos os métodos, seja de escrita ou de leitura, devem fazer parte de uma única classe, para evitar um acoplamento desnecessário. Logo abaixo há um exemplo de um método de escrita, nesse caso um create, responsável por criar um novo cliente no banco:

``` Typescript
export class CreateCustomerCommand {
  constructor(public readonly request: RequestCustomerDto) {}
}

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler implements ICommandHandler<CreateCustomerCommand, Result<ResponseCustomerDto>> {
  private requestMapper: RequestCustomerMapper
  private responseMapper: ResponseCustomerMapper

  constructor(private readonly repository: CustomerRepository) {
    this.requestMapper = new RequestCustomerMapper()
    this.responseMapper = new ResponseCustomerMapper()
  }

  async execute(command: CreateCustomerCommand): Promise<Result<ResponseCustomerDto>> {
  
    const registerCPFExists = await this.repository.getFirstByParameters({
      cpf: command.request.cpf,
    });

    if (registerCPFExists)
      throw new BadRequestException(messages.CUSTOMER_CPF_ALREADY_EXISTS(command.request.cpf));

    const entity = this.requestMapper.mapFrom(command.request);
    const responseEntity = await this.repository.create(entity);
    const responseData = this.responseMapper.mapTo(responseEntity);
    
    return result(responseData).Success();
  }
}
```
<sub>*src\core\application\use-cases\custumer\commands\create-customer.command.ts*. [Visualize aqui](https://github.com/antonioscript/AutomativeRepairAPI/blob/master/api/src/core/application/use-cases/custumer/commands/create-customer.command.ts)</sub>
<br>
<br>
<br>
E logo abaixo um exemplo de uma query, que é um consulta que retorna um cliente a partir de um ID especificado:

``` Typescript
export class GetOneCustomerQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetOneCustomerQuery)
export class GetOneCustomerHandler implements IQueryHandler<GetOneCustomerQuery, Result<ResponseCustomerDto>> {
  private responseMapper: ResponseCustomerMapper
  constructor ( private readonly repository: CustomerRepository) {
    this.responseMapper = new ResponseCustomerMapper()
  }
  
  
  async execute(query: GetOneCustomerQuery): Promise<Result<ResponseCustomerDto>> {
    const register = await this.repository.getById(query.id);

    if (!register)
      throw new NotFoundException(messages.CUSTOMER_NOT_FOUND(query.id))

    const responseData = this.responseMapper.mapTo(register);

    return result(responseData).Success();
  }
  
}
```
<sub>*src\core\application\use-cases\custumer\queries\get-one-customer.query.ts*. [Visualize aqui](https://github.com/antonioscript/AutomativeRepairAPI/blob/master/api/src/core/application/use-cases/custumer/queries/get-one-customer.query.ts)</sub>

Tanto os commands, quanto as queries possuem um decorator padrão (@CommandHandler e @QueryHandler) que são responsáveis por marcar aquela classe como um comando de escrita e leitura, que depois será importado em algum módulo. 

Com a utilização do CQRS o Controller fica muito mais limpo e legível, sem a necessidade de quaquer linha adicional de código, uma vez que a lógica da aplicação não se encontra mais no Controller, que fica apenas responsável por ser uma meio necessário para se chegar até os comandos da aplicação. Com isso também ocultamos da camada de apresentação quais são os repositórios ou métodos responsáveis pelo acesso ao banco de dados, tornando nosso construtor limpo de qualquer refeência de repositório, tendo apenas as depedências padrão do CQRS, o CommandBus e QueryBus que chamam os métodos específicos:

``` Typescript

@Controller('customers')
@ApiTags('customers')
export class CustomersController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}
  
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const numberId = Number(id);
    return this.queryBus.execute(new GetOneCustomerQuery(numberId));
  }

  @Get()
  async findAll() {
    return this.queryBus.execute(new GetAllCustomersQuery());
  }

  @Post()
  async create(@Body() request: RequestCustomerDto) {
    return await this.commandBus.execute(new CreateCustomerCommand(request));
  }


  @Put(':id')
  async update(@Param('id') id: number, @Body() request: UpdateCustomerDto) {
    const numberId = Number(id);
    return await this.commandBus.execute(new UpdateCustomerCommand(numberId, request));
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const numberId = Number(id);
    return await this.commandBus.execute(new DeleteCustomerCommand(numberId))
  }
  
  @Get('paginated')
  @ApiPaginatedQuery()
  async findPaginated(@Query('page') page?: number, @Query('pageSize') pageSize?: number) {
    return await this.queryBus.execute(new GetPagedCustomersQuery(Number(page), Number(pageSize)));
  }

}
```
<sub>*src\core\presentation\controllers\customers.controller.ts*. [Visualize aqui](https://github.com/antonioscript/AutomativeRepairAPI/blob/master/api/src/core/presentation/controllers/customers.controller.ts)</sub>

## Centralização das Mensagens de Retorno
Todas as mensagens de retorno da API, sejam de erros, validações ou mensagens de sucesso, se concentram em um único lugar, a fim de evitar essas escritas dentro dos casos de uso, ocasionando assim uma escrita 'hard-code'. Dessa forma conseguimos reaproveitar as mensagens e caso necessite de modificação, podemos simplismente modificar a mensagem em um único local para refletir a mudança para toda a aplicação. Além disso, a organização centralizada simplifica a manutenção do código, pois as alterações necessárias podem ser feitas de maneira global.

``` Typescript

export const messages= {
  DEFAULT_UPDATE_BAD_REQUEST:  `O ID passado como parâmetro é diferente do ID passado no corpo da solicitação.`,

  USER_UNAUTHENTICATED:`Você não está autenticado. Por gentileza, faça o login ou se cadastre.`,
  USER_UNAUTHORIZED:`E-mail e/ou senha incorretos.`,

  CPF_TYPE: `CPF deve conter apenas números na seguinte forma: XXX-XXX-XXXX-XX`,
  PLATE_TYPE: `O modelo de placa deve estar noo novo formato padrão Mercosul ABC1D23`,

  USER_ALREADY_EXISTS: (email: string) => `Já existe um Usuário cadastrado com o email: '${email}'.`,
  USER_NOT_FOUND: (id: number) => `Usuário de ID '${id}' não encontrado.`,

  CUSTOMER_NAME_ALREADY_EXISTS: (firstName: string, lastName: string) => `Já existe um cliente cadastrado com o nome: ${firstName} ${lastName}.`,
  CUSTOMER_CPF_ALREADY_EXISTS: (cpf: string) => `Já existe um cliente cadastrado com CPF '${cpf}'.`,
  CUSTOMER_NOT_FOUND: (id: number) => `Cliente de ID '${id}' não encontrado.`,

  VEHICLE_TYPE_ALREADY_EXISTS: (name: string) => `Já existe um Tipo de Veículo cadastrado com o nome: '${name}'.`,
  VEHICLE_TYPE_NOT_FOUND: (id: number) => `Tipo de Veículo de ID '${id}' não encontrado.`,

  //.....
  };
  
```
<sub>*src\core\infrastructure\shared\messages.ts*. [Visualize aqui](https://github.com/antonioscript/AutomativeRepairAPI/blob/master/api/src/core/infrastructure/Shared/messages.ts)</sub>




## Método Paginado e Corpo de Resposta
O tipo do corpo de resposta padrão utilizado na API é o JSON, encapsulado através de uma propriedade 'data', que contém toda a resposta da solicitação, assim como duas propriedades adicionais. A primeira dela é 'failed', que pode ser true ou false dependendo da resposta e 'error' que mostra o erro caso aconteça alguma falha. Isso proporciona uma estrutura consistente para os dados retornados, facilitando o processamento por parte dos consumidores da API:

``` JSON
{
  "data": {
    "id": 1,
    "name": "Óleo Lubrificante Sintético",
    "supplier": "Autopeças Machado",
    "manufacturer": "Bosch",
    "barcode": "1234567890123",
    "observation": "Óleo lubrificante sintético de alta performance para motores à gasolina.",
    "quantity": 20,
    "value": 38
  },
  "failed": false,
  "error": null
}
```

Já para o método de GET da forma paginado, além das propriedades padrão, o mesmo conta também com algumas propriedades únicas encapsuladas dentro do objeto 'pagination':
``` JSON
{
  "data": [
    {
      "id": 1,
      "name": "Carro"
    },
    {
      "id": 2,
      "name": "Moto"
    }
  ],
  "pagination": {
    "total": 2,
    "lastPage": 1,
    "currentPage": 1,
    "perPage": 10,
    "prev": null,
    "next": null
  },
  "failed": false,
  "error": null
}
```
Entre elas:
- <b>total</b>: quantidade total de registros;
- <b>lastPage</b>: última página;
- <b>currentPage</b>: página atual;
- <b>perPage</b>: quantidade de registros por página;
- <b>prev</b>: página anterior;
- <b>next</b>: próxima página.

## Segurança


### CORS (Cross-origin Resource Sharing)
Foi utilizado o conceito de CORS para aumentar a segurança da aplicação utilizando dependências nativas do Nest.JS. Essa abordagem ajuda a proteger a aplicação contra solicitações maliciosas vindas de domínios não autorizados, garantindo assim a integridade e segurança dos dados manipulados pela aplicação. 

Como projeto de teste, na API todos os domínios estão sendo autorizados. 

### Limitação de Taxa 
Uma boa estratégia aliada na segurança junto com o CORS é a utilização da limitação da taxa de acesso, para controlar o tráfego da rede e evitar sobrecargas no servidor, garantindo uma boa experiência aos consumidores da API. 

Para limitar o tráfego da rede em uma possível massa de fluxo foi utilizado a biblioteca 'throttler', que é uma biblioteca padrão do Nest.JS. 

``` typescript
@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
```
<sub>*src\app.module.ts*. [Visualize aqui](https://github.com/antonioscript/AutomativeRepairAPI/blob/master/api/src/app.module.ts)</sub>

No projeto em questão foi utilizado a configuração padrão que permite uma quantidade máxima de 10 solicitações em 60000 milissegundos

### JWT Token
Para autenticação e autorização da API, foi utilizado uma padrão bastante utilizado no mercado que é o JWT (Jason Web Tokens), que define uma maneira compacta e segura de transmitir informações entre partes como um objeto JSON.

No contexto deste projeto, o JWT token desempenha um papel fundamental na segurança e autenticação dos usuários. Quando um usuário realiza o login com suas credenciais, um token JWT é gerado e assinado com uma chave secreta única. Esse token é então enviado de volta ao cliente e deve ser incluído em todas as solicitações subsequentes como uma forma de autenticação.

### Hash Senha
Para ocultar a senha no banco de dados, foi utilizado uma biblioteca node chamada 'bcrypt', que não é nativa do Nest.JS, mas é bastante utilizada pela comunidade. Ela é responsável por esconder informações sensíveis do usuário, como as senhas, por exemplo.

![image](https://github.com/antonioscript/AutomativeRepairAPI/assets/10932478/5587aae7-ebff-4d8a-aabc-f8a6e40cae9a)


# Como Executar a Aplicação

## Acesse a API via URL
Caso deseje acessar a api via URL, basta acessar esse [link](https://antonio-rocha-automative-api.calmbay-9783cb9a.eastus.azurecontainerapps.io/api). A mesma está rodando em um container Azure e utilizando uma instância RDS no AWS.

## Inicie um Container Docker
Com o Docker instalado, execute o seguinte comando para fazer o download da imagem da aplicação:

```Powersehl
docker pull antonioscript/automative-repair-api:16
```

Em seguida, basta executar a aplicação:
```Powersehl
docker run -p 3000:3000 antonioscript/automative-repair-api:16
```

## Execute a API Localmente
Para executar a aplicação, primeiramente é preciso instalar as dependências do Nest.JS:

```Powersehl
npm install @nestjs/common
```
Após isso, executar o comando de migração para criar as tabelas do modelo no banco de dados:

```Powersehl
npx prisma migrate dev --name nameMigration
```
E por fim, executar o arquivo seed para popular o banco de dados:

```Powersehl
npx prisma db seed
```

Depois disso, basta inserir o comando para iniciar a aplicação: 
```Powersehl
npm run start:dev
```
E acessar através do link: http://localhost:3000/api

</br>**Observação**: Caso não tenha o MySQL instalado, é possível alterar o tipo do banco de dados no arquivo .env e no Schema do Prisma. Ajuste o nome mysql para PostgreSQL, MariaDB, ou qualquer outro servidor passando as informações do host e as credenciais:

```Typescript
DATABASE_URL="mysql://root:admin@localhost:3306/automative_repair_db"
```
<sub>.env</sub>
</br>
</br>
</br>


E no campo de URL, no aquivo schema.prisma altere o provedor:
```Typescript
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```
<sub>prisma\schema.prisma</sub>











