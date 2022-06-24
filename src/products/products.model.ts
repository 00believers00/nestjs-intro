import { ApiProperty } from "@nestjs/swagger";


export class Product {
    constructor(public id: string, public title: string,
        public description: string, public price: number) {

    };
}

export class ProductDTO {

    @ApiProperty({ type: String, description: 'title' })
    title: number

    @ApiProperty({ type: String, description: 'description' })
    description: number

    @ApiProperty({ type: Number, description: 'price' })
    price: number
}