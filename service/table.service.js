var Table = require("../schema/table.schema");

module.exports = {
  CreateTable: async (item) => {
    const table = new Table(item);
    return await table.save();
  },
  GetAllTable: async () => {
    let allTable = await Table.find().exec();
    if (allTable.length > 0) {
      return allTable;
    } else {
      return "Khong co table nao";
    }
  },
  GetTableById: async (item) => {
    let table = await Table.findById(item).exec();
    if (table) {
      return table;
    } else {
      return "Khong co table nao";
    }
  },
  updatedTable: async (id, newTable) => {
    const updatedTable = await Table.findByIdAndUpdate(id, newTable, {
      new: true,
    }); // {new: true} để trả về object sau khi cập nhật
    if (updatedTable) {
      return updatedTable;
    } else {
      return "Khong co table voi id nay";
    }
  },
  deletedTable: async (id) => {
    const deletedTable = await Table.findByIdAndDelete(id);
    if (updatedTable) {
      return "Da xoa thanh cong" + deletedTable;
    } else {
      return "Khong co table voi id nay";
    }
  },
  searchByName: async (name) => {
    const table = await Table.find({ name: name });
    if (table) {
      return table;
    } else {
      return "Khong co table nay";
    }
  },
  updateStatusTable: async (id, status) => {
    const updateStatus = await Table.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (updateStatus.length > 0) {
      return updateStatus;
    } else {
      return "Khong co table nay";
    }
  },
};
