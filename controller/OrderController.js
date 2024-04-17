const OrderService = require("../service/order.service"); //Import dịch vụ liên quan đến user
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

        const newOrder = new OrderModel();
        newOrder.isTakeAway = isTakeAway=="true"?true:false;
        newOrder.note = note;
        newOrder.sdt=sdt;
        newOrder.discountCode = discountCode;
        newOrder.discountPayment = discountPayment;
        newOrder.totalBill = totalPrice-discountPayment;
        newOrder.numberProducts = numberProducts;
        newOrder.products = productsDetails;
        newOrder.numberTable = tableNumber;
        newOrder.staff = idUser;

        let resAction = await OrderService.create(newOrder);
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
        let resAction = await OrderService.getManyAndPopulateUserStaff({});
        if (!resAction.isSuccess) {
            handleResult.fail(res,resAction.error);
            return;
        }
        let orders = resAction.data;
        orders = orders.map(order=>{
            order.user = order.user.name;
            order.staff = order.staff.name;
            return order;
        });
        handleResult.success(res,orders);
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

        let resAction = await OrderService.getOneAndPopulateUserStaff(id);
        if (!resAction.isSuccess) {
            handleResult.fail(res,resAction.error);
            return;
        }
        let beforeOrder = resAction.data;
        beforeOrder.user = beforeOrder.user.name;
        beforeOrder.staff = beforeOrder.user.staff;
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
        let resAction = await OrderService.update(id,updateFields);
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

module.exports.update = async (req,res) => {
    try {
        const idUser = req.user.id;
        const idOrder = req.params.id;

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

        let updateFields = {
            $set:{
                isTakeAway:isTakeAway=="true"?true:false,
                note:note,
                sdt:sdt,
                discountCode:discountCode,
                discountPayment:discountPayment,
                totalBill:totalPrice-discountPayment,
                numberProducts:numberProducts,
                products:productsDetails,
                numberTable:tableNumber,
                staff : idUser,
                editTime:Date.now()
            }
        }

        let resAction = await OrderService.update(idOrder, updateFields);
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