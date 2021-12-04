import express from 'express';
import ENV from './constants/env';
import loggers from './helpers/loggers';

const app = express();
const { port } = ENV.Server;

app.get('/', (req, res) => {
    res.send('Hello, World!!');
});

app.listen(
    port,
    () => loggers.showSimpleMessage(`http server is running at port ${port}.`),
);
