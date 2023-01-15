import supertest from 'supertest';
import { Product } from '../../../endpoint/models/product.row.model';
import app from '../../..';
import { utoken } from './userSpec';

// Create a request object (instance of app) to test productsRoutes
const productsRoutes = supertest(app);

describe('Product Route', () => {
  //Test create product method
  it('shuold create a new product', async () => {
    const result = await productsRoutes
      .post('/api/products')
      .set('Content-type', 'application/json')
      .send({ token: `${utoken}` })
      .send({
        name: 'jacket' as string,
        price: 300 as number,
      } as Product);

    expect(result.status).toBe(200);
    expect(result.body.data.name).toBe('jacket');
  });

  //Test gat all products method
  it('shuold get all products', async () => {
    const result = await productsRoutes
      .get('/api/products')
      .set('Content-type', 'application/json');
    expect(result.status).toBe(200);
    expect(result.body.data[0].id).toBe(1);
  });

  //Test select a specific user method
  it('shuold get a specific product', async () => {
    const result = await productsRoutes
      .get(`/api/products/1`)
      .set('Content-type', 'application/json');
    expect(result.status).toBe(200);
    expect(result.body.data.name).toBe('dress');
  });
});
