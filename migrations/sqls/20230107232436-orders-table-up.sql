CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES Product(id),
    quantity INTEGER NOT NULL,
    user_id INTEGER REFERENCES Users(id),
    status VARCHAR(60) NOT NULL
)