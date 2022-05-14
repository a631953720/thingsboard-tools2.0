import express from 'express';
import getTBAdminToken from './middleware/getTBAdminToken.middleware';
import notFoundErrorHandler from './middleware/notFoundError.middleware';
import controllerErrorHandler from './middleware/controllerError.middleware';
import commonErrorHandler from './middleware/commonError.middleware';
import { SERVER } from './constants/env';
import { simpleMsg } from './helpers/loggers';
import { TBUser, TBDevice } from './router';

const app = express();
const { port } = SERVER;

app.use(express.json());
app.use(getTBAdminToken);

app.use('/TB/user', TBUser);
app.use('/TB/device', TBDevice);
app.get('/hello', (_req, res, next) => {
  try {
    // throw new Error('1');
    res.status(200).send('hi');
  } catch (error) {
    next(error);
  }
});

app.use(notFoundErrorHandler);
app.use(controllerErrorHandler);
app.use(commonErrorHandler);

app.listen(port, () => simpleMsg(`http server is running at port ${port}.`));
