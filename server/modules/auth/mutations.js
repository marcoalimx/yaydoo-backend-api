import serverResponse from "./../../middlewares/server-response";
import encrypt from "./../../middlewares/encrypt";
import authConfig from '../../constants/auth'
import messages from '../../constants/messagesResponses'
require('../../config/config');
var moment = require('moment');

const Mutations = (db, rejects, Handlers, Helpers, bcrypt) => {
    return {
        login: async (obj, { input }, {token}, info) =>
        {
            const callback = async () => {
                try {
                    const {email, password} = input;
                    let statusCode = 200;
                    const responseQuery = await db.sequelize.query(`
                        select 
                           s.id,
                           s.email as name,
                           cr.name as role
                        from 
                            users s
                            inner join cat_roles  cr on cr.id = s.fk_cat_role
                        where 
                            s.email = '${email}'
                            and s.password = '${password}';
                    `, { type: db.sequelize.QueryTypes.SELECT});
                    if(responseQuery.length == 0){
                        return {
                            statusCode: 400,
                            message: "success",
                            error: '',
                            response: JSON.stringify({
                                role: "other"
                            })
                        }
                    }
                    return {
                        statusCode: statusCode,
                        message: "success",
                        error: '',
                        response: JSON.stringify(responseQuery[0])
                    }
                } catch (error) {
                    return Handlers.errorCatch(error)
                }
            }
            return await serverResponse.classicResponse(token, [authConfig.ROL_PUBLIC], callback);
        },
        register: async (obj, { input }, {token}, info) =>
        {
            const callback = async () => {
                try {
                    const {email, password} = input;
                    const responseQueryUser = await db.sequelize.query(`
                        select 
                           s.id
                        from 
                            users s
                        where 
                            s.email = '${email}'
                    `, { type: db.sequelize.QueryTypes.SELECT});
                    if(responseQueryUser.length > 0){
                        return {
                            statusCode: 201,
                            message: "Este usuario ya existe, prueba con otro.",
                            error: '',
                            response: ""
                        }
                    }
                    const responseInsertUser = await db.sequelize.query(`
                        INSERT INTO users
                        (email, "password", fk_cat_role)
                        VALUES('${email}', '${password}', 2);
                    `, { type: db.sequelize.QueryTypes.INSERT});
                    const responseUser = await db.sequelize.query(`
                        select 
                            s.id,
                            s.email as name,
                            cr.name as role
                        from 
                            users s
                            inner join cat_roles  cr on cr.id = s.fk_cat_role
                        where 
                            s.email = '${email}'
                    `, { type: db.sequelize.QueryTypes.SELECT});
                    console.log("xxxxxxxxxxx => ", responseUser);
                    return {
                        statusCode: 200,
                        message: "success",
                        error: '',
                        response: JSON.stringify(responseUser[0])
                    }
                } catch (error) {
                    return Handlers.errorCatch(error)
                }
            }
            return await serverResponse.classicResponse(token, [authConfig.ROL_PUBLIC], callback);
        },
    }
}

module.exports = Mutations