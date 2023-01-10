CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    user_id INTEGER REFERENCES Users(id),
    status VARCHAR(50) NOT NULL
)