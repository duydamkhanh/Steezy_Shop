import express from 'express';
import { createProduct, deleteProductById, getProductById, getProducts, updateProductById } from '../controllers/Product.js';

const routeProduct = express.Router();

routeProduct.get('/', getProducts) // Get All
routeProduct.get('/:id', getProductById) // Get One
routeProduct.post('/', createProduct) // Create one
routeProduct.delete('/:id', deleteProductById) // Delete One
routeProduct.put('/:id', updateProductById) // Update One


export default routeProduct