import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {


  constructor(
    //inyectamos el modelo de pokemon
    @InjectModel(Pokemon.name)
    //inicializamos el modelo de pokemon
    private readonly pokemonModel: Model<Pokemon>


  ){}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase()

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon; 
    } catch (error) {
      this.handleException(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    //variable de tipo entity
    let pokemon: Pokemon;

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term})
    }

    //utilizamos el isValidObjetId para comprobar si el id es valido
    //de mongose
    if ( !pokemon && isValidObjectId(term)){
      pokemon = await this.pokemonModel.findById(term);
    }

    //en caso de que se busque por el nombre
    if (!pokemon){
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() })
    }


    if ( !pokemon){
      //en caso de que no se pille ningun pokemon
      throw new NotFoundException(`Pokemon with id, name or no "${term}" not found`);
    }

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne(term);

    //si el pokemon no existe lanzamos una excepcion
    if (updatePokemonDto.name) 
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    try {
      //actualizamos el pokemon
      await pokemon.updateOne(updatePokemonDto, { new: true });
      
    } catch (error) {
      this.handleException(error);
    }
    
    //sobre escribimos el pokemon con el nuevo objeto
    return { ...pokemon.toJSON(), ...updatePokemonDto};
  }

  async remove(id: string) {

    //const pokemon = await this.findOne(id);
    //await pokemon.deleteOne();
    //si el pokemon no existe lanzamos una excepcion

    //const result = await this.pokemonModel.findByIdAndDelete(id); 

    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id "${id}" not found`);
    }
    return;
  }


  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    //si el error no es de duplicado, lanzamos un error interno del servidor
    throw new InternalServerErrorException('Cant create Pokemon - Check server logs');
  }

}
