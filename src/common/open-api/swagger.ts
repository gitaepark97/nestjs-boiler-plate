import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Environment } from '../config/env.validation';

export const setUpSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('')
    .setDescription(
      `${process.env.NODE_ENV == Environment.Production ? '운영' : '개발'} 환경 API 문서입니다.`,
    )
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
};
