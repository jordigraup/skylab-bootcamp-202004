require('plates-commons/polyfills/string')
const { utils: { call }} = require('plates-commons')
const retrieveRestaurant = require('../plates-api/node_modules/plates-server-logic/retrieve-restaurant')
const context = require('./context')

module.exports = function (dishId) {
    String.validate.notVoid(dishId)
    const { token } = this.storage
debugger
    return( async() =>{
        const response = await call(
            'GET', `${this.API_URL}/resataurant/dish/${dishId}`)

            const { status, body } = response

            if(status === 200) {
                const isAvalable = JSON.parse(body)
                return isAvalable
            } else {
                throw new Error(status, body)
            }
    }) ()
}.bind(context)