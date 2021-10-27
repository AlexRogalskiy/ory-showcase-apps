import {Firestore} from "@google-cloud/firestore"

class FirestoreClient {
    firestore: Firestore;
    constructor() {
        this.firestore = new Firestore({
            projectId: 'wine-companion-320511',
            keyFilename: process.cwd() + '/build/src/db/wc-key.json'
        })
    }

    async getAll(collection: string){
        const docRef = this.firestore.collection(collection);
        const snapshot = await docRef.get();
        let arr: any[] = []
        snapshot.forEach(doc => {
            arr.push(doc.data())
        })
        return arr;
    }

    async getOne(collection: string, id: string){
        const docRef = this.firestore.collection(collection).doc(id);
        const user = await docRef.get();
        if (!user.exists){
            throw new Error("Document not found");
        } else {
            return user.data();
        }
    }

    async create(collection: string, input: any){
        const docRef = this.firestore.collection(collection).doc(input.id);
        if((await docRef.get()).exists){
            throw new Error("Document already exists");
        } else {
            await docRef.set(input);
        }
    }

    async delete(collection: string, id: string){
        const docRef = this.firestore.collection(collection).doc(id);
        if((await docRef.get()).exists){
            await docRef.delete();
        } else {
            throw new Error("Document does not exist");
        }
    }

    async update(collection: string, id: string, update: any) {
        const docRef = this.firestore.collection(collection).doc(id);
        if((await docRef.get()).exists){
            await docRef.update(update);
        } else {
            throw new Error("Document does not exist")
        }
    }
}

export default FirestoreClient;
