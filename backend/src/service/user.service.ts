import User from "../model/user.model";
import {createUser} from "../types/users";
import log from "../logger";
import * as config from "../../config/default";
const fetch = require("node-fetch")

export async function createUser(body: createUser) {
    try {
        return await User.create(
            {
                id: body.oryUser.id,
                email: body.oryUser.email,
                username: body.username,
                description: body.description,
                pic_URL: "" // todo convert and store
            }
        );
    } catch (e) {
        log.error(e.message);
        throw new Error(e.message);
    }
}

export async function getAllUsers(input: any) {
    try {
        return await User.getAll();
    } catch (e) {
        throw new Error(e.message);
    }
}

export async function getUser(input: any) {
    try {
        return await User.getOne(input)
    } catch (e) {
        throw new Error(e.message)
    }
}

export async function updateUser(id: string, changes: any) {
    try {
        let clearedChanges: any = {};
        if (changes.username) {
            clearedChanges.username = changes.username;
        } else if (changes.description) {
            clearedChanges.description = changes.description;
        }
        await User.update(id, clearedChanges)
    } catch (e) {
        throw new Error(e)
    }
}

export async function deleteUser(id: string) {
    try {
        // deleting user from ORY
        const response = await fetch(config.default.kratos.public + "/identities/" + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.ORY_ADMIN_ACCESS_TOKEN
            },
        });

        await User.delete(id);
        return;
    } catch (e) {
        throw new Error(e);
    }
}
