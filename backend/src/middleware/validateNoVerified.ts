import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
import log from "../logger";
import * as config from "../../config/default";
const fetch = require("node-fetch");

const validate = (schema: AnySchema) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
            headers: req.headers
        });

        const headers = {
            'Content-Type': 'application/json',
            'X-Session-Token': req.headers.session_token
        }

        const response = await fetch(config.default.kratos.public + "/sessions/whoami", {
            method: 'GET',
            headers: headers,
        });

        const oryUser = await(await response).json();

        if(oryUser.error){
            throw new Error(oryUser.error.message);
        }

        req.body.oryUser = {
            id: oryUser.identity.id,
            email: oryUser.identity.traits.email,
            verified: oryUser.identity.verifiable_addresses[0].verified
        }

        return next();
    } catch (e) {
        log.error(e);
        return res.status(401).send(e.message);
    }
};

export default validate;
