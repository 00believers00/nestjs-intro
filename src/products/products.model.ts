import { ApiProperty } from "@nestjs/swagger";
import * as mongoose from "mongoose"

export const ProductSchema = new mongoose.Schema({
    title: {type:String, require: true},
    description: {type:String, require: true},
    price: {type:Number, require: true}
});

export interface Product extends mongoose.Document{
    id: string; 
    title: string;
    description: string;
    price: number;
}

export class ProductReq {

    @ApiProperty({ type: String, description: 'title' })
    title: number

    @ApiProperty({ type: String, description: 'description' })
    description: number

    @ApiProperty({ type: Number, description: 'price' })
    price: number
}