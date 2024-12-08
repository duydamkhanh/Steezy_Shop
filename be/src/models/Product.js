import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
    },
    images: Array,
    price: {
        type: Number,
        required: true,
        default: 0
    },
    discount: Number,

    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    rating: Number,
    slug: {
        type: String,
        required: true,
    },
    description: String,
    isFavorite: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true, versionKey: false }
);

export default mongoose.model('Product', productSchema);