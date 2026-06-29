const { success, error } = require("../utils/response");
const paginate = require("../utils/paginate");
const { Transaction } = require("../models");

// GET /api/transactions?page=1
exports.getTransactions = async(req,res,next)=>{


    try {


        const page =
            Number(req.query.page) || 1;


        const limit = 5;


        const offset =
            (page - 1) * limit;



        const result =
            await Transaction.findAndCountAll({

                limit,

                offset,


                include:[
                    {
                        model:Product,
                        attributes:[
                            "sku",
                            "name"
                        ]
                    }
                ],


                order:[
                    ["createdAt","DESC"]
                ]

            });



        res.json({

            total:result.count,

            currentPage:page,

            totalPages:
                Math.ceil(
                    result.count / limit
                ),

            data:result.rows

        });



    }catch(error){

        next(error);

    }


};