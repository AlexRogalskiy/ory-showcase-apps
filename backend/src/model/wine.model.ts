import FirestoreClient from "../db/connect"

class Wine extends FirestoreClient {
    async getAll() {
        return super.getAll("wines");
    }

    async getOne(id  : string) {
        return super.getOne("wines", id);
    }

    async create(input: any) {
        return super.create("wines", input);
    }

    async delete(id: string) {
        return super.delete("wines", id);
    }

    async update(id: string, update: any){
        return super.update("wines", id, update)
    }
}

export default new Wine();
