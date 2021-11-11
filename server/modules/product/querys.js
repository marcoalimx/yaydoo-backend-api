import serverResponse from "./../../middlewares/server-response";
import authConfig from '../../constants/auth'

var moment = require('moment');  

const Query = (db, rejects, Handlers, Helpers ,bcrypt) => {
    return {
        getProducts: async (obj, { input }, {token}, info) => 
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
        getProductsAdmin: async (obj, { input }, {token}, info) => 
        {
            const callback = async () => {
                try {
                    const response = await db.sequelize.query(`
                        select 
                            s.id,
                            s.name, 
                            s.sku, 
                            s.quantity, 
                            s.price,
                            u.email as provider
                        from 
                            products s
                            inner join users u on s.fk_user = u.id;
                    `, { type: db.sequelize.QueryTypes.SELECT});
                    var list = response.map((item)=>{
                        item.provider = item.provider.split("@")[0]
                        return item;
                    });
                    return {
                        statusCode: 200,
                        message: "success",
                        error: '',
                        response: JSON.stringify(list)
                    }
                } catch (error) {
                    console.log(error)
                    return Handlers.errorCatch(error)
                }
            }
            return await serverResponse.classicResponse(token, [authConfig.ROL_PUBLIC], callback);
        },
        getListProviders: async (obj, { input }, {token}, info) => 
        {
            const callback = async () => {
                try {
                    const response = await db.sequelize.query(`
                        select 
                            distinct(s.id),
                            s.email as name
                        from 
                            users s
                            inner join products p on p.fk_user = s.id;
                    `, { type: db.sequelize.QueryTypes.SELECT});
                    var list = response.map((item)=>{
                        item.name = item.name.split("@")[0]
                        return item;
                    });
                    
                    return {
                        statusCode: 200,
                        message: "success",
                        error: '',
                        response: JSON.stringify(list)
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

module.exports = Query