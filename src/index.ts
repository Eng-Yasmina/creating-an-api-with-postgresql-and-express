/* Express to run server and routes */
import express, { Application, Request, Response } from 'express';

/* Strartup an instance of the app */
const app: express.Application = express();


/* Setup server */
const port = 1999;
const listeningMsg = () => {
    console.log(`server is running on localhost:${port}`)
};
// Utilize the .listen() method
const server = app.listen(port, listeningMsg);

/* Routes */
// Get Route to respond to the browser's request
const sendData = (req: Request, res: Response) => {
    res.send('Hello From The Other Side.. I Must Have Called A Thousand Times 🎵')
};
app.get('/', sendData);

export default app;
