require('plates-commons/polyfills/string')
const {utils: {Email, call}} = require ('plates-commons')
const  context  = require('./context')
const bcrypt = require('bcrypt')

/**
 * Function creates an array of dishes as a menu on db
 * @param {string}  userId data required to find user's restaurant
 * @param {string}  restaurantId data required to find correct restaurant
 * @param {string} dishesIds data required to create menu.
 * 
 * @throws {error} when api sends an error.
 */
module.exports= function (userId, restaurantId, dishesIds) {
    String.validate.notVoid(userId)
    String.validate.notVoid(restaurantId)
    String.validate.notVoid(dishesIds)

   const { token } = this.storage
    

return call(
        'POST',
        `${this.API_URL}/restaurant/menu`,
        `{"userId": "${userId}","restaurantId": "${restuarantId}","dishesIds": "${dishesIds}"}`,
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