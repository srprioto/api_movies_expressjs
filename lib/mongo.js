require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb')

const USER = encodeURIComponent(process.env.DB_USER);
const PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.PORT;

// const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?retryWrites=true&w=majority`;
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {

    constructor() {
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        // this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
        this.dbName = DB_NAME;
    }
  
    connect() {
        if (!MongoLib.connection) { // verifica si ya existe conexion

            MongoLib.connection = new Promise((resolve, reject) => { // la conexion requiere una promesa

                this.client.connect(err => {

                    if (err) {
                        reject(err); // verifica error en caso de que exista
                    }
        
                    console.log('Connected succesfully to mongo');
                    resolve(this.client.db(this.dbName)); // si no hay conexion, resolvemos la promesa con una conexion

                });

            });
        }
  
        return MongoLib.connection; // si la conexion existe, devolvemos la conexion existente
    }


    getAll(collection, query){
        return this.connect().then(db => {
            return db.collection(collection).find(query).toArray();
        })
    }

    get(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).findOne({ _id: ObjectId(id) });
        });
    }

    create(collection, data){
        return this.connect().then(db => {
            return db.collection(collection).insertOne(data)
        })
        .then(result => result.insertedId)
    }

    update(collection, id, data){
        return this.connect().then(db => {
            return db.collection(collection).updateOne({_id: ObjectId(id)}, { $set: data }, { upsert:true } )
        })
        .then(result => result.upsertedId || id)
    }

    delete(collection, id){
        return this.connect().then(db => {
            return db.collection(collection).deleteOne({_id: ObjectId(id)})
        })
        .then(() => id)
    }

}
  
module.exports = MongoLib;