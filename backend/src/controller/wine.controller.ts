import { Request, Response } from "express";
import log from "../logger";
import {createWine, deleteWine, getAllWines, getWine, updateWine} from "../service/wine.service";

export async function createWineHandler(req: Request, res: Response) {
    try {
        await createWine(req.body);
        return res.sendStatus(200);
    } catch (e) {
        log.error(e.message);
        return res.status(409).send(e.message);
    }
}

export async function getALlWinesHandler(req: Request, res: Response){
    try {
        return res.status(200).json(await getAllWines())
    } catch (e) {
        log.error(e.message);
        return res.status(500).send(e.message);
    }
}

export async function getOneWineHandler(req: Request, res: Response) {
    try {
        return res.status(200).json(await getWine(req.params.id))
    } catch (e) {
        log.error(e.message);
        return res.status(404).send(e.message);
    }
}

export async function deleteWineHandler(req: Request, res: Response) {
    try {
        await deleteWine(req.params.id)
        return res.sendStatus(204);
    } catch(e) {
        log.error(e.message);
        return res.status(500).send(e.message);
    }
}

export async function updateWineHandler(req: Request, res: Response){
    try{
        await updateWine(req);
        return res.sendStatus(204);
    } catch (e) {
        log.error(e.message);
        return res.status(500).send(e.message);
    }
}
