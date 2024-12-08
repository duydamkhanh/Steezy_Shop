import express from 'express';
import { login, register } from '../controllers/Auth.js';

const routeAuth = express.Router();

routeAuth.post('/login', login) // Create one
routeAuth.post('/register', register) // Create one

export default routeAuth