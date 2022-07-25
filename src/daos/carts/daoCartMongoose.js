const ContainerMongoose = require("../../containers/mongooseContainer");
const {mongoose} = require("mongoose");
const coll = "cart";

const schemaCart = new mongoose.Schema({
    products: Array
},{
    timestamps:true,
    __v:false
})

const model = mongoose.model(coll , schemaCart)

class MongooseCart extends ContainerMongoose{
    constructor(){
        super(model)
    }
    async createCart(){
        const cart = new model()
        return cart;
    }
    async addProd(id, prod){
    console.log(prod)
    await this.update(id,prod)
    }
}
    module.exports = MongooseCart;