import jwt from 'jsonwebtoken'
import encrypt from './encrypt'
import authConfig from '../constants/auth'
require('../config/config');

const formatCookies = cookies => {

    const cookiesList = cookies
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, v) => {
            acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())
            return acc
        }, {})

    return cookiesList

}

const getAuthCookie = async (cookies, DEV) => {

    try {

        let hasToken = false
        let token = ''

        if(!cookies) {
            token = encrypt.createToken({}, process.env.SEED, '24h')
        } else {
            const cookiesList = cookies
            .split(';')
            .map(v => v.split('='))
            .reduce((acc, v) => {
                acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())
                return acc
            }, {})
            if(cookiesList.sessionToken) {
                hasToken = true
                token = cookiesList.sessionToken
            } else {
                token = encrypt.createToken({}, process.env.SEED, '24h')
            }
        }
        try {
            jwt.verify(token, process.env.SEED)
        } catch (e) {
            token = null
        }
        return {
            hasToken,
            token
        }

    } catch (e) {
        console.log('Error>', e)
    }

}

export default {
    formatCookies,
    getAuthCookie
}