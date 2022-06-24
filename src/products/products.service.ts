import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./products.model";

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number) {
        const prodId = new Date().getTime().toString();
        const newProduct = new Product(prodId, title, desc, price);
        this.products.push(newProduct);
        return prodId;
    }


    getProducts() {
        return [...this.products];
    }

    getSingleProduct(productId: string) {
        const [product] = this.findProduct(productId);
        return { ...product };
    }

    updateProduct(productId: string, title: string, desc: string, price: number) {
        const [product, index] = this.findProduct(productId);
        const updateProduct = {... product};
        if(title){
            updateProduct.title = title;
        }

        if(desc){
            updateProduct.description = desc;
        }

        if(price){
            updateProduct.price = price;
        }

        this.products[index] = updateProduct;
    }

    deleteProduct(productId: string,){
        const [_, index] = this.findProduct(productId);
        this.products.splice(index, 1);
    }

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex((prod) => prod.id === id);
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException('Could not find product.');
        }
        return [product, productIndex];
    }
}