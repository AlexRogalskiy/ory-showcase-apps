import {AnySchema} from "yup";
import {NextFunction, Request, Response} from "express";
import config from "../../config/default";

const fetch = require("node-fetch");

const validate = (schema: AnySchema) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
        headers: req.headers
    });

    const session_token: string = <string>req.headers.session_token;

    return fetch(config.kratos.public + "sessions/whoami", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Session-Token': session_token
        },
    }).then((oryResponse: any) => {
        if (oryResponse.status !== 200)
            throw oryResponse;
        oryResponse.json().then((oryJson: any) => {
            req.body.oryUser = {
                id: oryJson.identity.id,
                email: oryJson.identity.traits.email,
                verified: oryJson.identity.verifiable_addresses[0].verified
            }
            return next();
        })
    }).catch((errorResponse: any) => {
        errorResponse.json().then((errorJson: any) => {
            return res.status(errorResponse.status).send(errorJson.error.message);
        })
    })
};


export default validate;
