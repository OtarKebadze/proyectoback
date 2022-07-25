const mongoose = require("mongoose");

class ContainerMongoose {
  constructor(model) {
    this.connect();
    this.schema = model;
  }
  async connect() {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("Connected to MONGODB");
  }
  async save(obj) {
    let col = await this.schema.create(obj);
    await col.save();
  }
  async getById(id) {
    return await this.schema.find({ _id: id }).lean();
  }
  async getAll() {
    return await this.schema.find({}).lean();
  }
  async deleteById(id) {
    await this.schema.deleteOne({ _id: id });
  }
  async deleteAll() {
    await this.schema.deleteMany({});
  }
  async update(id, obj) {
    return await this.schema.updateOne(
      { _id: id },
      { $set: { products: obj } }
    );
  }
}

module.exports = ContainerMongoose;
