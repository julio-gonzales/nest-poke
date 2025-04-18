import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';


@Module({
  imports: [
    ConfigModule.forRoot({

      //aqui leemos el archivo .env atraves de la funcion exportada en el archivo env.config.ts
      load: [ EnvConfiguration],
      //mandamos la validacion de eschemas
      validationSchema: JoiValidationSchema
    }),
    //importremos un modulo estatico como el index
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), //directorio donde se encuentra el index.html
    }),

    //Configuracion de la base de datos
    MongooseModule.forRoot(
      
      process.env.MONGODB //url de la base de datos

      //declaracion de la base de datos sin usar el .env
      //'mongodb://localhost:27017/nest-pokemon', //url de la base de datos
      
    ),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {

  /*constructor(){
    //console.log('AppModule constructor');
    //esto es para ver si se carga el archivo .env
    //console.log(process.env)
  }*/
}
