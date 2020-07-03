require('plates-commons/polyfills/string')
const { utils: { Email,call } } = require('plates-commons')
// const brcypt = require('bcryptjs')
const context  = require('./context')


/**
 * Function authenticates user. 
 * @param {email} email data required for authentication
 * @param {string} password data required for authentication
 * 
 * @throws {error} when an invalid email is passed.
 * @throws {error} when an password email is passed. 
 */
module.exports = function(email, password){
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)
 
    return call(
        'POST',
        `${this.API_URL}/users/auth`,
        `{"email": "${email}", "password": "${password}" }`,
        {'Content-type': 'application/json'}
    )
        
    .then(({status, body}) => {
        if(status === 200) {
            const {token} = JSON.parse(body)
            this.storage.token = token;

            return 
        }


        const { error } = JSON.parse(body)
        throw new Error(error)
    })

        
    }.bind(context)
