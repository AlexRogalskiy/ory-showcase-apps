import {Express} from "express";
import {
    createUserHandler,
    getProfileHandler,
} from "./controller"
import {validate} from "./middleware"
import {
    createUser,
    tokenSchema,
} from "./schema";

export default function (app: Express) {

    // create user
    app.post('/users', validate(createUser), createUserHandler);

    // get a users profile
    app.get("/users/profile", validate(tokenSchema), getProfileHandler)

    // todo: implement all other routes!
}

