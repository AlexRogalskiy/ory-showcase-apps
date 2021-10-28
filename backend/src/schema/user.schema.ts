import {object, string} from "yup";

export const tokenSchema = object({
    headers: object({
        session_token: string().required()
    })
});
