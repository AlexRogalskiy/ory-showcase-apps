import FirestoreClient from "../db/connect"

class User extends FirestoreClient {
    async getAll() {
        return super.getAll("users");
    }

    async getOne(id  : string) {
        return super.getOne("users", id);
    }

    async create(input: any) {
        input["wineCount"] = 0;
        input["winesSnippets"] = [];
        input["wines"] = [];
        return super.create("users", input);
    }

    async update(id: string, changes: any){
        return super.update("users", id, changes)
    }

    async delete(id: string) {
        return super.delete("users", id);
    }
}

export default new User();
