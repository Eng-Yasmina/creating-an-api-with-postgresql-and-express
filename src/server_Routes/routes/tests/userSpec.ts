import supertest from 'supertest';
import { User, UserModel } from '../../../endpoint/models/user.row.model';
import app from '../../..';

//instance from the UserModel class
const user = new UserModel();

// Create a request object (instance of app) to test usersRoutes
const usersRoutes = supertest(app);
export let utoken = '' as string;

describe('User Route', () => {
  //Test create user method
  it('shuold create a new user', async () => {
    const result = await usersRoutes
      .post('/api/users')
      .set('Content-type', 'application/json')
      .send({
        first_name: 'yasminatest4' as string,
        last_name: 'alitest4' as string,
        password: 'testo4' as string,
      } as User);

    expect(result.status).toBe(200);
    utoken = `${result.body.data}`;
  });

  //Authenticate user method
  it('shuold return a token after authentication', async () => {
    const result = await usersRoutes
      .post('/api/users/login')
      .set('Content-type', 'application/json')
      .send({
        first_name: 'yasminatest4' as string,
        password: 'testo4' as string,
      } as User);
    expect(result.status).toBe(200);
    expect(result.body.data.user.first_name).toBe('yasminatest4');

  });
  it('shuold return error if entered password is wrong', async () => {
    const result = await usersRoutes
      .post('/api/users/login')
      .set('Content-type', 'application/json')
      .send({
        first_name: 'yasminatest4',
        password: 'testofake',
      } as User);
    //expect error
    expect(result.status).toBe(401);
  });

  //Test select all users method
  it('shuold get all user', async () => {
    const result = await usersRoutes
      .get('/api/users')
      .set('Content-type', 'application/json')
      .send({ token: `${utoken}` });
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(4);
  });

  //Test select a specific user method
  it('shuold get a specific user', async () => {
    const result = await usersRoutes
      .get(`/api/users/4`)
      .set('Content-type', 'application/json')
      .send({ token: `${utoken}` });
    expect(result.status).toBe(200);
    expect(result.body.data.first_name).toBe('yasminatest4');
  });
});
