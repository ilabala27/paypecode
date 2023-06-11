import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function swaggerInit(app: NestExpressApplication) {
    const config =
        new DocumentBuilder()
            .addBearerAuth()
            .setTitle('Paype')
            .setDescription('The Paype`s Wallet API Documentation')
            .setVersion('1.0')
            .addTag('paype')
            .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-doc', app, document);
}
