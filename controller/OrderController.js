const OrderService = require("../service/order.service"); //Import dịch vụ liên quan đến user
const ProductService = require("../service/product.service"); //Import dịch vụ liên quan đến user
const DiscountService = require("../service/discount.service"); //Import dịch vụ liên quan đến user
const OrderModel = require("../schema/order.schema"); //Import dịch vụ liên quan đến user
const handleResult = require("../helper/handleResult"); //helper chứa hàm showResult
const ServiceResponse = require('../service/ServiceResponse');

const findDiscount = function(discounts, discountCode, productId){
    let now=Date.now();
    for(i=0; i<discounts.length; i++){
        if(discounts[i].startTime<=now&&discounts[i].endTime>=now){
            if(discounts[i].code==discountCode){
                if(Array.isArray(discounts[i].productIds)){
                    if(discounts[i].productIds.map(p=>p.toString()).indexOf(productId)!=-1){
                        return discounts[i];
                    }
                }else{
                    if(discounts[i].productIds==productId){
                        return discounts[i];
                    }
                }
            }
        }
    }
    discounts.forEach(discount => {
        if(discount.startTime<=Date.now()||discount.endTime>=Date.now){
            if(discount.code==discountCode){
                if(Array.isArray(discount.productIds)){
                    if(discount.productIds.indexOf(productId)!=-1){
                        return discount;
                    }
                }else{
                    if(discount.productIds==productId){
                        return discount;
                    }
                }
            }
        }
    });
    return null;
}

const getPriceOfSizes = function(sizes, size){
    let sizeArr = sizes.split(";");
    for(i=0 ; i<sizeArr.length ; i++){
        let plt = sizeArr[i].split(":");
        if(plt[0]==size){
            return parseInt(plt[1]);
        }
    }
    return null;
}
const findProduct = function(products, productId){
    let productInd = products.findIndex(p=>p._id.toString()===productId);
    if(productInd>-1){
        // console.log(products[productInd]);
        return products[productInd];
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
        // console.log(req.body);
        const idUser = req.user.id;

        //get discounts now
        const discountsNow = await DiscountService.GetAllDiscountValidNow();
        //get products now
        const productsNow = await ProductService.GetAllProduct();

        const {tableNumber,isTakeAway,sdt,note,discountCode} = req.body;
        const productsReq =  req.body.products;

        let productsDetails = [];
        let discountPayment=0;
        let totalPrice = 0;
        let numberProducts = 0;

        productsReq.split(';').forEach(productReq => {
            let sizeSplit = productReq.split(':');
            let productId = sizeSplit[0];
            let size = sizeSplit[1];
            let number = parseInt(sizeSplit[2]);

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
        newOrder.starTime = Date.now();
        newOrder.endTime = Date.now();

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
            order = order.toObject();
            order.orderId = order._id.toString();
            order.user = order.user&&order.user.name;
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
                    productId:product.id,
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
        let order = resAction.data.toObject();
        order.orderId = order._id.toString();
        order.user = order.user&&order.user.name;
        order.staff = order.staff.name;
        order.products = convertProductsToProductSizes(order.products);
        
        handleResult.success(res,order);
    }  
    catch (error) {  
        console.log(error);
        handleResult.systemError(res);
    }  
}

module.exports.changeStatus = async (req,res) => {
    try {
        const idUser = req.user.id;
        const id = req.params.id;
        const status = req.body.status;

        let updateFields = {
            $set:{
                status:status,
                staff:idUser,
                editTime:Date.now()
            }
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
        const discountsNow = await DiscountService.GetAllDiscountValidNow();
        //get products now
        const productsNow = await ProductService.GetAllProduct();

        const {tableNumber,isTakeAway,sdt,note,discountCode} = req.body;
        const productsReq =  req.body.products;

        let productsDetails = [];
        let discountPayment=0;
        let totalPrice = 0;
        let numberProducts = 0;

        productsReq.split(';').forEach(productReq => {
            let sizeSplit = productReq.split(':');
            let productId = sizeSplit[0];
            let size = sizeSplit[1];
            let number = parseInt(sizeSplit[2]);

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