//import the type and class from user model
import { User, UserModel } from "../user.row.model";

//instance from the UserModel class
const user = new UserModel;

describe('User Model', () => {
    //test user 
    const u = {
        first_name: 'yasminatest',
        last_name: 'alitest',
        password: 'testo'
    } as User;
    //Create the test user in th database and set an id for it
    beforeAll(async () => {
        const result = await user.create(u);
        u.id=result.id;
    });

    //Test create a user method
    it('should have a create method', () => {
        expect(user.create).toBeDefined();
    });
    it('create method should return the created user', async () => {
        const result = await user.create({
            first_name: 'yasminatest2',
            last_name: 'alitest2',
            password: 'testo2'
        } as User);
        expect(result?.first_name).toBe('yasminatest2');
        expect(result?.last_name).toBe('alitest2');
   
    });


    //Test get all users method
    it('should have a getAllUsers method', () => {
        expect(user.getAllUsers).toBeDefined();
    });
    it('getAllUsers method should return a list of all users', async () => {
        const result = await user.getAllUsers();
        expect(result[0].id).toBe(1);
        expect(result[1].id).toBe(2);;
    });

    //Test get a specific user method
    it('should have a getUser method', () => {
        expect(user.getUser).toBeDefined();
    });
    it('getProduct method should return a specific user by its id', async () => {
        const result = await user.getUser(1);
        expect(result?.first_name).toBe('yasminatest');
        expect(result?.last_name).toBe('alitest');
    });


    //Test authenticate(login) method
    it('should have an authenticate method', () => {
        expect(user.authenticate).toBeDefined();
    });
    //if the user enter the right first_name and the right password, return the info of the user
    it('Authenticate method should return the authenticated user', async () => {
        const result = await user.authenticate(u.first_name, u.password);
        expect(result?.first_name).toBe(u.first_name);
        expect(result?.last_name).toBe(u.last_name);
    });
    //if the user enter the wrong password , return null
    it('Authenticate method should return null for wrong password', async () => {
        const result = await user.authenticate(u.first_name, 'fake');
        expect(result).toBe(null);
    });

    //Test delete product method
    it('should have a deleteUser method', () => {
        expect(user.deleteUser).toBeDefined();
    });
    it('deleteUser method should delete a specific user by its id', async () => {
        const result = await user.deleteUser(1);
        expect(result.id).toBe(1);
    });

});