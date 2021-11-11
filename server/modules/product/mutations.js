import serverResponse from "./../../middlewares/server-response";
import encrypt from "./../../middlewares/encrypt";
import authConfig from '../../constants/auth'
import messages from '../../constants/messagesResponses'
require('../../config/config');
var moment = require('moment');

const Mutations = (db, rejects, Handlers, Helpers, bcrypt) => {
    return {
        createProduct: async (obj, { input }, {token}, info) =>
        {
            const callback = async () => {
                try {
                    console.log("input => ", input);
                    const {name, sku, quantity, price, fk_user} = input;
                    const responseInsertProduct = await db.sequelize.query(`
                    INSERT INTO products
                    ("name", sku, quantity, price, fk_user)
                    VALUES('${name}', '${sku}', ${quantity}, ${price}, ${fk_user});
                    `, { type: db.sequelize.QueryTypes.INSERT});
                    return {
                        statusCode: 200,
                        message: "success",
                        error: '',
                        response: ""
                    }
                } catch (error) {
                    return Handlers.errorCatch(error)
                }
            }
            return await serverResponse.classicResponse(token, [authConfig.ROL_PUBLIC], callback);
        },
        getProductsSeller: async (obj, { idSeller }, {token}, info) => 
        {
            const callback = async () => {
                try {
                    const response = await db.sequelize.query(`
                        select 
                            id,
                            name, 
                            sku, 
                            quantity, 
                            price 
                        from 
                            products
                        where fk_user = ${idSeller}
                    `, { type: db.sequelize.QueryTypes.SELECT});
                    return {
                        statusCode: 200,
                        message: "success",
                        error: '',
                        response: JSON.stringify(response)
                    }
                } catch (error) {
                    console.log(error)
                    return Handlers.errorCatch(error)
                }
            }
            return await serverResponse.classicResponse(token, [authConfig.ROL_PUBLIC], callback);
        },
    }
}

module.exports = Mutations