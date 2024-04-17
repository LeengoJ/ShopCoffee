const BeforeOrderService = require("../service/beforeorder.service"); //Import dịch vụ liên quan đến user
const OrderService = require("../service/order.service"); //Import dịch vụ liên quan đến user
const BeforeOrderModel = require("../schema/beforeorder.schema"); //Import dịch vụ liên quan đến user
const OrderModel = require("../schema/order.schema"); //Import dịch vụ liên quan đến user
const handleResult = require("../helper/handleResult"); //helper chứa hàm showResult
const ServiceResponse = require('../service/ServiceResponse');


const findDiscount = function(discounts, discountCode, productId){
    discounts.forEach(discount => {
        if(discount.startTime<=Date.now()||discount.endTime>=Date.now){
            if(discount.code==discountCode){
                if(Array.isArray(discount.products)){
                    if(discount.products.indexOf(productId)!=-1){
                        return discount;
                    }
                }else{
                    if(discount.products==productId){
                        return discount;
                    }
                }
            }
        }
    });
    return null;
}

const getPriceOfSizes = function(sizes, size){
    sizes.split(";").forEach(e=>{
        let plt = e.split(":");
        if(plt[0]==size){
            return parseInt(plt[1]);
        }
    });
    return null;
}
const findProduct = function(products, productId){
    let product = products.find(p=>p.productId==productId);
    if(product){
        return product;
    }
    return null;
}

const addSizeToProduct = (products, productId, name,size,number,price)=>{
    let product = products.find(p=>p.id==productId);
    if(product){
        if(product.sizes){
            product.sizes.push({
                size:size,
                number:number,
                price:price
            });
        }else{
            product.sizes = [{
                size:size,
                number:number,
                price:price
            }];
        }
    }else{
        products.push({
            id:productId,
            name:name,
            sizes:[{
                size:size,
                number:number,
                price:price
            }]
        });
    }
    return products;
}

module.exports.create = async (req,res) => {
    try {
        const idUser = req.user.id;

        //get discounts now
        const discountsNow = [];
        //get products now
        const productsNow = [];

        const {tableNumber,isTakeAway,sdt,note,discountCode} = req.body;
        const productsReq =  req.body.products;
        
        let productsDetails = [];
        let discountPayment=0;
        let totalPrice = 0;
        let numberProducts = 0;

        productsReq.split(';').map(productReq => {
            let sizeSplit = productReq.split(':');
            let productId = sizeSplit[0];
            let size = sizeSplit[2];
            let number = parseInt(sizeSplit[3]);

            let product = findProduct(productsNow,productId);
            if(product){
                let price = getPriceOfSizes(product.sizes, size);
                if(price){
                    productsDetails = addSizeToProduct(productsDetails,productId,product.name,size,number,price);
                
                    totalPrice += price*number;
                    numberProducts += number;

                    let discount = findDiscount(discountsNow, discountCode,productId);
                    if(discount){
                        discountPayment += price*number*discount.discountPercent/100;
                    }
                }
            }
        });

        discountPayment = parseInt(discountPayment);

        const newBeforeOrder = new BeforeOrderModel();
        newBeforeOrder.isTakeAway = isTakeAway=="true"?true:false;
        newBeforeOrder.note = note;
        newBeforeOrder.discountCode = discountCode;
        newBeforeOrder.discountPayment = discountPayment;
        newBeforeOrder.totalBill = totalPrice-discountPayment;
        newBeforeOrder.numberProducts = numberProducts;
        newBeforeOrder.products = productsDetails;
        newBeforeOrder.numberTable = tableNumber;
        newBeforeOrder.user = idUser;

        let resAction = await BeforeOrderService.create(newBeforeOrder);
        if (!resAction.isSuccess) {
            handleResult.fail(res,resAction.error);
            return;
        }
        handleResult.success(res,{newId:resAction.data.id});
    }  
    catch (error) {  
        console.log(error);
        handleResult.systemError(res);
    }  
}

module.exports.getList = async (req,res) => {
    try {
        let resAction = await BeforeOrderService.getManyAndPopulateUser({});
        if (!resAction.isSuccess) {
            handleResult.fail(res,resAction.error);
            return;
        }
        let beforeOrders = resAction.data;
        beforeOrders = beforeOrders.map(before=>{
            before.name = before.user.name;
            before.user=null;
            return before;
        });
        handleResult.success(res,beforeOrders);
    }  
    catch (error) {  
        console.log(error);
        handleResult.systemError(res);
    }  
}

const convertProductsToProductSizes = function(products){
    let productSizes = [];
    products.forEach(product=>{
        if(product.sizes){
            product.sizes.forEach(size=>{
                productSizes.push({
                    productId:product.productId,
                    name:product.name,
                    size:size.size,
                    number:size.number,
                    price:size.price
                });
            });
        }
    });
    return productSizes;
}
module.exports.details = async (req,res) => {
    try {
        const id = req.params.id;

        let resAction = await BeforeOrderService.getOneAndPopulateUser(id);
        if (!resAction.isSuccess) {
            handleResult.fail(res,resAction.error);
            return;
        }
        let beforeOrder = resAction.data;
        beforeOrder.name = beforeOrder.user.name;
        beforeOrder.user=null;
        beforeOrder.products = convertProductsToProductSizes(beforeOrder.products);
        
        handleResult.success(res,beforeOrder);
    }  
    catch (error) {  
        console.log(error);
        handleResult.systemError(res);
    }  
}

module.exports.changeStatus = async (req,res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;

        let updateFields = {
            $set:{status:status}
        };
        let resAction = await BeforeOrderService.update(id,updateFields);
        if (!resAction.isSuccess) {
            handleResult.fail(res,resAction.error);
            return;
        }
        handleResult.success(res,"OK");
    }  
    catch (error) {  
        console.log(error);
        handleResult.systemError(res);
    }  
}

module.exports.convertToOrder = async (req,res) => {
    try {
        const idUser = req.user.id;
        const id = req.params.id;

        let resAction = await BeforeOrderService.getOneAndPopulateUser(id);
        if (!resAction.isSuccess) {
            handleResult.fail(res,resAction.error);
            return;
        }
        let beforeOrder = resAction.data;
        let newOrder = new OrderModel();
        newOrder.note = beforeOrder.note;
        newOrder.discountCode = beforeOrder.discountCode;
        newOrder.discountPayment = beforeOrder.discountPayment;
        newOrder.totalBill = beforeOrder.totalBill;
        newOrder.numberProducts = beforeOrder.numberProducts;
        newOrder.products = beforeOrder.products;
        newOrder.numberTable = beforeOrder.numberTable;
        newOrder.isTakeAway = beforeOrder.isTakeAway;
        newOrder.user = beforeOrder.user;
        newOrder.sdt = beforeOrder.user.sdt;
        newOrder.staff = idUser;

        resAction = await OrderService.create(newOrder);
        if (!resAction.isSuccess) {
            handleResult.fail(res,resAction.error);
            return;
        }

        handleResult.success(res,{newId:resAction.data.id});
    }  
    catch (error) {  
        console.log(error);
        handleResult.systemError(res);
    }  
}