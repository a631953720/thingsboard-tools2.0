import express from 'express';
import notFoundErrorHandler from './middleware/notFoundErrorHandler';
import controllerErrorHandler from './middleware/controllerErrorHandler';
import commonErrorHandler from './middleware/commonErrorHandler';
import { SERVER } from './constants/env';
import { simpleMsg } from './helpers/loggers';
import { TBUser } from './router';

const app = express();
const { port } = SERVER;

app.use('/TB/user', TBUser);
app.get('/hello', (req, res, next) => {
    try {
        throw new Error('1');
    } catch (error) {
        next(error);
    }
});

app.use(notFoundErrorHandler);
app.use(controllerErrorHandler);
app.use(commonErrorHandler);

app.listen(port, () => simpleMsg(`http server is running at port ${port}.`));
