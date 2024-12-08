import { errors } from "@vinejs/vine";
import slugify from "slugify";
import Product from "../models/Product.js";
import { productValidation } from "../validation/ProductValidation.js";


// ! Get All
const getProducts = async (req, res) => {
    try {

        const { query, minPrice, maxPrice, sort } = req.query;
        const filter = {
            $and: [
                query ? {
                    $or: [
                        { title: { $regex: query, $options: 'i' } },
                    ]
                } : {}
            ]
        };

                

        const products = await Product.find(filter).populate('category');

        if (products.length === 0) return res.status(404).json({ data: [], message: 'No data found!!' });

        return res.status(200).json({
            data: products,
            message: `${products.length} records have been found`
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

// ! Get one by id
const getProductById = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id).populate('category');

        // const category = await Category.findById(req.params.id);


        if (product.length === 0) return res.status(404).json({ data: [], message: 'No data found!!' });

        return res.status(200).json({
            data: product
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

// ! Create one
const createProduct = async (req, res) => {
    try {

        const output = await productValidation.validate({
            ...req.body,
            slug: slugify(req.body.title, {
                replacement: '-',
                lower: true,
                strict: true,
                locale: 'vi',
                trim: true
            })
        })

        const result = await Product.create(output);

        return res.status(201).json({
            data: result,
            message: 'Created Successfully!'
        });
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            console.log(error.messages)
        }

        return res.status(500).json(error.message)
    }
}

// * UPDATE BY ID
const updateProductById = async (req, res) => {
    try {

        const output = await productValidation.validate({
            ...req.body,
            slug: slugify(req.body.title, {
                replacement: '-',
                lower: true,
                strict: true,
                locale: 'vi',
                trim: true
            })
        })

        const result = await Product.findByIdAndUpdate(req.params.id, output);

        return res.status(204).json({
            data: result,
            message: 'Updated Successfully!'
        });
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            console.log(error.messages)
        }

        return res.status(500).json(error)
    }
}

//! DELETE BY ID
const deleteProductById = async (req, res) => {
    try {

        const result = await Product.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            data: result,
            message: 'Deleted Successfully!'
        });
    } catch (error) {
        return res.status(500).json({ error })
    }
}



export { createProduct, deleteProductById, getProductById, getProducts, updateProductById };
