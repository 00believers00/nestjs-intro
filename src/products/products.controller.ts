import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from "@nestjs/common";
import { ApiBody } from "@nestjs/swagger";
import { ProductReq } from "./products.model";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) { }

    @Post()
    @ApiBody({type:ProductReq})
    async addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ) {

        const generatedId = await this.productService.insertProduct(
            prodTitle,
            prodDesc,
            prodPrice,
        );
        return { id: generatedId };
    }

    @Get()
    async getAllProducts() {
        const products = await this.productService.getProducts();
        return products;
    }

    @Get(':id')
    async getProduct(@Param('id') prodId:string,){
        return await this.productService.getSingleProduct(prodId);
    }
    
    @Patch(':id')
    @ApiBody({type:ProductReq})
    async updateProduct(
        @Param('id') prodId:string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
        ){
        await this.productService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null;
    }

    @Delete(':id')
    async removeProduct(@Param('id') prodId:string,){
        await this.productService.deleteProduct(prodId);
        return null;
    }
}