import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

    //00. Vehicle Types
    const vehicleType0 = await prisma.vehicleType.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        name: 'Carro',
      },
    });

    const vehicleType1 = await prisma.vehicleType.upsert({
        where: { id: 2},
        update: {},
        create: {
          id: 2,
          name: 'Moto',
        },
      });

    console.log({ vehicleType0, vehicleType1 });

    //01. Customers
    //#region Customers
    const customer0 = await prisma.customer.upsert({
        where: { id: 1, cpf: '000-000-0000-00' },
        update: {},
        create: {
            id: 1,
            firstName: 'João',
            lastName: 'Silva',
            cpf: '000-000-0000-00'
        },
      });

      const customer1 = await prisma.customer.upsert({
        where: { id: 2, cpf: '000-000-0000-01' },
        update: {},
        create: {
            id: 2,
            firstName: 'Maria',
            lastName: 'Pereira',
            cpf: '000-000-0000-01'
        },
      });

      const customer2 = await prisma.customer.upsert({
        where: { id: 3, cpf: '000-000-0000-02' },
        update: {},
        create: {
            id: 3,
            firstName: 'Carlos',
            lastName: 'Oliveira',
            cpf: '000-000-0000-02'
        },
      });

      const customer3 = await prisma.customer.upsert({
        where: { id: 4, cpf: '000-000-0000-03' },
        update: {},
        create: {
            id: 4,
            firstName: 'Ana',
            lastName: 'Souza',
            cpf: '000-000-0000-03'
        },
      });

      const customer4 = await prisma.customer.upsert({
        where: { id: 5, cpf: '000-000-0000-04' },
        update: {},
        create: {
            id: 5,
            firstName: 'Mateus',
            lastName: 'Sebastião',
            cpf: '000-000-0000-04'
        },
      });

      const customer5 = await prisma.customer.upsert({
        where: { id: 6, cpf: '000-000-0000-05' },
        update: {},
        create: {
            id: 6,
            firstName: 'Pedro',
            lastName: 'Ferreira',
            cpf: '000-000-0000-05'
        },
      });

      const customer6 = await prisma.customer.upsert({
        where: { id: 7, cpf: '000-000-0000-06' },
        update: {},
        create: {
            id: 7,
            firstName: 'Lucas',
            lastName: 'Lima',
            cpf: '000-000-0000-06'
        },
      });

      const customer7 = await prisma.customer.upsert({
        where: { id: 8, cpf: '000-000-0000-07' },
        update: {},
        create: {
            id: 8,
            firstName: 'Juliana',
            lastName: 'Almeida',
            cpf: '000-000-0000-07'
        },
      });

      const customer8 = await prisma.customer.upsert({
        where: { id: 9, cpf: '000-000-0000-08' },
        update: {},
        create: {
            id: 9,
            firstName: 'Fernanda',
            lastName: 'Martins',
            cpf: '000-000-0000-08'
        },
    });

    const customer9 = await prisma.customer.upsert({
        where: { id: 10, cpf: '000-000-0000-09' },
        update: {},
        create: {
            id: 10,
            firstName: 'Rodrigo',
            lastName: 'Ribeiro',
            cpf: '000-000-0000-09'
        },
    });

    const customer10 = await prisma.customer.upsert({
        where: { id: 11, cpf: '000-000-0000-10' },
        update: {},
        create: {
            id: 11,
            firstName: 'Clara',
            lastName: 'Gomes',
            cpf: '000-000-0000-10'
        },
    });

    const customer11 = await prisma.customer.upsert({
        where: { id: 12, cpf: '000-000-0000-11' },
        update: {},
        create: {
            id: 12,
            firstName: 'Gabriel',
            lastName: 'Costa',
            cpf: '000-000-0000-11'
        },
    });

    const customer12 = await prisma.customer.upsert({
        where: { id: 13, cpf: '000-000-0000-12' },
        update: {},
        create: {
            id: 13,
            firstName: 'Amanda',
            lastName: 'Moura',
            cpf: '000-000-0000-12'
        },
    });

    const customer13 = await prisma.customer.upsert({
        where: { id: 14, cpf: '000-000-0000-13' },
        update: {},
        create: {
            id: 14,
            firstName: 'Renato',
            lastName: 'Duarte',
            cpf: '000-000-0000-13'
        },
    });

    const customer14 = await prisma.customer.upsert({
        where: { id: 15, cpf: '000-000-0000-14' },
        update: {},
        create: {
            id: 15,
            firstName: 'Sofia',
            lastName: 'Barbosa',
            cpf: '000-000-0000-14'
        },
    });

    const customer15 = await prisma.customer.upsert({
        where: { id: 16, cpf: '000-000-0000-15' },
        update: {},
        create: {
            id: 16,
            firstName: 'Marcos',
            lastName: 'Carvalho',
            cpf: '000-000-0000-15'
        },
    });

    const customer16 = await prisma.customer.upsert({
        where: { id: 17, cpf: '000-000-0000-16' },
        update: {},
        create: {
            id: 17,
            firstName: 'Fabíola',
            lastName: 'Teixeira',
            cpf: '000-000-0000-16'
        },
    });

    const customer17 = await prisma.customer.upsert({
        where: { id: 18, cpf: '000-000-0000-17' },
        update: {},
        create: {
            id: 18,
            firstName: 'Vinícius',
            lastName: 'Fagundes',
            cpf: '000-000-0000-17'
        },
    });

    const customer18 = await prisma.customer.upsert({
        where: { id: 19, cpf: '000-000-0000-18' },
        update: {},
        create: {
            id: 19,
            firstName: 'Patrícia',
            lastName: 'Figueiredo',
            cpf: '000-000-0000-18'
        },
    });

    const customer19 = await prisma.customer.upsert({
        where: { id: 20, cpf: '000-000-0000-19' },
        update: {},
        create: {
            id: 20,
            firstName: 'Bruno',
            lastName: 'Gonçalves',
            cpf: '000-000-0000-19'
        },
    });

    const customer20 = await prisma.customer.upsert({
        where: { id: 21, cpf: '000-000-0000-20' },
        update: {},
        create: {
            id: 21,
            firstName: 'Isabela',
            lastName: 'Fernandes',
            cpf: '000-000-0000-20'
        },
    });

    console.log({
        customer1, customer2, customer3, customer4, customer5, customer6, customer7, customer8, customer9, customer10,
        customer11, customer12, customer13, customer14, customer15, customer16, customer17, customer18, customer19, customer20
    });

    //#endregion

    //02.Vehicles
    //#region Vehicles
    const vehicle1 = await prisma.vehicle.upsert({
        where: { id: 1, plate: 'ABC1D01' },
        update: {},
        create: {
            id: 1,
            customerId: 1,
            vehicleTypeId: 1,
            plate: 'ABC1D01',
            brand: 'Chevrolet',
            model: 'Prisma',
            year: 2015
        },
      });

      const vehicle2 = await prisma.vehicle.upsert({
        where: { id: 2, plate: 'XYZ2M02' },
        update: {},
        create: {
            id: 2,
            customerId: 2,
            vehicleTypeId: 2,
            plate: 'XYZ2M02',
            brand: 'Honda',
            model: 'CBR',
            year: 2020
        },
    });

    const vehicle3 = await prisma.vehicle.upsert({
        where: { id: 3, plate: 'FGH3E03' },
        update: {},
        create: {
            id: 3,
            customerId: 3,
            vehicleTypeId: 1, 
            plate: 'FGH3E03',
            brand: 'Ford',
            model: 'Fiesta',
            year: 2018
        },
    });

    const vehicle4 = await prisma.vehicle.upsert({
        where: { id: 4, plate: 'LMN4F04' },
        update: {},
        create: {
            id: 4, 
            customerId: 4,
            vehicleTypeId: 1, 
            plate: 'LMN4F04',
            brand: 'Volkswagen',
            model: 'Gol',
            year: 2017
        },
    });

    const vehicle5 = await prisma.vehicle.upsert({
        where: { id: 5, plate: 'OPQ5G05' },
        update: {},
        create: {
            id: 5,
            customerId: 5,
            vehicleTypeId: 2, 
            plate: 'OPQ5G05',
            brand: 'Yamaha',
            model: 'MT-07',
            year: 2019
        },
    });

    const vehicle6 = await prisma.vehicle.upsert({
        where: { id: 6, plate: 'RST6H06' },
        update: {},
        create: {
            id: 6,
            customerId: 6,
            vehicleTypeId: 2, 
            plate: 'RST6H06',
            brand: 'Suzuki',
            model: 'GSX-R750',
            year: 2020
        },
    });

    const vehicle7 = await prisma.vehicle.upsert({
        where: { id: 7, plate: 'UVW7I07' },
        update: {},
        create: {
            id: 7,
            customerId: 7,
            vehicleTypeId: 1, 
            plate: 'UVW7I07',
            brand: 'Toyota',
            model: 'Corolla',
            year: 2016
        },
    });

    const vehicle8 = await prisma.vehicle.upsert({
        where: { id: 8, plate: 'XYZ8J08' },
        update: {},
        create: {
            id: 8,
            customerId: 8,
            vehicleTypeId: 1, 
            plate: 'XYZ8J08',
            brand: 'Hyundai',
            model: 'HB20',
            year: 2019
        },
    });

    const vehicle9 = await prisma.vehicle.upsert({
        where: { id: 9, plate: 'ABC9K09' },
        update: {},
        create: {
            id: 9,
            customerId: 9,
            vehicleTypeId: 2, 
            plate: 'ABC9K09',
            brand: 'Kawasaki',
            model: 'Ninja 400',
            year: 2021
        },
    });
    
    const vehicle10 = await prisma.vehicle.upsert({
        where: { id: 10, plate: 'DEF1L10' },
        update: {},
        create: {
            id: 10,
            customerId: 10,
            vehicleTypeId: 1, 
            plate: 'DEF1L10',
            brand: 'Fiat',
            model: 'Uno',
            year: 2014
        },
    });

    const vehicle11 = await prisma.vehicle.upsert({
        where: { id: 11, plate: 'GHI2M11' },
        update: {},
        create: {
            id: 11,
            customerId: 11,
            vehicleTypeId: 2, 
            plate: 'GHI2M11',
            brand: 'Harley-Davidson',
            model: 'Sportster Iron 883',
            year: 2017
        },
    });
    
    const vehicle12 = await prisma.vehicle.upsert({
        where: { id: 12, plate: 'JKL3N12' },
        update: {},
        create: {
            id: 12,
            customerId: 12,
            vehicleTypeId: 1, 
            plate: 'JKL3N12',
            brand: 'Renault',
            model: 'Sandero',
            year: 2020
        },
    });
    
    const vehicle13 = await prisma.vehicle.upsert({
        where: { id: 13, plate: 'MNO4O13' },
        update: {},
        create: {
            id: 13,
            customerId: 13,
            vehicleTypeId: 2, 
            plate: 'MNO4O13',
            brand: 'Ducati',
            model: 'Monster 821',
            year: 2018
        },
    });
    
    const vehicle14 = await prisma.vehicle.upsert({
        where: { id: 14, plate: 'PQR5P14' },
        update: {},
        create: {
            id: 14,
            customerId: 14,
            vehicleTypeId: 1, 
            plate: 'PQR5P14',
            brand: 'BMW',
            model: 'X3',
            year: 2021
        },
    });
    
    const vehicle15 = await prisma.vehicle.upsert({
        where: { id: 15, plate: 'STU6Q15' },
        update: {},
        create: {
            id: 15,
            customerId: 15,
            vehicleTypeId: 2, 
            plate: 'STU6Q15',
            brand: 'Triumph',
            model: 'Street Triple RS',
            year: 2019
        },
    });
    

    //#endregion

    //03. 
    //#region appointmentStatus
    const appointmentStatus1 = await prisma.appointmentStatus.upsert({
        where: { id: 1},
        update: {},
        create: {
            id: 1,
            name: 'Agendado'
        },
      });

      const appointmentStatus2 = await prisma.appointmentStatus.upsert({
        where: { id: 2},
        update: {},
        create: {
            id: 2,
            name: 'Confirmado'
        },
      });

      const appointmentStatus3 = await prisma.appointmentStatus.upsert({
        where: { id: 3},
        update: {},
        create: {
            id: 3,
            name: 'Cancelado'
        },
      });

      const appointmentStatus4 = await prisma.appointmentStatus.upsert({
        where: { id: 4},
        update: {},
        create: {
            id: 4,
            name: 'Concluído'
        },
      });

      console.log(appointmentStatus1, appointmentStatus2, appointmentStatus3, appointmentStatus4)
    //#endregion

    //04. Appointment
    //#region appointmet
    const appointment1 = await prisma.appointment.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            customerId: 1,
            statusId: 1,
            inspectionDate: new Date('2024-07-05T09:30:00'), 
            observation: 'Cliente relata que o carro está fazendo bastante barulho no motor'
        },
    });

    const appointment2 = await prisma.appointment.upsert({
        where: { id: 2 },
        update: {},
        create: {
            id: 2,
            customerId: 2,
            statusId: 1,
            inspectionDate: new Date('2024-07-06T10:00:00'),
            observation: 'Cliente reportou que o veículo está apresentando problemas de freio ao dirigir em velocidades superiores a 60 km/h.'
        },
    });
    
    const appointment3 = await prisma.appointment.upsert({
        where: { id: 3 },
        update: {},
        create: {
            id: 3,
            customerId: 3,
            statusId: 1,
            inspectionDate: new Date('2024-07-07T11:30:00'),
            observation: 'Cliente mencionou um barulho estranho vindo do motor ao ligar o carro pela manhã.'
        },
    });
    
    const appointment4 = await prisma.appointment.upsert({
        where: { id: 4 },
        update: {},
        create: {
            id: 4,
            customerId: 4,
            statusId: 1,
            inspectionDate: new Date('2024-07-08T13:00:00'),
            observation: 'Cliente relatou que o ar-condicionado não está esfriando corretamente, mesmo após uma recarga do gás refrigerante.'
        },
    });
    
    const appointment5 = await prisma.appointment.upsert({
        where: { id: 5 },
        update: {},
        create: {
            id: 5,
            customerId: 5,
            statusId: 1,
            inspectionDate: new Date('2024-07-09T14:30:00'),
            observation: 'Cliente notou uma trepidação incomum no volante ao frear em velocidades acima de 80 km/h.'
        },
    });
    
    const appointment6 = await prisma.appointment.upsert({
        where: { id: 6 },
        update: {},
        create: {
            id: 6,
            customerId: 6,
            statusId: 1,
            inspectionDate: new Date('2024-07-10T15:45:00'),
            observation: 'Cliente queixa-se de um ruído metálico vindo da suspensão dianteira em vias irregulares.'
        },
    });
    
    const appointment7 = await prisma.appointment.upsert({
        where: { id: 7 },
        update: {},
        create: {
            id: 7,
            customerId: 7,
            statusId: 1,
            inspectionDate: new Date('2024-07-11T08:00:00'),
            observation: 'Cliente percebeu uma oscilação anormal na marcha lenta do motor quando parado em semáforos.'
        },
    });
    
    const appointment8 = await prisma.appointment.upsert({
        where: { id: 8 },
        update: {},
        create: {
            id: 8,
            customerId: 8,
            statusId: 1,
            inspectionDate: new Date('2024-07-12T09:15:00'),
            observation: 'Cliente notificou que o sistema de som apresenta chiados constantes, principalmente em altos volumes.'
        },
    });
    
    const appointment9 = await prisma.appointment.upsert({
        where: { id: 9 },
        update: {},
        create: {
            id: 9,
            customerId: 9,
            statusId: 1,
            inspectionDate: new Date('2024-07-13T10:30:00'),
            observation: 'Cliente mencionou uma dificuldade na troca de marchas em rotações mais elevadas.'
        },
    });
    
    const appointment10 = await prisma.appointment.upsert({
        where: { id: 10 },
        update: {},
        create: {
            id: 10,
            customerId: 10,
            statusId: 1,
            inspectionDate: new Date('2024-07-14T11:45:00'),
            observation: 'Cliente percebeu uma redução na eficiência do sistema de partida a frio em dias mais frios.'
        },
    });
    
    const appointment11 = await prisma.appointment.upsert({
        where: { id: 11 },
        update: {},
        create: {
            id: 11,
            customerId: 11,
            statusId: 1,
            inspectionDate: new Date('2024-07-15T13:00:00'),
            observation: 'Cliente relatou que a luz de advertência do sistema de freio ABS acendeu intermitentemente durante a condução.'
        },
    });

    const appointment12 = await prisma.appointment.upsert({
        where: { id: 12 },
        update: {},
        create: {
            id: 12,
            customerId: 12,
            statusId: 1,
            inspectionDate: new Date('2024-07-16T14:15:00'),
            observation: 'Cliente mencionou uma vibração incomum no pedal do freio ao desacelerar em velocidades elevadas.'
        },
    });
    
    const appointment13 = await prisma.appointment.upsert({
        where: { id: 13 },
        update: {},
        create: {
            id: 13,
            customerId: 13,
            statusId: 1,
            inspectionDate: new Date('2024-07-17T15:30:00'),
            observation: 'Cliente percebeu um odor de queimado vindo do motor após uma viagem longa em alta velocidade.'
        },
    });
    
    const appointment14 = await prisma.appointment.upsert({
        where: { id: 14 },
        update: {},
        create: {
            id: 14,
            customerId: 14,
            statusId: 1,
            inspectionDate: new Date('2024-07-18T16:45:00'),
            observation: 'Cliente notificou que o veículo está consumindo mais combustível do que o habitual.'
        },
    });
    
    console.log(appointment1, appointment2, appointment3, appointment4, appointment5, appointment6, appointment7, appointment8,
        appointment9, appointment10, appointment11, appointment12, appointment13, appointment14)
    
    
    //#endregion

    //05. Parts
    //#region Parts
    const part1 = await prisma.part.upsert({
        where: { id: 1, name:'Óleo Lubrificante Sintético' },
        update: {},
        create: {
            id: 1,
            name:'Óleo Lubrificante Sintético',
            supplier: 'Autopeças Machado',
            manufacturer: 'Bosch',
            barcode: '1234567890123',
            observation: 'Óleo lubrificante sintético de alta performance para motores à gasolina.',
            quantity: 20,
            value: 38
        },
    });

    const part2 = await prisma.part.upsert({
        where: { id: 2, name: 'Filtro de Ar' },
        update: {},
        create: {
            id: 2,
            name: 'Filtro de Ar',
            supplier: 'Autopeças Rodrigues',
            manufacturer: 'Mahle',
            barcode: '2345678901234',
            observation: 'Filtro de ar de alta eficiência para motores a gasolina e diesel.',
            quantity: 50,
            value: 15
        },
    });
    
    const part3 = await prisma.part.upsert({
        where: { id: 3, name: 'Pastilha de Freio Dianteira' },
        update: {},
        create: {
            id: 3,
            name: 'Pastilha de Freio Dianteira',
            supplier: 'Autopeças Silva',
            manufacturer: 'Fras-le',
            barcode: '3456789012345',
            observation: 'Pastilha de freio de alto desempenho para sistemas de freios a disco dianteiros.',
            quantity: 30,
            value: 50
        },
    });
    
    const part4 = await prisma.part.upsert({
        where: { id: 4, name: 'Vela de Ignição' },
        update: {},
        create: {
            id: 4,
            name: 'Vela de Ignição',
            supplier: 'Autopeças Oliveira',
            manufacturer: 'NGK',
            barcode: '4567890123456',
            observation: 'Vela de ignição de platina para motores a gasolina, garantindo uma centelha mais eficiente.',
            quantity: 40,
            value: 25
        },
    });
    
    const part5 = await prisma.part.upsert({
        where: { id: 5, name: 'Filtro de Combustível' },
        update: {},
        create: {
            id: 5,
            name: 'Filtro de Combustível',
            supplier: 'Autopeças Gonçalves',
            manufacturer: 'Bosch',
            barcode: '5678901234567',
            observation: 'Filtro de combustível de alta qualidade para motores a diesel, evitando impurezas no sistema de injeção.',
            quantity: 35,
            value: 30
        },
    });

    const part6 = await prisma.part.upsert({
        where: { id: 6, name: 'Amortecedor Dianteiro' },
        update: {},
        create: {
            id: 6,
            name: 'Amortecedor Dianteiro',
            supplier: 'Autopeças Almeida',
            manufacturer: 'Monroe',
            barcode: '6789012345678',
            observation: 'Amortecedor dianteiro de alta resistência para proporcionar conforto e estabilidade na suspensão.',
            quantity: 25,
            value: 120
        },
    });
    
    const part7 = await prisma.part.upsert({
        where: { id: 7, name: 'Correia Dentada' },
        update: {},
        create: {
            id: 7,
            name: 'Correia Dentada',
            supplier: 'Autopeças Costa',
            manufacturer: 'Dayco',
            barcode: '7890123456789',
            observation: 'Correia dentada de alto desempenho, resistente ao calor e à abrasão, garantindo sincronização precisa do motor.',
            quantity: 20,
            value: 80
        },
    });
    
    const part8 = await prisma.part.upsert({
        where: { id: 8, name: 'Jogo de Velas de Ignição' },
        update: {},
        create: {
            id: 8,
            name: 'Jogo de Velas de Ignição',
            supplier: 'Autopeças Lima',
            manufacturer: 'Denso',
            barcode: '8901234567890',
            observation: 'Jogo completo de velas de ignição para substituição em motores de quatro cilindros, garantindo uma ignição eficiente.',
            quantity: 30,
            value: 40
        },
    });
    
    const part9 = await prisma.part.upsert({
        where: { id: 9, name: 'Disco de Freio Dianteiro' },
        update: {},
        create: {
            id: 9,
            name: 'Disco de Freio Dianteiro',
            supplier: 'Autopeças Santos',
            manufacturer: 'Fremax',
            barcode: '9012345678901',
            observation: 'Disco de freio dianteiro ventilado, com material de alta qualidade para dissipação eficiente de calor e maior durabilidade.',
            quantity: 15,
            value: 150
        },
    });
    
    const part10 = await prisma.part.upsert({
        where: { id: 10, name: 'Kit de Embreagem Modelo 1.0' },
        update: {},
        create: {
            id: 10,
            name: 'Kit de Embreagem Modelo 1.0',
            supplier: 'Autopeças Martins',
            manufacturer: 'Sachs',
            barcode: '0123456789012',
            observation: 'Kit completo de embreagem composto de platô, disco e rolamento, garantindo uma troca completa e eficiente.',
            quantity: 10,
            value: 250
        },
    });
    
    const part11 = await prisma.part.upsert({
        where: { id: 11, name: 'Sensor de Oxigênio' },
        update: {},
        create: {
            id: 11,
            name: 'Sensor de Oxigênio',
            supplier: 'Autopeças Pereira',
            manufacturer: 'Bosch',
            barcode: '1234567890123',
            observation: 'Sensor de oxigênio para monitoramento da mistura ar/combustível, garantindo uma queima mais eficiente e redução de emissões.',
            quantity: 25,
            value: 80
        },
    });
    
    const part12 = await prisma.part.upsert({
        where: { id: 12, name: 'Radiador de Água' },
        update: {},
        create: {
            id: 12,
            name: 'Radiador de Água',
            supplier: 'Autopeças Ferreira',
            manufacturer: 'Valeo',
            barcode: '2345678901234',
            observation: 'Radiador de água de alta qualidade, com tecnologia de dissipação térmica avançada para manter a temperatura do motor estável.',
            quantity: 20,
            value: 200
        },
    });
    
    const part13 = await prisma.part.upsert({
        where: { id: 13, name: 'Bomba de Combustível' },
        update: {},
        create: {
            id: 13,
            name: 'Bomba de Combustível',
            supplier: 'Autopeças Souza',
            manufacturer: 'Delphi',
            barcode: '3456789012345',
            observation: 'Bomba de combustível elétrica de alta pressão para sistemas de injeção eletrônica, garantindo uma alimentação precisa de combustível ao motor.',
            quantity: 30,
            value: 150
        },
    });
    
    const part14 = await prisma.part.upsert({
        where: { id: 14, name: 'Jogo de Correias do Motor' },
        update: {},
        create: {
            id: 14,
            name: 'Jogo de Correias do Motor',
            supplier: 'Autopeças Gomes',
            manufacturer: 'Contitech',
            barcode: '4567890123456',
            observation: 'Jogo completo de correias do motor, incluindo correia do alternador, direção hidráulica e ar-condicionado, para uma troca completa e segura.',
            quantity: 35,
            value: 120
        },
    });
    
    const part15 = await prisma.part.upsert({
        where: { id: 15, name: 'Filtro de Óleo' },
        update: {},
        create: {
            id: 15,
            name: 'Filtro de Óleo',
            supplier: 'Autopeças Barbosa',
            manufacturer: 'Mann-Filter',
            barcode: '5678901234567',
            observation: 'Filtro de óleo de alta eficiência, retendo impurezas e contaminantes para garantir uma lubrificação eficaz do motor.',
            quantity: 40,
            value: 20
        },
    });
    
    const part16 = await prisma.part.upsert({
        where: { id: 16, name: 'Sensor de Temperatura do Motor' },
        update: {},
        create: {
            id: 16,
            name: 'Sensor de Temperatura do Motor',
            supplier: 'Autopeças Oliveira',
            manufacturer: 'Bosch',
            barcode: '6789012345678',
            observation: 'Sensor de temperatura do motor para monitorar a temperatura do líquido de arrefecimento e evitar o superaquecimento.',
            quantity: 15,
            value: 30
        },
    });
    
    const part17 = await prisma.part.upsert({
        where: { id: 17, name: 'Interruptor de Luz de Freio' },
        update: {},
        create: {
            id: 17,
            name: 'Interruptor de Luz de Freio',
            supplier: 'Autopeças Rodrigues',
            manufacturer: 'Hella',
            barcode: '7890123456789',
            observation: 'Interruptor de luz de freio para acionar as luzes de freio quando o pedal de freio é pressionado, garantindo segurança nas frenagens.',
            quantity: 20,
            value: 10
        },
    });
    
    const part18 = await prisma.part.upsert({
        where: { id: 18, name: 'Jogo de Juntas do Motor' },
        update: {},
        create: {
            id: 18,
            name: 'Jogo de Juntas do Motor',
            supplier: 'Autopeças Almeida',
            manufacturer: 'Elring',
            barcode: '8901234567890',
            observation: 'Jogo completo de juntas do motor para vedação perfeita e durabilidade máxima em motores a gasolina e diesel.',
            quantity: 25,
            value: 100
        },
    });
    
    const part19 = await prisma.part.upsert({
        where: { id: 19, name: 'Bombinha de Combustível' },
        update: {},
        create: {
            id: 19,
            name: 'Bombinha de Combustível',
            supplier: 'Autopeças Costa',
            manufacturer: 'Bosch',
            barcode: '0123456789012',
            observation: 'Bombinha de combustível elétrica para auxiliar na partida a frio e manter a pressão de combustível no sistema de injeção.',
            quantity: 30,
            value: 50
        },
    });
    
    const part20 = await prisma.part.upsert({
        where: { id: 20, name: 'Rolamento de Roda Dianteiro' },
        update: {},
        create: {
            id: 20,
            name: 'Rolamento de Roda Dianteiro',
            supplier: 'Autopeças Lima',
            manufacturer: 'SKF',
            barcode: '1234567890123',
            observation: 'Rolamento de roda dianteiro de alta qualidade para reduzir o atrito e garantir um movimento suave da roda.',
            quantity: 40,
            value: 70
        },
    });
    
    const part21 = await prisma.part.upsert({
        where: { id: 21, name: 'Bateria Automotiva' },
        update: {},
        create: {
            id: 21,
            name: 'Bateria Automotiva',
            supplier: 'Autopeças Santos',
            manufacturer: 'Heliar',
            barcode: '2345678901234',
            observation: 'Bateria automotiva de alta capacidade para partida confiável em todas as condições climáticas.',
            quantity: 35,
            value: 150
        },
    });
    
    const part22 = await prisma.part.upsert({
        where: { id: 22, name: 'Lâmpada de Farol' },
        update: {},
        create: {
            id: 22,
            name: 'Lâmpada de Farol',
            supplier: 'Autopeças Ferreira',
            manufacturer: 'Philips',
            barcode: '3456789012345',
            observation: 'Lâmpada de farol de alto desempenho para garantir uma iluminação eficaz e segura durante a condução noturna.',
            quantity: 45,
            value: 25
        },
    });
    
    const part23 = await prisma.part.upsert({
        where: { id: 23, name: 'Cabo de Vela' },
        update: {},
        create: {
            id: 23,
            name: 'Cabo de Vela',
            supplier: 'Autopeças Gomes',
            manufacturer: 'NGK',
            barcode: '4567890123456',
            observation: 'Cabo de vela de alta qualidade para garantir uma ignição estável e eficiente em motores a gasolina.',
            quantity: 50,
            value: 20
        },
    });
    
    const part24 = await prisma.part.upsert({
        where: { id: 24, name: 'Kit de Embreagem' },
        update: {},
        create: {
            id: 24,
            name: 'Kit de Embreagem',
            supplier: 'Autopeças Barbosa',
            manufacturer: 'Valeo',
            barcode: '5678901234567',
            observation: 'Kit completo de embreagem composto de platô, disco e rolamento, garantindo uma troca completa e segura.',
            quantity: 55,
            value: 180
        },
    });
    
    const part25 = await prisma.part.upsert({
        where: { id: 25, name: 'Sensor de Velocidade' },
        update: {},
        create: {
            id: 25,
            name: 'Sensor de Velocidade',
            supplier: 'Autopeças Pereira',
            manufacturer: 'VDO',
            barcode: '6789012345678',
            observation: 'Sensor de velocidade para monitorar a velocidade do veículo e fornecer informações precisas ao sistema de controle.',
            quantity: 60,
            value: 35
        },
    });

    const part26 = await prisma.part.upsert({
        where: { id: 26, name: 'Sensor de Pressão do Óleo' },
        update: {},
        create: {
            id: 26,
            name: 'Sensor de Pressão do Óleo',
            supplier: 'Autopeças Oliveira',
            manufacturer: 'Bosch',
            barcode: '7890123456789',
            observation: 'Sensor de pressão do óleo para monitorar a pressão do óleo lubrificante do motor, garantindo uma lubrificação adequada e proteção contra danos.',
            quantity: 20,
            value: 40
        },
    });
    
    const part27 = await prisma.part.upsert({
        where: { id: 27, name: 'Filtro de Ar do Motor' },
        update: {},
        create: {
            id: 27,
            name: 'Filtro de Ar do Motor',
            supplier: 'Autopeças Rodrigues',
            manufacturer: 'Mann-Filter',
            barcode: '8901234567890',
            observation: 'Filtro de ar do motor de alta eficiência para remover impurezas e poeira do ar aspirado, protegendo o motor contra desgaste prematuro.',
            quantity: 25,
            value: 15
        },
    });
    
    const part28 = await prisma.part.upsert({
        where: { id: 28, name: 'Sensor de Nível de Combustível' },
        update: {},
        create: {
            id: 28,
            name: 'Sensor de Nível de Combustível',
            supplier: 'Autopeças Almeida',
            manufacturer: 'Delphi',
            barcode: '0123456789012',
            observation: 'Sensor de nível de combustível para monitorar o nível de combustível no tanque, fornecendo informações precisas ao painel de instrumentos.',
            quantity: 30,
            value: 50
        },
    });
    
    const part29 = await prisma.part.upsert({
        where: { id: 29, name: 'Bomba de Água' },
        update: {},
        create: {
            id: 29,
            name: 'Bomba de Água',
            supplier: 'Autopeças Costa',
            manufacturer: 'Gates',
            barcode: '1234567890123',
            observation: 'Bomba de água de alta qualidade para circulação eficiente do líquido de arrefecimento, mantendo a temperatura do motor estável.',
            quantity: 35,
            value: 70
        },
    });
    
    const part30 = await prisma.part.upsert({
        where: { id: 30, name: 'Lâmpada de Freio' },
        update: {},
        create: {
            id: 30,
            name: 'Lâmpada de Freio',
            supplier: 'Autopeças Lima',
            manufacturer: 'Osram',
            barcode: '2345678901234',
            observation: 'Lâmpada de freio de alta intensidade para uma sinalização eficaz de frenagem, garantindo segurança no trânsito.',
            quantity: 40,
            value: 8
        },
    });
    
    
    console.log(part1, part2, part3, part4, part5, part6, part7, part8, part9, part10, part11, part12, part13, part14, part15, part16, 
        part17, part18, part19, part20, part21, part22, part23, part24, part25, part26, part27, part28, part29, part30)
    
    //#endregion
    
    //05. Services
    //#region Services
    const service1 = await prisma.service.upsert({
        where: { id: 1, name: 'Troca de Disco de Freio' },
        update: {},
        create: {
            id: 1,
            name: 'Troca de Disco de Freio',
            value: 200, // Disco de Freio: 150 + Parafuso de Fixação: 50
            observation: 'Troca do disco de freio dianteiro com parafusos de fixação.',
        },
    });
    
    const service2 = await prisma.service.upsert({
        where: { id: 2, name: 'Troca de Óleo' },
        update: {},
        create: {
            id: 2,
            name: 'Troca de Óleo',
            value: 68, // Óleo Lubrificante Sintético: 38 + Filtro de Óleo: 30
            observation: 'Troca de óleo lubrificante sintético e filtro de óleo.',
        },
    });
    
    const service3 = await prisma.service.upsert({
        where: { id: 3, name: 'Alinhamento e Balanceamento' },
        update: {},
        create: {
            id: 3,
            name: 'Alinhamento e Balanceamento',
            value: 120, // Serviços de Alinhamento: 60 + Balanceamento: 60
            observation: 'Realização de alinhamento e balanceamento das rodas.',
        },
    });
    
    const service4 = await prisma.service.upsert({
        where: { id: 4, name: 'Troca de Bateria' },
        update: {},
        create: {
            id: 4,
            name: 'Troca de Bateria',
            value: 480, // Bateria Automotiva: 480
            observation: 'Substituição da bateria automotiva.',
        },
    });
    
    const service5 = await prisma.service.upsert({
        where: { id: 5, name: 'Troca de Velas de Ignição' },
        update: {},
        create: {
            id: 5,
            name: 'Troca de Velas de Ignição',
            value: 160, // Jogo de Velas de Ignição: 160
            observation: 'Troca do jogo de velas de ignição.',
        },
    });
    
    const service6 = await prisma.service.upsert({
        where: { id: 6, name: 'Revisão Completa' },
        update: {},
        create: {
            id: 6,
            name: 'Revisão Completa',
            value: 450, // Itens Revisados: 450
            observation: 'Revisão completa incluindo todos os itens de segurança e manutenção.',
        },
    });
    
    const service7 = await prisma.service.upsert({
        where: { id: 7, name: 'Troca de Correia Dentada' },
        update: {},
        create: {
            id: 7,
            name: 'Troca de Correia Dentada',
            value: 300, // Correia Dentada: 200 + Tensor da Correia: 100
            observation: 'Substituição da correia dentada e do tensor da correia.',
        },
    });
    
    const service8 = await prisma.service.upsert({
        where: { id: 8, name: 'Reparação de Ar Condicionado' },
        update: {},
        create: {
            id: 8,
            name: 'Reparação de Ar Condicionado',
            value: 320, // Componentes de Ar Condicionado: 200 + Mão de Obra: 120
            observation: 'Reparação e manutenção do sistema de ar condicionado.',
        },
    });
    
    const service9 = await prisma.service.upsert({
        where: { id: 9, name: 'Troca de Pneu' },
        update: {},
        create: {
            id: 9,
            name: 'Troca de Pneu',
            value: 400, // Pneu: 400
            observation: 'Troca do pneu com balanceamento.',
        },
    });
    
    const service10 = await prisma.service.upsert({
        where: { id: 10, name: 'Troca de Amortecedores' },
        update: {},
        create: {
            id: 10,
            name: 'Troca de Amortecedores',
            value: 800, // Amortecedores: 800
            observation: 'Substituição dos amortecedores dianteiros e traseiros.',
        },
    });
    
    const service11 = await prisma.service.upsert({
        where: { id: 11, name: 'Alinhamento de Direção' },
        update: {},
        create: {
            id: 11,
            name: 'Alinhamento de Direção',
            value: 120, // Alinhamento: 120
            observation: 'Realização do alinhamento de direção.',
        },
    });
    
    const service12 = await prisma.service.upsert({
        where: { id: 12, name: 'Balanceamento de Rodas' },
        update: {},
        create: {
            id: 12,
            name: 'Balanceamento de Rodas',
            value: 100, // Balanceamento: 100
            observation: 'Realização do balanceamento das rodas.',
        },
    });
    
    const service13 = await prisma.service.upsert({
        where: { id: 13, name: 'Substituição de Filtro de Ar' },
        update: {},
        create: {
            id: 13,
            name: 'Substituição de Filtro de Ar',
            value: 80, // Filtro de Ar: 80
            observation: 'Troca do filtro de ar do motor.',
        },
    });
    
    const service14 = await prisma.service.upsert({
        where: { id: 14, name: 'Troca de Pastilha de Freio' },
        update: {},
        create: {
            id: 14,
            name: 'Troca de Pastilha de Freio',
            value: 300, // Pastilhas de Freio: 300
            observation: 'Substituição das pastilhas de freio dianteiras e traseiras.',
        },
    });
    
    const service15 = await prisma.service.upsert({
        where: { id: 15, name: 'Troca de Fluido de Freio' },
        update: {},
        create: {
            id: 15,
            name: 'Troca de Fluido de Freio',
            value: 50, // Fluido de Freio: 50
            observation: 'Troca do fluido de freio.',
        },
    });
    
    const service16 = await prisma.service.upsert({
        where: { id: 16, name: 'Troca de Escapamento' },
        update: {},
        create: {
            id: 16,
            name: 'Troca de Escapamento',
            value: 350, // Escapamento: 350
            observation: 'Substituição do escapamento completo.',
        },
    });
    
    const service17 = await prisma.service.upsert({
        where: { id: 17, name: 'Reparo do Sistema Elétrico' },
        update: {},
        create: {
            id: 17,
            name: 'Reparo do Sistema Elétrico',
            value: 250, // Componentes Elétricos: 250
            observation: 'Reparo e substituição dos componentes elétricos do veículo.',
        },
    });
    
    const service18 = await prisma.service.upsert({
        where: { id: 18, name: 'Higienização do Sistema de Ar Condicionado' },
        update: {},
        create: {
            id: 18,
            name: 'Higienização do Sistema de Ar Condicionado',
            value: 150, // Higienização: 150
            observation: 'Higienização completa do sistema de ar condicionado.',
        },
    });
    
    const service19 = await prisma.service.upsert({
        where: { id: 19, name: 'Revisão de Freios' },
        update: {},
        create: {
            id: 19,
            name: 'Revisão de Freios',
            value: 180, // Componentes de Freio: 180
            observation: 'Revisão e ajuste dos freios.',
        },
    });
    
    const service20 = await prisma.service.upsert({
        where: { id: 20, name: 'Troca de Cabos de Vela' },
        update: {},
        create: {
            id: 20,
            name: 'Troca de Cabos de Vela',
            value: 100, // Cabos de Vela: 100
            observation: 'Substituição dos cabos de vela do motor.',
        },
    });
    

    //#endregion

    //06. ServiceOnPart
    //#region ServiceOnPart

const serviceOnPart1 = await prisma.serviceOnPart.upsert({
    where: { id: 1 },
    update: {},
    create: {
        id: 1,
        serviceId: 1,
        partId: 3, // Disco de Freio para Troca de Disco de Freio
    },
});

const serviceOnPart2 = await prisma.serviceOnPart.upsert({
    where: { id: 2 },
    update: {},
    create: {
        id: 2,
        serviceId: 2,
        partId: 1, // Óleo Lubrificante Sintético para Troca de Óleo
    },
});

const serviceOnPart3 = await prisma.serviceOnPart.upsert({
    where: { id: 3 },
    update: {},
    create: {
        id: 3,
        serviceId: 3,
        partId: 6, // Alinhamento e Balanceamento
    },
});

const serviceOnPart4 = await prisma.serviceOnPart.upsert({
    where: { id: 4 },
    update: {},
    create: {
        id: 4,
        serviceId: 4,
        partId: 8, // Bateria para Troca de Bateria
    },
});

const serviceOnPart5 = await prisma.serviceOnPart.upsert({
    where: { id: 5 },
    update: {},
    create: {
        id: 5,
        serviceId: 5,
        partId: 4, // Velas de Ignição para Troca de Velas de Ignição
    },
});

const serviceOnPart6 = await prisma.serviceOnPart.upsert({
    where: { id: 6 },
    update: {},
    create: {
        id: 6,
        serviceId: 6,
        partId: 11, // Revisão Completa com Filtro de Óleo
    },
});

const serviceOnPart7 = await prisma.serviceOnPart.upsert({
    where: { id: 7 },
    update: {},
    create: {
        id: 7,
        serviceId: 7,
        partId: 10, // Correia Dentada para Troca de Correia Dentada
    },
});

const serviceOnPart8 = await prisma.serviceOnPart.upsert({
    where: { id: 8 },
    update: {},
    create: {
        id: 8,
        serviceId: 8,
        partId: 2, // Sistema de Ar Condicionado para Reparação de Ar Condicionado
    },
});

const serviceOnPart9 = await prisma.serviceOnPart.upsert({
    where: { id: 9 },
    update: {},
    create: {
        id: 9,
        serviceId: 9,
        partId: 7, // Pneu para Troca de Pneu
    },
});

const serviceOnPart10 = await prisma.serviceOnPart.upsert({
    where: { id: 10 },
    update: {},
    create: {
        id: 10,
        serviceId: 10,
        partId: 12, // Amortecedores para Troca de Amortecedores
    },
});

const serviceOnPart11 = await prisma.serviceOnPart.upsert({
    where: { id: 11 },
    update: {},
    create: {
        id: 11,
        serviceId: 11,
        partId: 14, // Componentes para Alinhamento de Direção
    },
});

const serviceOnPart12 = await prisma.serviceOnPart.upsert({
    where: { id: 12 },
    update: {},
    create: {
        id: 12,
        serviceId: 12,
        partId: 15, // Componentes para Balanceamento de Rodas
    },
});

const serviceOnPart13 = await prisma.serviceOnPart.upsert({
    where: { id: 13 },
    update: {},
    create: {
        id: 13,
        serviceId: 13,
        partId: 5, // Filtro de Ar para Substituição de Filtro de Ar
    },
});

const serviceOnPart14 = await prisma.serviceOnPart.upsert({
    where: { id: 14 },
    update: {},
    create: {
        id: 14,
        serviceId: 14,
        partId: 13, // Pastilhas de Freio para Troca de Pastilha de Freio
    },
});

const serviceOnPart15 = await prisma.serviceOnPart.upsert({
    where: { id: 15 },
    update: {},
    create: {
        id: 15,
        serviceId: 15,
        partId: 9, // Fluido de Freio para Troca de Fluido de Freio
    },
});

const serviceOnPart16 = await prisma.serviceOnPart.upsert({
    where: { id: 16 },
    update: {},
    create: {
        id: 16,
        serviceId: 16,
        partId: 17, // Escapamento para Troca de Escapamento
    },
});

const serviceOnPart17 = await prisma.serviceOnPart.upsert({
    where: { id: 17 },
    update: {},
    create: {
        id: 17,
        serviceId: 17,
        partId: 16, // Componentes Elétricos para Reparo de Sistema Elétrico
    },
});

const serviceOnPart18 = await prisma.serviceOnPart.upsert({
    where: { id: 18 },
    update: {},
    create: {
        id: 18,
        serviceId: 18,
        partId: 18, // Higienização para Higienização do Sistema de Ar Condicionado
    },
});

const serviceOnPart19 = await prisma.serviceOnPart.upsert({
    where: { id: 19 },
    update: {},
    create: {
        id: 19,
        serviceId: 19,
        partId: 9, // Componentes de Freio para Revisão de Freios
    },
});

const serviceOnPart20 = await prisma.serviceOnPart.upsert({
    where: { id: 20 },
    update: {},
    create: {
        id: 20,
        serviceId: 20,
        partId: 19, // Cabos de Vela para Troca de Cabos de Vela
    },
});

    //Inspeção
    //#region Inspeção
    const inspection1 = await prisma.inspection.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            appointmentId: 1,
            vehicleId: 1,
            hasServiceOrder: false,
            inspectionDate: new Date(),
            description: 'Após análise do motor foi descoberto que o barulho no motor era por conta da bateria que estava acabando.',
            value: 100
        },
    });
    
    const inspection2 = await prisma.inspection.upsert({
        where: { id: 2 },
        update: {},
        create: {
            id: 2,
            appointmentId: 2,
            vehicleId: 2,
            hasServiceOrder: true,
            inspectionDate: new Date(),
            description: 'Verificação completa do sistema de freios revelou desgaste excessivo das pastilhas.',
            value: 150
        },
    });
    
    const inspection3 = await prisma.inspection.upsert({
        where: { id: 3 },
        update: {},
        create: {
            id: 3,
            appointmentId: 3,
            vehicleId: 3,
            hasServiceOrder: false,
            inspectionDate: new Date(),
            description: 'Inspeção do ar condicionado identificou necessidade de troca do filtro de ar.',
            value: 120
        },
    });
    
    const inspection4 = await prisma.inspection.upsert({
        where: { id: 4 },
        update: {},
        create: {
            id: 4,
            appointmentId: 4,
            vehicleId: 4,
            hasServiceOrder: true,
            inspectionDate: new Date(),
            description: 'Diagnóstico do sistema de suspensão apontou amortecedores desgastados.',
            value: 180
        },
    });
    
    const inspection5 = await prisma.inspection.upsert({
        where: { id: 5 },
        update: {},
        create: {
            id: 5,
            appointmentId: 5,
            vehicleId: 5,
            hasServiceOrder: false,
            inspectionDate: new Date(),
            description: 'Verificação do sistema de direção indicou necessidade de alinhamento.',
            value: 90
        },
    });
    
    const inspection6 = await prisma.inspection.upsert({
        where: { id: 6 },
        update: {},
        create: {
            id: 6,
            appointmentId: 6,
            vehicleId: 6,
            hasServiceOrder: true,
            inspectionDate: new Date(),
            description: 'Checagem do sistema elétrico encontrou fiação danificada que precisa de substituição.',
            value: 200
        },
    });
    
    const inspection7 = await prisma.inspection.upsert({
        where: { id: 7 },
        update: {},
        create: {
            id: 7,
            appointmentId: 7,
            vehicleId: 7,
            hasServiceOrder: false,
            inspectionDate: new Date(),
            description: 'Inspeção dos pneus mostrou desgaste irregular, necessitando de balanceamento.',
            value: 110
        },
    });
    
    const inspection8 = await prisma.inspection.upsert({
        where: { id: 8 },
        update: {},
        create: {
            id: 8,
            appointmentId: 8,
            vehicleId: 8,
            hasServiceOrder: true,
            inspectionDate: new Date(),
            description: 'Avaliação do motor revelou necessidade de troca de óleo e filtro.',
            value: 130
        },
    });
    
    const inspection9 = await prisma.inspection.upsert({
        where: { id: 9 },
        update: {},
        create: {
            id: 9,
            appointmentId: 9,
            vehicleId: 9,
            hasServiceOrder: false,
            inspectionDate: new Date(),
            description: 'Verificação do sistema de exaustão identificou vazamento que precisa ser reparado.',
            value: 140
        },
    });
    
    const inspection10 = await prisma.inspection.upsert({
        where: { id: 10 },
        update: {},
        create: {
            id: 10,
            appointmentId: 10,
            vehicleId: 10,
            hasServiceOrder: true,
            inspectionDate: new Date(),
            description: 'Inspeção do sistema de transmissão encontrou falha que necessita de reparo imediato.',
            value: 250
        },
    });

    const inspection11 = await prisma.inspection.upsert({
        where: { id: 11 },
        update: {},
        create: {
            id: 11,
            appointmentId: 11,
            vehicleId: 11,
            hasServiceOrder: false,
            inspectionDate: new Date(),
            description: 'Após análise do sistema de combustível, foi detectado entupimento no filtro de combustível.',
            value: 125
        },
    });
    
    const inspection12 = await prisma.inspection.upsert({
        where: { id: 12 },
        update: {},
        create: {
            id: 12,
            appointmentId: 12,
            vehicleId: 12,
            hasServiceOrder: true,
            inspectionDate: new Date(),
            description: 'Inspeção do sistema de arrefecimento revelou necessidade de troca do radiador.',
            value: 220
        },
    });
    
    const inspection13 = await prisma.inspection.upsert({
        where: { id: 13 },
        update: {},
        create: {
            id: 13,
            appointmentId: 13,
            vehicleId: 13,
            hasServiceOrder: false,
            inspectionDate: new Date(),
            description: 'Verificação do sistema de escapamento identificou necessidade de substituição do silenciador.',
            value: 170
        },
    });
    
    const inspection14 = await prisma.inspection.upsert({
        where: { id: 14 },
        update: {},
        create: {
            id: 14,
            appointmentId: 14,
            vehicleId: 14,
            hasServiceOrder: true,
            inspectionDate: new Date(),
            description: 'Diagnóstico do sistema de iluminação apontou falha nos faróis dianteiros.',
            value: 90
        },
    });
    
    console.log(inspection1, inspection2, inspection3, inspection4, inspection5, inspection6, inspection7, 
        inspection8, inspection9, inspection10, inspection11, inspection12, inspection13, inspection14
     )
    //#endregion

    //06. InspectionOnService
//#region InspectionOnService
const inspectionOnService1 = await prisma.inspectionOnService.upsert({
    where: { id: 1 },
    update: {},
    create: {
        id: 1,
        inspectionId: 1,
        serviceId: 1
    },
});

const inspectionOnService2 = await prisma.inspectionOnService.upsert({
    where: { id: 2 },
    update: {},
    create: {
        id: 2,
        inspectionId: 2,
        serviceId: 2
    },
});

const inspectionOnService3 = await prisma.inspectionOnService.upsert({
    where: { id: 3 },
    update: {},
    create: {
        id: 3,
        inspectionId: 3,
        serviceId: 3
    },
});

const inspectionOnService4 = await prisma.inspectionOnService.upsert({
    where: { id: 4 },
    update: {},
    create: {
        id: 4,
        inspectionId: 4,
        serviceId: 4
    },
});

const inspectionOnService5 = await prisma.inspectionOnService.upsert({
    where: { id: 5 },
    update: {},
    create: {
        id: 5,
        inspectionId: 5,
        serviceId: 5
    },
});

const inspectionOnService6 = await prisma.inspectionOnService.upsert({
    where: { id: 6 },
    update: {},
    create: {
        id: 6,
        inspectionId: 6,
        serviceId: 6
    },
});

const inspectionOnService7 = await prisma.inspectionOnService.upsert({
    where: { id: 7 },
    update: {},
    create: {
        id: 7,
        inspectionId: 7,
        serviceId: 7
    },
});

const inspectionOnService8 = await prisma.inspectionOnService.upsert({
    where: { id: 8 },
    update: {},
    create: {
        id: 8,
        inspectionId: 8,
        serviceId: 8
    },
});

const inspectionOnService9 = await prisma.inspectionOnService.upsert({
    where: { id: 9 },
    update: {},
    create: {
        id: 9,
        inspectionId: 9,
        serviceId: 9
    },
});

const inspectionOnService10 = await prisma.inspectionOnService.upsert({
    where: { id: 10 },
    update: {},
    create: {
        id: 10,
        inspectionId: 10,
        serviceId: 10
    },
});

const inspectionOnService11 = await prisma.inspectionOnService.upsert({
    where: { id: 11 },
    update: {},
    create: {
        id: 11,
        inspectionId: 11,
        serviceId: 11
    },
});

const inspectionOnService12 = await prisma.inspectionOnService.upsert({
    where: { id: 12 },
    update: {},
    create: {
        id: 12,
        inspectionId: 12,
        serviceId: 12
    },
});

const inspectionOnService13 = await prisma.inspectionOnService.upsert({
    where: { id: 13 },
    update: {},
    create: {
        id: 13,
        inspectionId: 13,
        serviceId: 13
    },
});

const inspectionOnService14 = await prisma.inspectionOnService.upsert({
    where: { id: 14 },
    update: {},
    create: {
        id: 14,
        inspectionId: 14,
        serviceId: 14
    },
});

    //#region Users
    const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

async function createUser(id, name, email, password) {
    const hashedPassword = await hashPassword(password);
    return prisma.user.upsert({
        where: { id },
        update: {},
        create: {
            id,
            name,
            email,
            password: hashedPassword
        },
    });
}

//#region Users
const user1 = await createUser(1, 'Flávia', 'flavia@gmail.com', 'senhaSegura123');
const user2 = await createUser(2, 'João', 'joao@gmail.com', 'senhaSegura456');
const user3 = await createUser(3, 'Maria', 'maria@gmail.com', 'senhaSegura789');
const user4 = await createUser(4, 'Carlos', 'carlos@gmail.com', 'senhaSegura321');
const user5 = await createUser(5, 'Ana', 'ana@gmail.com', 'senhaSegura654');
const user6 = await createUser(6, 'Pedro', 'pedro@gmail.com', 'senhaSegura987');
const user7 = await createUser(7, 'Luciana', 'luciana@gmail.com', 'senhaSegura147');
const user8 = await createUser(8, 'Marcos', 'marcos@gmail.com', 'senhaSegura258');
const user9 = await createUser(9, 'Fernanda', 'fernanda@gmail.com', 'senhaSegura369');
const user10 = await createUser(10, 'Ricardo', 'ricardo@gmail.com', 'senhaSegura741');
//#endregion

    //#endregion

} 


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });