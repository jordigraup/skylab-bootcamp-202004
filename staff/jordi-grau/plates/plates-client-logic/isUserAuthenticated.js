require('plates-commons/polyfills/string')
require('plates-commons/polyfills/function')
const { utils: {call}} = require('plates-commonjs')
const context = require('./context')

/**
 * Function checks if user is authenticated.
 * @param {string} token data required to success on checking.
 */
module.exports = function(token){
    String.validate.notVoid(token)

    return call(
        'GET', `${this.API_URL}/users`,
        undefined, {'Authorization': `Bearer ${token}`})
        .then( ({ status })=> {
            return status === 200
        })
}.bind(context)
