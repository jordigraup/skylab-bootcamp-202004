require('misc-commons/polyfills/string')
require('dotenv').config()
const { API_URL } = process.env
const {Email, call} = require('misc-commons/utils')


module.exports= (name, surname, email, password) =>{
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(password)
    Email.validate(email)

    call('POST','http://192.168.0.43:8080', 
    JSON.stringify({ name, surname, email, password }),
    { 'Content-type': 'application/json' })
        .then(({ status, body } ) =>{
            
            if(status!== 201) {
                const {error} = JSON.parse(body)
                 throw new Error(error)
            }

            return 'User registered'
        })
        .catch(error=>{
           console.error(error)
           throw new Error(error)
        })


}