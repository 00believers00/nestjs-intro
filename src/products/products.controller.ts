import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from "@nestjs/common";
import { ApiBody, ApiProperty } from "@nestjs/swagger";
import { type } from "os";
import { ProductDTO } from "./products.model";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) { }

    @Post()
    @ApiBody({type:ProductDTO})
    addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ) {

        const generatedId = this.productService.insertProduct(
            prodTitle,
            prodDesc,
            prodPrice,
        );
        return { id: generatedId };
    }

    @Get()
    getAllProducts() {
        return { products: this.productService.getProducts() };
    }

    @Get(':id')
    getProduct(@Param('id') prodId:string,){
        return this.productService.getSingleProduct(prodId);
    }
    
    @Patch(':id')
    @ApiBody({type:ProductDTO})
    updateProduct(
        @Param('id') prodId:string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
        ){
        this.productService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null;
    }

    @Delete(':id')
    removeProduct(@Param('id') prodId:string,){
        this.productService.deleteProduct(prodId);
        return null;
    }
}