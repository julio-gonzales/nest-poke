import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  
  

  constructor(
      //inyectamos el modelo de pokemon
      @InjectModel(Pokemon.name)
      //inicializamos el modelo de pokemon
      private readonly pokemonModel: Model<Pokemon>,

      private readonly http: AxiosAdapter,
    ){}
  
  async executeSeed(){

    //haciendo otro tipo de inserciones en el  que no utilizamos promesas y es mas rapido

    await this.pokemonModel.deleteMany({}); 
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=100')
    const pokemonToInsert: {name: string, no: number}[] = [];
    data.results.forEach(({name, url}) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      pokemonToInsert.push({name, no});
    })
    await this.pokemonModel.insertMany(pokemonToInsert);

    return "Seed executed";

    /*
    //eliminamos todos los pokemones de la base de datos
    await this.pokemonModel.deleteMany({});

    const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')

    //creamos un arreglo de promesas para insertar los pokemones
    const insertPromise = [];
    data.results.forEach( async ({name, url}) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      //const pokemon = await this.pokemonModel.create({name, no});

      //ingresamos todos los pokemones al arreglo de promesa
      insertPromise.push(this.pokemonModel.create({name, no}));
      console.log({name, no});
    })

    await Promise.all(insertPromise);
    return "Seed executed";*/
  }
}
