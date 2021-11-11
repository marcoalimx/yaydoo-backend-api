import jwt from 'jsonwebtoken'

const createToken = (user, secret, expiresIn) => {
    const { idUser, firstName, middleName, fathersLastName ,
        mothersLastName, idSession, idCatRelAction, 
        ProfilePicture, Email, Email1, roles, companyId, collaboratorId, superheroeId } = user;

    let options = {
        roles: {
            public: true
        }
    }

    if(idUser && Email) {
        options = {
            ...options,
            idUser,
            firstName,
            middleName,
            fathersLastName,
            mothersLastName,
            idSession,
            idCatRelAction,
            ProfilePicture,
            Email,
            Email1,
            roles,
            companyId,
            collaboratorId,
            superheroeId
        }
    }

    return jwt.sign(options, secret, { expiresIn });
}

export default {
    createToken
}