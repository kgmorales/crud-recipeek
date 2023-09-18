import { Module } from '@nestjs/common';

import { BooleanConversionMiddleware } from './boolean-conversion.middleware';

@Module({
  imports: [BooleanConversionMiddleware],
  exports: [BooleanConversionMiddleware],
})
export class MiddlewareModule {}
