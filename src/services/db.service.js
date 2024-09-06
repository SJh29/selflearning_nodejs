const mongoose = require("mongoose");
class dbService {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    try {
      const doc = new this.model(data);
      doc.validateSync();
      return await doc.save();
    } catch (error) {
      throw new Error(`DB_ERROR_CREATE: ${error}`);
    }
  }

  async find(filter = {}) {
    //
    try {
      return await this.model.find(filter).lean().exec();
    } catch (error) {
      throw new Error(`DB_ERROR_FIND: ${error}`);
    }
  }
  async findById(_id) {
    try {
      return await this.model.findById(_id).lean().exec();
    } catch (error) {
      throw new Error(`DB_ERROR_FINDBYID: ${error}`);
    }
  }
  async findOne(filter = {}) {
    try {
      return await this.model.findOne(filter).lean().exec();
    } catch (error) {
      throw new Error(`DB_ERROR_FINDMANY: ${error}`);
    }
  }

  async deleteOne(filter) {
    try {
      return await this.model.deleteOne(filter).exec();
    } catch (error) {
      throw new Error(`DB_ERROR_DELETEONE: ${error}`);
    }
  }
  async deleteMany(filter) {
    try {
      return await this.model.deleteMany(filter).exec();
    } catch (error) {
      throw new Error(`DB_ERROR_DELETEMANY: ${error}`);
    }
  }
  async update(filter, data) {
    try {
      return await this.model
        .findOneAndUpdate(filter, data, { new: true })
        .lean()
        .exec();
    } catch (error) {
      throw new Error(`DB_ERROR_UPDATE: ${error}`);
    }
  }
}

module.exports = dbService;
