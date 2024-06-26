import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors();

  // Class Validator
  app.useGlobalPipes(new ValidationPipe());

  // Swagger
const config = new DocumentBuilder()
    .setTitle('AutomativeRepairAPI')
    .setDescription('Documentação da API construída em Nest.JS que simula operações de uma assistência mecânica. </br>[github.com/antonioscript/AutomativeRepairAPI](https://github.com/antonioscript/AutomativeRepairAPI)')
    .setVersion('0.1')
    .build();


  const document = SwaggerModule.createDocument(app, config);

  document.paths = sortPathsAlphabetically(document.paths);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      docExpansion: 'none' 
    },
  });

  await app.listen(3000);
}

function sortPathsAlphabetically(paths: OpenAPIObject['paths']): OpenAPIObject['paths'] {
  const sortedPaths: OpenAPIObject['paths'] = {};
  const sortedPathsKeys = Object.keys(paths).sort();
  sortedPathsKeys.forEach(key => {
    sortedPaths[key] = paths[key];
  });
  return sortedPaths;
}

bootstrap();
