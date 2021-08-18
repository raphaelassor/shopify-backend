
const logger = require('./logger.service')

// CUSTOM VALIDATIONS ERRORS
function invalidParams(params) {
    logger.error('invalid params', { params })
    console.log(new Error('invalid params in'))
    throw 'Invalid parameters entered!'
}

function entityNotFound(entity) {
    logger.error('could not find entity', entity)
    console.log(new Error('Request rejected.Entity not found '))
    throw 'Request rejected.Entity not found '

}

//SYSTEM
function dbActionFailed(type, entity, err) {
    logger.error(`Failed ${type} action in database`, { entity, err })
    throw (
        `The operation failed due to an internal
         issue.please try again later`
    )
}



module.exports = {
    invalidParams,
    entityNotFound,
    dbActionFailed,
}

