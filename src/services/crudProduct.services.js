const productModel = require("../models/productModel");

const findOneData = async (data) => {
  try {
    const { name, page, perPage } = data;
    let docCount = 0;
    const found = await productModel
      .findOne({
        name,
      })
      .limit(perPage)
      .skip(perPage * page)
      .lean()
      .exec(
        Event.countDocuments((err, count) => {
          //
          if (err) throw new Error(err);
          docCount = count;
        })
      );
    pageTot = docCount / perPage;
    return { found, pageTot }; //tot Pages = docCount/perPage
  } catch (err) {
    console.error(err);
    return 500;
  }
};

const createData = async (data) => {
  try {
    const { name, number } = data;
    const product = new productModel({
      name,
      number,
    });
    // handle already added errors
    const found = await productModel
      .findOne({
        name,
      })
      .lean()
      .exec();
    if (found != null) return { error: "entry already exists" };
    await product.save();
    return product;
  } catch (err) {
    console.log(err);
    return 500;
  }
};

const deleteData = async (data) => {
  try {
    const { name, number } = data;
    var prod = {};
    if (name && number) {
      prod = { name, number };
    } else if (name) {
      prod = { name };
    } else if (number) {
      prod = { number };
    } else {
      return 400;
    }
    const result = await productModel.findOneAndDelete(prod).lean().exec();
    return result;
  } catch (err) {
    console.error(err);
    return 500;
  }
};

const updateData = async (data) => {
  try {
    const { name, number, newName, newNumber } = data;
    var nName = false;
    var nNum = false;
    if (newUsername) nName = true;
    if (newNumber) nNum = true;
    const filter = {
      name,
      number,
    };
    // constructor for newdata
    var newData = {};
    if (nName && nNum) {
      newData = {
        name: newName,
        number: newNumber,
      };
    } else if (nName) {
      newData = {
        name: newName,
      };
    } else if (nNum) {
      newData = {
        number: newNumber,
      };
    }
    const updated = await productModel
      .findOneAndUpdate(filter, newData, {
        new: true,
      })
      .lean();
    return updated;
  } catch (err) {
    console.error(err);
    return 500;
  }
};

const findAllData = async () => {
  //
  try {
    var found = await productModel
      .find({})
      .limit(perPage)
      .skip(perPage * page)
      .lean()
      .exec(
        Event.countDocuments((err, count) => {
          //
          if (err) throw new Error(err);
          docCount = count / perPage;
        })
      );
    forEachJson(found, ["_id", "__v"]);
    return { found, docCount };
  } catch (err) {
    console.error(err);
    return 500;
  }
};
function forEachJson(json, prop) {
  json.forEach((obj) => {
    trimJSON(obj, prop);
  });
}
function trimJSON(json, propToRemove) {
  //
  propToRemove.forEach((element) => {
    delete json[element];
  });
  return json;
}
module.exports = {
  findOneData,
  findAllData,
  createData,
  deleteData,
  updateData,
};
