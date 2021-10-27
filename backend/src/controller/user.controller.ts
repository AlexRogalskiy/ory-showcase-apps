import {Request, Response} from "express";
import log from "../logger";
import {createUser, getUser} from "../service/user.service";

export async function createUserHandler(req: Request, res: Response) {
    try {
        await createUser(req.body);
        return res.sendStatus(200);
    } catch (e: any) {
        log.error(e.message);
        return res.status(e.code).send(e.message);
    }
}

export async function getProfileHandler(req: Request, res: Response) {
    try {
        return res.status(200).json(await getUser(req.body.oryUser.id));
    } catch (e: any) {
        log.error(e.message);
    }
}
