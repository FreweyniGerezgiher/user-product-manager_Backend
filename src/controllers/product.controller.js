const {
    Product,
    Transaction
} = require("../models");

const sequelize = require("../config/database");



// POST /api/products
exports.createProduct = async(req,res,next)=>{

    try {


        const product = await Product.create(req.body);


        res.status(201).json({
            message:"Product created successfully",
            data:product
        });


    } catch(error){

        next(error);

    }

};




// GET /api/products
exports.getProducts = async(req,res,next)=>{


    try {


        const products =
            await Product.findAll({
                order:[
                    ["createdAt","DESC"]
                ]
            });


        res.json(products);


    }catch(error){

        next(error);

    }

};






// PATCH /api/products/:id/stock
exports.updateStock = async(req,res,next)=>{


    const transaction =
        await sequelize.transaction();


    try {


        const product =
            await Product.findByPk(
                req.params.id,
                {
                    transaction,
                    lock:true
                }
            );


        if(!product){

            return res.status(404).json({
                message:"Product not found"
            });

        }



        const {
            type,
            amount
        } = req.body;



        const oldQuantity =
            product.quantity;



        if(type === "INCREASE"){

            product.quantity += amount;

        }
        else if(type === "DECREASE"){


            if(product.quantity - amount < 0){

                throw new Error(
                    "Stock cannot be less than zero"
                );

            }


            product.quantity -= amount;


        }
        else {

            return res.status(400).json({
                message:"Invalid stock type"
            });

        }



        await product.save({
            transaction
        });



        await Transaction.create({

            productId:product.id,

            type,

            amount,

            oldQuantity,

            newQuantity:
                product.quantity


        },{
            transaction
        });



        await transaction.commit();



        res.json({

            message:"Stock updated",

            product

        });



    }catch(error){


        await transaction.rollback();

        next(error);

    }


};