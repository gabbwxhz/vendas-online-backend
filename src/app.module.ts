// ? este arquivo indica quais serao os outros modulos a serem acessados

// * "Modulo" eh uma maneira de organizar os componentes, ele que tem a
// * responsabilidade de exportar os componentes que serao usados em outros
// * arquivos, como os controllers e os services

import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
