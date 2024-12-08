import mongoose, { Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
    },
    // products: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Product'
    // }]
},
    { timestamps: true, versionKey: false }
);

categorySchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'category'
})

// Kích hoạt tính năng virtual
categorySchema.set('toObject', { virtuals: true });
categorySchema.set('toJSON', { virtuals: true });

categorySchema.plugin(mongoosePaginate);

export default mongoose.model('Category', categorySchema);