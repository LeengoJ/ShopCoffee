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
const STATUS = module.exports.STATUS = {
  WAITING: "waiting",
  HANDLED: "handled"
};
const BeforeOrderSchema = new Schema({
    time: { 
      type: Number, 
      required: true,
      default: Date.now() 
    },
    user: { 
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
const BeforeOrder = mongoose.model("BeforeOrders", BeforeOrderSchema);


module.exports = BeforeOrder;

module.exports.ProductItem = ProductItemSchema;

