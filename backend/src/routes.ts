import {Express} from "express";
import {
    getProfileHandler,
} from "./controller"
import {validate} from "./middleware"
import {
    tokenSchema,
} from "./schema";

export default function (app: Express) {

    // get a users profile
    app.get("/users/profile", validate(tokenSchema), getProfileHandler)

}

