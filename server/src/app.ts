import express  from 'express';
import cors from 'cors';
import bodyParser  from 'body-parser';
import urlRouter from './controllers/url';
import defaultController from './controllers/defaultController';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/url', urlRouter);
app.use('*', defaultController);

export default app;