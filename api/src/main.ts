import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //CORS
  app.enableCors();

  //Class Validator
  app.useGlobalPipes(new ValidationPipe());

  //Swagger
  const config = new DocumentBuilder()
    .setTitle('AutomativeRepairAPI')
    .setDescription('Documentação da API construída em Nest.JS que simula operações de uma assistência mecânica')
    .setVersion('0.1')
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, {
      swaggerOptions: {
        docExpansion: 'none' 
      },
    });

  await app.listen(3000);
}
bootstrap();
