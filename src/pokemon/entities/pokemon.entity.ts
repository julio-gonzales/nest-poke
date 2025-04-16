import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

//extendemos la clase de Documents y documents tiene que ser de mongose
@Schema()
export class Pokemon extends Document{


    @Prop({ 
        unique: true,
        index: true
     }) //unique para que no se repitan los nombres
    name: string;

    @Prop({
        unique: true,
        index: true
     }) //unique para que no se repitan los nombres 
    no: number; 

    
}


export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
//esquema de la base de datos donde le pasamos la clase para que se cree la tabla en la base de datos