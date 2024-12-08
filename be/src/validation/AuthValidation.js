import vine from "@vinejs/vine";

const schema = vine.object({
    email: vine.string().email().minLength(1).maxLength(50),
    username: vine.string().minLength(1).maxLength(50).optional(),
    password: vine.string().minLength(6).maxLength(50)
})

export const authValidation = vine.compile(schema);