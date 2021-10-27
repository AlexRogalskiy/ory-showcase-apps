import {object, string} from "yup";

export const tokenSchema = object({
    headers: object({
        session_token: string().required()
    })
});

export const createUser = object({
    headers: object({
        session_token: string().required()
    }),
    body: object({
        username: string().required(),
        pic_URL: string(),
        description: string().required()
    })
})

