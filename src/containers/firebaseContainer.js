const admin = require("firebase-admin");
const serviceAccount = require("../../firebase.json");

class ContainerFirebase {
    constructor(coll){
      this.connect();
      const db=admin.firestore();
      this.query = db.collection(coll)
    }
    async connect(){
      if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: "https://fir-backend-d8bd4.firebaseio.com"
        });
    console.log("Connected to FIREBASE!")
  }}
    async save(obj){
      const collection= this.query.doc();
      await collection.create(obj)
      console.log("CREATING WITH ID: ", collection.id)
    }
    async getById(id){
      let doc = this.query.doc(`${id}`);
      const item = await doc.get();
      const response= item.data();
      return response
    }
    async getAll(){
      const results = (await this.query.get()).docs;
      return results.map(res=> res.data())
    }
    async deleteById(id){
      let doc = this.query.doc(`${id}`);
      await doc.delete()
    }
    async deleteAll(){
    console.log("IMPOSSIBLE, please delete one by one")
}
    async update(id , obj){
        try{
            const doc = this.query.doc(`${id}`);
            let item = await doc.update(obj);
            return item;
        }
        catch(err) {
            console.log(`ERROR: ${err}`);
        } 
    }
}
module.exports = ContainerFirebase;