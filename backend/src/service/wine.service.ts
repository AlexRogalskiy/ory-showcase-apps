import Wine from "../model/wine.model";
import { Request } from "express"

export async function createWine(body: any){
    try{
        const wine = body.wine;
        wine.author = body.oryUser.id;
        return await Wine.create(wine);
    } catch (e) {
        throw new Error(e);
    }
}

export async function getAllWines(){
    try{
        return await Wine.getAll();
    } catch(e) {
        throw new Error(e);
    }
}

export async function getWine(input: any){
    try{
        return await Wine.getOne(input)
    } catch (e) {
        throw new Error(e)
    }
}

export async function deleteWine(id: string){
    try{
        return await Wine.delete(id);
    } catch (e) {
        throw new Error(e);
    }
}

export async function updateWine(req: Request){
    try{
        delete req.body["oryUser"];
        await Wine.update(req.params.id, req.body);
    } catch (e) {
        throw new Error(e);
    }
}
