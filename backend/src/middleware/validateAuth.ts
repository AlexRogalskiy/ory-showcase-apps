import {AnySchema} from "yup";
import {Request, Response, NextFunction} from "express";
import log from "../logger";
import * as config from "../../config/default";

const fetch = require("node-fetch");

type user = {
    id: string
    traits: {
        email: string
    }
    verifiable_addresses: {
        verified: boolean
    }[]
}

const isUser = (u: any): u is user => {
    return true
}

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

        return fetch(config.default.kratos.public + "/sessions/whoami", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Session-Token': session_token
            },
        }).then((whoami: any) => whoami.json()).then(
            (oryUser: any) => {
                if (isUser(oryUser.identity)) {
                    req.body.oryUser = {
                        id: oryUser.identity.id,
                        email: oryUser.identity.traits.email,
                        verified: oryUser.identity.verifiable_addresses[0].verified
                    }
                }
                return next()
            }
        ).catch((whoami: any) => res.status(whoami.statusCode).send());
    }
;

export default validate;
