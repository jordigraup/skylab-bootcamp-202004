require('plates-commons/polyfills/string')
const { utils: { Email, call }} = require('plates-commons')
const bcrypt = require('bcryptjs')
const context = require('./context')

/**
 * Function makes a api's call with all data needed to return user's info.
 * @param {string} userId data needed to get user's info.
 * 
 * @throws {error} when api retunrs an error. 
 */
module.exports = function(userId) {
    const { token } = this.storage
   
    String.validate.notVoid(userId)

    return call('GET',`${API_URL}/users`,undefined, {'Authorization': `Bearer ${token}`})
        .then(({status, body}) =>{
            if(status === 200) { 
                return JSON.parse(body)
            }else{
                const {error} = JSON.parse(body)
                throw new Error(error)
                }
        })
    
}.bind(context)

