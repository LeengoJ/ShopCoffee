var Model = require("../schema/beforeorder.schema");
var Response = require("./ServiceResponse");


module.exports.getOne = async (id)=>{
  try {
      let resAction = await Model.findOne({ _id: id });
      if (resAction == null) {
          return Response.Fail("Đơn đạt hàng không tồi tại"); 
      } else {
          return Response.Success(resAction);
      }
  } catch (err) {
      console.log(err);
      return Response.SystemError();
  } 
}
module.exports.getOneAndPopulateUser = async (id)=>{
  try {
      let resAction = await Model.findOne({ _id: id }).populate("user");
      if (resAction == null) {
          return Response.Fail("Đơn đạt hàng không tồi tại");
      } else {
          return Response.Success(resAction);
      }
          
  } catch (err) {
      console.log(err);
      return Response.SystemError();
  } 
}
module.exports.create = async function(newModel){
  try {
      resAction = await Model.create(newModel);
      return Response.Success({id:resAction._id});
  } catch (err) {
      console.log(err);
      return Response.SystemError();
  }
}
module.exports.update = async (id,modelUpdate) => {  
  try {
      let resAction = await Model.updateOne({ _id: id }, modelUpdate);
      if (resAction.matchedCount != 1) {
          return Response.Fail("Đơn đạt hàng không tồi tại");
      } else {
          return Response.Success({isComplete: true});
      }
  } catch (err) {
      console.log(err);
      return Response.SystemError();
  }
   
}
module.exports.getMany = async (conditions)=>{
  try {
      let resAction = await Model.find(conditions);
      return Response.Success(resAction);
  } catch (err) {
      console.log(err);
      return Response.SystemError();
  } 
}
module.exports.getManyAndPopulateUser = async (conditions)=>{
  try {
      let resAction = await Model.find(conditions).populate("user");
      return Response.Success(resAction);
  } catch (err) {
      console.log(err);
      return Response.SystemError();
  } 
}

