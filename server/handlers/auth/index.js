import * as db from '../../database'
import jwt from 'jsonwebtoken'
import auth from '../../constants/auth'
require('../../config/config');

const dataUserLogIn = async (token) => {
    var credentials = null
    try {
        credentials = jwt.verify(token, process.env.SEED)
        return credentials
    } catch (e) {
        credentials = null
        return credentials
    }
}
const rolesByUser = (source, company_id, collaborator_id) => {
    let checkConstructionUser = false;
    let roles = {}
    let message = ''
    try {
        roles = {
            [auth.ROL_PUBLIC]: true
        }
        return {
            checkConstructionUser,
            roles,
            message
        }
    } catch (e) {
        return {
            checkConstructionUser: false,
            message: e
        }
    }
}

module.exports = { 
    dataUserLogIn,
    rolesByUser
} 