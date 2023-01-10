import client from "../../database_connect";

/* CRUD actions for the Prodect table */
//define the Typescript type for user table
export type Product = {
    id: Number;
    name: string;
    price: Number;
}

//This class is going to be the representation of the database (postgres ambassador in js)
export class ProductModel {
    //create a new product
    // the method needs to be asynchronous because all calls to the database will be promises
    async create(p: Product): Promise<Product> {
        try {
            //open connection with database
            const connection = await client.connect();
            const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *'
            //run query
            const result = await connection.query(sql, [p.name, p.price]);
            //release connection
            connection.release();
            //return created product
            return result.rows[0]
        } catch (error) {
            throw new Error(`Sorry unable to create a new product ${p.name}.Error: ${error}`);
            
        }
    }
    //get all products
    async getAllProducts(): Promise<Product[]> {
        try {
            //open connection with database
            const connection = await client.connect();
            const sql = `SELECT * FROM products`
            //run query
            const result = await connection.query(sql);
            //release connection
            await connection.release();
            //return all products
            return result.rows
        } catch (error) {
            throw new Error(`Sorry unable to find products.Error: ${error}`);
            
        }
    }
    //get specific product
    async getProduct(id: Number): Promise<Product> {
        try {
            //open connection with database
            const connection = await client.connect();
            const sql = `SELECT * FROM products WHERE id= $1`
            //run query
            const result = await connection.query(sql, [id]);
            //release connection
            await connection.release();
            return result.rows[0]
        } catch (error) {
            throw new Error(`Sorry unable to  product ${id}.Error: ${error}`);
            
        }
    }
    //delete a product
    async deleteProduct(id: Number): Promise<Product> {
        try {
            //open connection with database
            const connection = await client.connect();
            const sql = `DELETE FROM products WHERE id= $1`;
            //run query
            const result = await connection.query(sql, [id]);
            //release connection
            await connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Sorry unable to delete product ${id}.Error: ${error}`);
        }
    }
        
}