import express from 'express';
import env from './constants/env';
import { simpleMsg } from './helpers/loggers';

const app = express();
const { port } = env.Server;

app.get('/', (req, res) => {
    res.send('Hello, World!!');
});

app.listen(
    port,
    () => simpleMsg(`http server is running at port ${port}.`),
);
