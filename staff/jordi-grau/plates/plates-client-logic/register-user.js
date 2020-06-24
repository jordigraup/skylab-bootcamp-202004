require('plates-commons/polyfills/string')
const { utils: { Email, call }} = require('plates-commons')
const context  = require('./context')

/**
 * Function sends data needed to an api to create a user on db. Return a body and a status.
 * @param {string} name data required to create a user
 * @param {string} surname user's data info.
 * @param {string} email user's data required.
 * @param {string} password data required to create a user
 * 
 * @throws {error} when api returns an error.
 */
module.exports = function (name, surname, email, password){
    String.validate(name)
    String.validate(surname)
    Email.validate(email)
    
    return call(
        'POST',
        `${this.API_URL}/users`,
        `{"name": "${name}", "surname": "${surname}", "email": "${email}", "password": "${password}" }`,
        {'Content-type': 'application/json'}
    )
    
    .then(({status, body}) => {
        if(status === 201) return

        const { error } = JSON.parse(body)

        throw new Error(error)
    })
}.bind(context)

    
