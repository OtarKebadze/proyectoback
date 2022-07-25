const ContainerMongoose = require("../../containers/mongooseContainer");
const mongoose = require("mongoose");

const coll = "products";

const schemaProduct = new mongoose.Schema({
    title:{type: String, unique : true ,required: true},
    price:{type: Number, required: true},
    thumbnail:{type: String, required: true},
    stock:{type: Number , required:true}
},{
    timestamps:true,
    __v:false
})
const model = mongoose.model(coll, schemaProduct)

class MongooseProducts extends ContainerMongoose{
    constructor(){
        super(model)
    }
    }

module.exports= MongooseProducts;