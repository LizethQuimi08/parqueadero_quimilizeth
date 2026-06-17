import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Configurar Swagger/OpenAPI
  const config = new DocumentBuilder()
    .setTitle('API de Vehículos')
    .setDescription(
      'Documentación de la API REST para gestión de vehículos. ' +
      'Soporta operaciones CRUD para diferentes tipos de vehículos: ' +
      'Autos, Motocicletas y Camionetas con validaciones completas.'
    )
    .setVersion('1.0.0')
    .setContact(
      'Soporte',
      'http://localhost:3001',
      'soporte@vehiculos.com'
    )
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addTag('Vehículos', 'Operaciones CRUD para vehículos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'list',
      filter: true,
      showRequestHeaders: true,
      operationsSorter: 'alpha',
    },
  });

  await app.listen(process.env.PORT ?? 3001);
  const url = await app.getUrl();
  console.log(`Application is running on: ${url}`);
  console.log(`Swagger documentation available at: ${url}/docs`);
}
bootstrap();
