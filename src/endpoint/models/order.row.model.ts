import client from '../database_connect';

/* CRUD actions for the Prodect table */
//define the Typescript type for order table
export type Order = {
  id: number;
  userId: number;
  status: string;
};

//define the Typescript type for order_products table
export type OrderProducts = {
  id: number;
  quantity: number;
  orderId: number;
  productId: number;
};

export class OrderModel {
  //create a new user order
  // the method needs to be asynchronous because all calls to the database will be promises
  async create(o: Order): Promise<Order> {
    try {
      //open connection with database
      const connection = await client.connect();
      const sql =
        'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
      //run query
      const result = await connection.query(sql, [o.userId, o.status]);
      //release connection
      connection.release();
      //return created ORDER
      return result.rows[0];
    } catch (error) {
      throw new Error(`Sorry unable to create a new order.Error: ${error}`);
    }
  }

  //add orders to a spesific product or add  products to a spesific order
  async addProduct(
    quantity: number,
    orderId: number,
    productId: number
  ): Promise<OrderProducts> {
    // get order to see if it is active
    try {
      const ordersql = 'SELECT * FROM orders WHERE id = $1';
      const connection = await client.connect();

      const result = await connection.query(ordersql, [orderId]);

      const order = result.rows[0];

      //status is a switch (1 means active)
      if (order.status !== 'active') {
        throw new Error(
          `Sorry unable to add product ${productId} to order ${orderId} because order is closed`
        );
      }

      connection.release();
    } catch (err) {
      throw new Error(`${err}`);
    }
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';

      const result = await connection.query(sql, [
        quantity,
        orderId,
        productId,
      ]);

      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Sorry unable to add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }

  //get current order by user
  async getCurrentOrderByUser(userId: number): Promise<OrderProducts[] | null> {
    try {
      const sql = 'SELECT * FROM orders WHERE user_id=$1';
      const connection = await client.connect();

      const result = await connection.query(sql, [userId]);
      if (result.rows.length) {
        const status = 'active';
        const sql = `SELECT * FROM orders WHERE status=$1 ORDER BY id DESC`;

        const result2 = await connection.query(sql, [status]);

        const currentOrderId = result2.rows[0].id;
        const ordersql = `SELECT * FROM order_products WHERE order_id=${currentOrderId}`;
        //return products of the current active order by the user
        const result3 = await connection.query(ordersql);
        return result3.rows;
      }
      connection.release();
      return null;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  //get completed order by user
  async completedOrdersByUser(userId: number): Promise<Order[] | null> {
    try {
      const sql = `SELECT * FROM orders WHERE user_id=$1`;
      const connection = await client.connect();

      const result = await connection.query(sql, [userId]);
      if (result.rows.length) {
        const status = 'complete';
        const sql = `SELECT * FROM orders WHERE status=$1`;

        const result2 = await connection.query(sql, [status]);
        //return the completed orders by the user .. guess what! i did it.. thank you udacity.. now i became an e-commerce's api expert ;)
        return result2.rows;
      }
      connection.release();
      return null;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}
