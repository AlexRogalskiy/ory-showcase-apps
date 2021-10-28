import {Request, Response} from "express";

export async function getProfileHandler(req: Request, res: Response) {
    try {
        return res.status(200).json(req.body.oryUser);
    } catch (e: any) {
        return res.sendStatus(500);
    }
}
