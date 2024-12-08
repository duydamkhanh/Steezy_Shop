import mongoose, { Schema } from 'mongoose';

const wishlistSchema = new Schema({
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    user: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Auth'
        }
    ],
},
    { timestamps: true, versionKey: false }
);