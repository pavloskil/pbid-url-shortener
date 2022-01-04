import express from 'express';
import createUrlController from './createUrlController';
import listUrlController from './listUrlController';
import defaultController from '../defaultController';

const router = express.Router();

router.get('/list', listUrlController);
router.post('/add', createUrlController);

router.use('*', defaultController);

export default router;