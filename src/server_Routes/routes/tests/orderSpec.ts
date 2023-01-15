import supertest from "supertest";
import { Order, OrderProducts } from "../../../endpoint/models/order.row.model";
import app from "../../..";
import { utoken } from "./userSpec";

// Create a request object (instance of app) to test ordersRoutes 
const ordersRoutes = supertest(app);


describe('Order Route', () => {

    //Test gat all products of the current order by the user method
    it('shuold get all products of the current order by the user', async () => {
        const result = await ordersRoutes.get('/api/orders/current').set('Content-type', 'application/json').send({ token: `${utoken}` }).send({
            userId: 1
        }as Order)
        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(1);
    
    });

}); 