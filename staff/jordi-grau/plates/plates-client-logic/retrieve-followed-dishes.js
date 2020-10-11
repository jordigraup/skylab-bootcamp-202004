require('plates-commons/polyfills/string')
const { utils: { call }} = require('plates-commons')
const context = require('./context')
debugger

module.exports = function(userId) {
    String.validate(userId)

    const {token} = this.storage

    return (async() =>{
       const response = await call('GET', `${this.API_URL}/user/dishes`, {'Authorization': `Bearer ${token}`})
         debugger  
        const { body, status } = response
           if(status === 200 ){
               const following = JSON.parse(body)
               return following
           } else{
            throw new Error(status, body)
        }
    })()
}.bind(context)