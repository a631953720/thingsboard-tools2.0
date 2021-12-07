import express from 'express';
import { SERVER } from './constants/env';
import { simpleMsg } from './helpers/loggers';
import { TBUser } from './router';

const app = express();
const { port } = SERVER;

app.use('/TB/user', TBUser);

app.get('/hello', (req, res) => {
    res.send('Hello, World!!');
});

app.listen(port, () => simpleMsg(`http server is running at port ${port}.`));
