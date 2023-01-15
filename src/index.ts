/* Express to run server and routes */
import express, { Request, Response } from 'express';
import morgan from 'morgan';
//Helmet to secure my express
import helmet from 'helmet';
// Body-parser to handle the post request
import bodyParser from 'body-parser';
// configure Environment Variables
import config from './env_variables_config/config';
import routes from './server_Routes/routes';

/* Strartup an instance of the app */
const app: express.Application = express();

/* Middleware*/
//HTTP request logger middleware
app.use(morgan('common'));
//HTTP security middleware
app.use(helmet());
//Configure express to use body-parser as middle-ware
app.use(bodyParser.json());

/* Setup server */
const port = config.port || 1999;
const listeningMsg = () => {
  console.log(`server is running on localhost:${port}`);
};
// Utilize the .listen() method
app.listen(port, listeningMsg);

/* Routes */
app.use('/api', routes);
// Get Route to respond to the browser's request
const sendData = (req: Request, res: Response) => {
  res.send(
    'Hello From The Other Side.. I Must Have Called A Thousand Times 🎵'
  );
};
app.get('/', sendData);

export default app;
