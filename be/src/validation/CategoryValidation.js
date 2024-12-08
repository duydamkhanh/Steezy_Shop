import vine from '@vinejs/vine';

const schema = vine.object({
    name: vine.string().minLength(1).maxLength(50),
    slug: vine.string()
})

export const categoryValidation = vine.compile(schema)