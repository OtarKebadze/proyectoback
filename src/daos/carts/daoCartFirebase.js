const ContainerFirebase = require("../../containers/firebaseContainer");

class FirebaseCart extends ContainerFirebase{
constructor(){
    super("cart")
}   
    async createCart(){
        let cart = {
            created:new Date(),
            products:[]
        }
        return cart
    }
    async addProd(id, prod){
    await this.update(id,prod)
    }
}

module.exports= FirebaseCart;