import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';


@Module({
  imports: [
    //importremos un modulo estatico como el index
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), //directorio donde se encuentra el index.html
    }),

    //Configuracion de la base de datos
    MongooseModule.forRoot(
      'mongodb://localhost:27017/nest-pokemon', //url de la base de datos
      
    ),
    PokemonModule,
    CommonModule,
    SeedModule
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
