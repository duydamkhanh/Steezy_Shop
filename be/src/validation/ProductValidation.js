import vine from '@vinejs/vine';

const schema = vine.object({
    title: vine.string().minLength(1).maxLength(255),
    thumbnail: vine.string().optional(),
    images: vine.array(vine.string()).optional(),
    price: vine.number().min(1),
    discount: vine.number().min(1),
    category: vine.string().minLength(1),
    stock: vine.number().min(1),
    rating: vine.number().optional(),
    slug: vine.string().optional(),
    description: vine.string().optional()
})

export const productValidation = vine.compile(schema)