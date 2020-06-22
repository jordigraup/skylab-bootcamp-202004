require('plates-commons/polyfills/string')
const {utils: {Email, call}} = require ('plates-commons')
const  context  = require('./context')
const bcrypt = require('bcrypt')


debugger
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