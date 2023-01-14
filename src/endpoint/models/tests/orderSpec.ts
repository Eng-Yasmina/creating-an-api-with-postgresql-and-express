import { Order, OrderProducts, OrderModel } from "../order.row.model";
import { User, UserModel } from "../user.row.model";
import { Product, ProductModel } from "../product.row.model";

//instance from the ProductModel class
const order = new OrderModel;
const user = new UserModel;
const product = new ProductModel;


describe('Order Model', () => {
    beforeAll(async () => {
        await user.create({
            first_name: 'yasminatest',
            last_name: 'alitest',
            password: 'testo'
        } as User);
        
        await product.create({
            name: 'dress',
            price: 200 as number
        } as Product)
        
    })
    //Test create a user method
    it('should have a create method', () => {
        expect(order.create).toBeDefined();
    });
    it('create method should return the created order', async () => {
        const result = await order.create({
            userId: 1 as number,
            status: 'active'
        } as Order);
        expect(result?.status).toBe('active');
    });

    //Test add orders to a spesific product or add  products to a spesific order
    it('should have a addProduct method', () => {
        expect(order.addProduct).toBeDefined();
    });
    it('addProduct method should return the added productes and its quantity', async () => {
        const oproduct = {
            quantity: 1 as number,
            orderId: 1 as number,
            productId: 1 as number
        } as OrderProducts;
        const result = await order.addProduct(
            oproduct.quantity,
            oproduct.orderId,
            oproduct.productId
        );
        expect(result?.quantity).toBe(1);
    });
});