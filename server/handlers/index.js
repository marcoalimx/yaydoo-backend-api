import {
    errorCatch,
    responseSuccess,
    responseError
} from './responses'

import {
    dataUserLogIn,
    rolesByUser
} from './auth'

const Handlers = {
    rolesByUser:(source, company_id, collaborator_id) => rolesByUser(source, company_id, collaborator_id),
    dataUserLogIn: (token) => dataUserLogIn(token),
    errorCatch: (error) => errorCatch(error),
    responseSuccess:(response) => responseSuccess(response),
    responseError:(error, response) => responseError(error, response),
}

module.exports = Handlers