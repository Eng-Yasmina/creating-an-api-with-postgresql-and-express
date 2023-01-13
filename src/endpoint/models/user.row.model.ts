import client from "../database_connect";
import bcrypt from 'bcrypt';
import config from "../../env_variables_config/config";

/* CRUD actions for the User table */
//define the Typescript type for user table
export type User = {
    id: Number;
    first_name: string;
    last_name: string;
    password: string;
}

//This class is going to be the representation of the database (postgres ambassador in js)
export class UserModel {
    //create a new user(register)
    // the method needs to be asynchronous because all calls to the database will be promises
    async create(u: User): Promise<User> {
        try {
            //open connection with database
            const connection = await client.connect();
            const sql = `INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *`
            //hash password
            const hash = bcrypt.hashSync(u.password + config.pepper as string, parseInt(config.salt as string, 10));
            //run query
            const result = await connection.query(sql, [
                u.first_name,
                u.last_name,
                hash
            ]);
            //release connection
            connection.release();
            //return created user
            return result.rows[0]
        } catch (error) {
            throw new Error(`Sorry unable to create a new user ${u.first_name}.Error: ${error}`);
            
        }
    }
    //get all users
    async getAllUsers(): Promise<User[]> {
        try {
            //open connection with database
            const connection = await client.connect();
            const sql = `SELECT id, first_name, last_name FROM users`
            //run query
            const result = await connection.query(sql);
            //release connection (close the opened connection after done)
            connection.release();
            //return all users
            return result.rows
        } catch (error) {
            throw new Error(`Sorry unable to find users.Error: ${error}`);
        
        }
    }
    //get specific user
    async getUser(id: Number): Promise<User> {
        try {
            //open connection with database
            const connection = await client.connect();
            const sql = `SELECT id, first_name, last_name FROM users WHERE id= $1`
            //run query
            const result = await connection.query(sql, [id]);
            //release connection
            connection.release();
            return result.rows[0]
        } catch (error) {
            throw new Error(`Sorry unable to  user ${id}.Error: ${error}`);
        
        }
    }
    //delete a user
    async deleteUser(id: Number): Promise<User> {
        try {
            //open connection with database
            const connection = await client.connect();
            const sql = `DELETE FROM users WHERE id= $1`;
            //run query
            const result = await connection.query(sql, [id]);
            //release connection
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Sorry unable to delete user ${id}.Error: ${error}`);
        
        }
    }
    //authenticate(login)
    async authenticate(first_name: string, password: string): Promise<User | null> {
        try {
            const connection = await client.connect();
            const sql = 'SELECT password FROM users WHERE first_name=$1';

            const result = await connection.query(sql, [first_name]);

            if (result.rows.length) {
                if (bcrypt.compareSync(password + config.pepper as string, result.rows[0].password)) {
                    const result2 = await connection.query('SELECT id, first_name, last_name FROM users WHERE first_name=$1', [first_name])
                    return result2.rows[0];
                }
            }
            connection.release();
            return null;
        } catch (error) {
            throw new Error(`Sorry unable to login.Error: ${error}`);
        }
    }
}