const errorCatch = (error) =>{
    return {
        statusCode: 400,
        message: "error",
        error: error,
        response: ''
    };
}
const responseSuccess = (response) =>{
    return {
        statusCode: 200,
        message: "success",
        error: "",
        response
    };
}
const responseError = (error, response) =>{
    return {
        statusCode: 400,
        message: "error",
        error,
        response
    };
}
module.exports = { 
    errorCatch,
    responseSuccess,
    responseError
} 