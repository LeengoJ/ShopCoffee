const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductItemSchema = new Schema(
  {
    id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    name:{
      type: String
    },
    sizes:{
      type:[{
        size:{
          type:String
        },
        price:{
          type:Number
        },
        number:{
          type:Number,
          default:0
        }
      }]
    }
  }
);

const OrderSchema = new Schema(
  {
    createTime: { 
      type: Number, 
      required: true,
      default: Date.now() 
    },
    editTime: { 
      type: Number, 
      required: true,
      default: Date.now() 
    },
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    },
    staff: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    },
    status: { 
      type: String, 
      required: true ,
      default:STATUS.WAITING
    },
    isTakeAway: { 
      type: Boolean, 
      required: true 
    },
    note: { 
      type: String,
    },
    sdt: { 
      type: String,
    },
    discountCode: { 
      type: String, 
    },
    discountPayment:{
      type:Number,
      default:0
    },
    numberTable:{
      type:Number
    },
    numberProducts:{
      type:Number,
      default:0
    },
    totalBill:{
      type:Number,
      default:0
    },
    products:{
      type:[ProductItemSchema],
      default:[]
    }
  }
);
const Order = mongoose.model("Orders", OrderSchema);


module.exports = Order;

module.exports.ProductItem = ProductItemSchema;

const STATUS = module.exports.STATUS = {
  WAITING: "waiting",
  PREPARING: "preparing",
  COMPLETED: "completed",
  CLOSED: "closed",
  CANCELED: "canceled"
};
