var Product = require("../schema/product.schema");

module.exports = {
  CreateProduct: async (item) => {
    const product = new Product(item);
    return await product.save();
  },
  GetAllProduct: async () => {
    let allProduct = await Product.find().exec();
    if (allProduct.length > 0) {
      return allProduct;
    } else {
      return "Khong co Product nao";
    }
  },
  GetProductById: async (item) => {
    let product = await Product.findById(item).exec();
    if (product) {
      return product;
    } else {
      return "Khong co Product nao";
    }
  },
  updatedProduct: async (id, newProduct) => {
    const updatedProduct = await Product.findByIdAndUpdate(id, newProduct, {
      new: true,
    }); // {new: true} để trả về object sau khi cập nhật
    if (updatedProduct.length > 0) {
      return updatedProduct;
    } else {
      return "Khong co Product voi id nay";
    }
  },
  deletedProduct: async (id) => {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (updatedProduct) {
      return "Da xoa thanh cong" + deletedProduct;
    } else {
      return "Khong co Product voi id nay";
    }
  },
  searchByName: async (name) => {
    const product = await Product.find({ name: name });
    if (Product.length > 0) {
      return product;
    } else {
      return "Khong co Product nay";
    }
  },
  updateStatusProduct: async (id, status) => {
    const updateStatus = await Product.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (updateStatus.length > 0) {
      return updateStatus;
    } else {
      return "Khong co Product nay";
    }
  },
};
