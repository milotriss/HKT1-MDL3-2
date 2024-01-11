import express from 'express';
import userController from './users.controller';


const Controller = (server:express.Express) => {
    server.use('/api/v1/users',userController)
}
export default Controller