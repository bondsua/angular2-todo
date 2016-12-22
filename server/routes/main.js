import express from 'express';
import todoRoute from './todo';

const mainRout = express.Router();

mainRout.use('/todos', todoRoute);

export default mainRout;
