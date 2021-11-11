import jwt from 'jsonwebtoken'
require('../config/config');

const checkCredentials = (credentials, roles) => {

    var access = false

    roles.forEach(role => {
        if(credentials[role] == true) access = true
    })

    return access

}
const resultServerNoAuth = (statusCode, message, error, response) => {
    return {
        statusCode: statusCode,
        message: message,
        error: error,
        response: response
    }
}
const classicResponse = async(token, roles, callback) => {

    try {

        var credentials = null
        try {
            credentials = jwt.verify(token, process.env.SEED)
        } catch (e) {
            credentials = null
        }
        // console.log("token", token, "credentials", credentials)
        if(credentials && checkCredentials(credentials.roles, roles)) {
            console.log("call")
            return await callback()
        } else {
            return resultServerNoAuth(400, "error", "No tiene permisos para ejecutar esta operación", "")
        }
        
    } catch (e) {

        console.log('>> ',e)
        return resultServerNoAuth(400, "error", e.message, "")

    }

}

const credentialsResponse = async(token, roles, callback) => {

try {

    var credentials = null

    try {
        credentials = jwt.verify(token, process.env.SEED)
    } catch (e) {
        credentials = null
    }

    if(credentials && checkCredentials(credentials.roles, roles) && credentials.user_id) {
        return await callback(credentials)
    } else {

        return {
            statusCode: 403,
            message: '',
            error: '',
            response: null
        }

    }
    
} catch (e) {

    console.log('>> ',e)
    return null

}

}

export default {
    classicResponse: classicResponse,
    credentialsResponse: credentialsResponse
}