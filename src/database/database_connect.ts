import config from "../env_variables_config/config";
import { Pool } from "pg";

//database_connection
const client = new Pool({
    port: parseInt(config.dbPort as string, 10),
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

export default client;