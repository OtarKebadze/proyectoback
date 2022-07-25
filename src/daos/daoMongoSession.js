const ContainerMongoose = require("../containers/mongooseContainer");
const mongoose = require("mongoose");

const coll = "user";

const schemaProduct = new mongoose.Schema({
    username:{type: String, unique : true ,required: true},
    password:{type: String, required: true},
},{
    timestamps:true,
    __v:false
})
const model = mongoose.model(coll, schemaProduct)

class MongooseUsers extends ContainerMongoose{
    constructor(){
        super(model)
    }
    }

module.exports= MongooseUsers;