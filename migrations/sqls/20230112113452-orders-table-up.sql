CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id bigint REFERENCES Users(id),
    status VARCHAR(50)
)