import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    //importamos el config module para poder usar las variables de entorno en cada mddulo que se requiera
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema,
      }
    ]),
    //exportamos el modelo de pokemon para que se pueda usar en otros modulos
    
  ],
  exports: [
    MongooseModule
  ]
})
export class PokemonModule {}
