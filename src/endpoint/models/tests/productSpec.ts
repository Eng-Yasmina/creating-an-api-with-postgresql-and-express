//import the type and class from product model
import { Product, ProductModel } from "../product.row.model";

//instance from the ProductModel class
const product = new ProductModel;


describe('Product Model', () => {
    //Test create a product method
    it('should have a create method', () => {
        expect(product.create).toBeDefined();
    });
    it('create method should return the created product', async () => {
        const result = await product.create({
            name: 'dress',
            price: 200 as Number
        } as Product);
        expect(result?.name).toBe('dress');
   
    });


    //Test get all products method
    it('should have a getAllProducts method', () => {
        expect(product.getAllProducts).toBeDefined();
    });
    it('getAllProducts method should return a list of all users', async () => {
        const result = await product.getAllProducts();
        expect(result[0].id).toBe(1);
    });

    //Test get a specific product method
    it('should have a getProduct method', () => {
        expect(product.getProduct).toBeDefined();
    });
    it('getProduct method should return a specific product by its id', async () => {
        const result = await product.getProduct(1);
        expect(result?.name).toBe('dress');
    });

    //Test delete product method
    it('should have a deleteProduct method', () => {
        expect(product.deleteProduct).toBeDefined();
    });
    it('deleteProduct method should delete a specific product by its id', async () => {
        const result = await product.deleteProduct(1);
        expect(result.id).toBe(1);
    });
});