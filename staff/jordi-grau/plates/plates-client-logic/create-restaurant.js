require('plates-commons/polyfills/string')
const {utils: {Email, call}} = require ('plates-commons')
const  context  = require('./context')
const bcrypt = require('bcrypt')

/**
 * Function sends an api's request to create a restaurant on db.
 * @param {string} name data required to create restaurant.
 * @param {email} email data required to create restaurant.
 * @param {string} cif data unique and required  to create restaurant.
 * 
 * @throws {error} when api returns an error.
 */
module.exports= function ( name, email, cif, address, phone) {
    String.validate.notVoid(name)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(cif)
    String.validate.notVoid(address)
   const { token } = this.storage
    
debugger
return call(
        'POST',
        `${this.API_URL}/users/restaurant`,
        `{"name": "${name}","email": "${email}","cif": "${cif}","address": "${address}","phone": "${phone}"}`,
        {'Content-type': 'application/json', Authorization: `Bearer ${token}`} 
    )

    .then(({status, body}) => {
        debugger
        if(status === 201) return
       debugger 
        const { error } = JSON.parse(body)

        throw new Error(error)
    })

}.bind(context)