import Category from "../models/Category.js"
import slugify from 'slugify'
import { errors } from '@vinejs/vine'
import { categoryValidation } from "../validation/CategoryValidation.js";

// * GET ALL
const getCategories = async (req, res) => {
    try {

        const {
            _page = 1,
            _limit = 10,
            _sort = "createdAt",
            _order = "asc"
        } = req.query;

        const options = {
            page: _page,
            limit: _limit,
            sort: {
                [_sort]: _order === "asc" ? 1 : -1
            }
        }

        const result = await Category.paginate({}, options);

        if (result?.docs.length === 0)
            return res
                .status(404)
                .json({ message: "No data available!" })

        return res.status(200).json({
            data: result?.docs
        });
    } catch (error) {
        return res.status(500).json({ error })
    }
}

// * GET ONE
const getCategoryById = async (req, res) => {
    try {
        const result = await Category.findById(req.params.id).populate('products').exec();

        if (!result) // Kiểm tra xem category có tồn tại hay không
            return res
                .status(404)
                .json({ message: "No data available!" });

        return res.status(200).json({
            data: result
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

// * CREATE
const createCategory = async (req, res) => {
    try {

        const output = await categoryValidation.validate({
            name: req.body.name,
            slug: slugify(req.body.name, {
                replacement: '-',
                lower: true,
                strict: true,
                locale: 'vi',
                trim: true
            })
        })

        const result = await Category.create(output);

        return res.status(201).json({
            data: result,
            message: 'Created Successfully!'
        });
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            console.log(error.messages)
        }

        return res.status(500).json(error)
    }
}

// * UPDATE BY ID
const updateCategoryById = async (req, res) => {
    try {

        const output = await categoryValidation.validate({
            name: req.body.name,
            slug: slugify(req.body.name, {
                replacement: '-',
                lower: true,
                strict: true,
                locale: 'vi',
                trim: true
            })
        })

        const result = await Category.findByIdAndUpdate(req.params.id, output);

        return res.status(204).json({
            data: result,
            message: 'Updated Successfully!'
        });
    } catch (error) {

        if (error instanceof errors.E_VALIDATION_ERROR) {
            console.log(error.messages)
        }
        
        return res.status(500).json({ error })
    }
}

// * DELETE BY ID
const deleteCategoryById = async (req, res) => {
    try {
        const idCategory = req.params.id;


        const result = await Category.findByIdAndDelete(idCategory);

        return res.status(200).json({
            data: result,
            message: 'Deleted Successfully!'
        });
    } catch (error) {
        return res.status(500).json({ error })
    }
}

export { getCategories, getCategoryById, createCategory, updateCategoryById, deleteCategoryById }