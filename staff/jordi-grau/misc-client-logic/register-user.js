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
    `{ "name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}" }`,
    { 'Content-type': 'application/json' })
        .then(response =>{
            console.log(response)
            response = JSON.parse(response)
            const {status} = response
            if(status!== 201) {
                const {error} = response
                 throw new Error(error)
            }

            return 'User registered'
        })
        .catch(error=>{
            console.error(error)
           throw new Error(error)
        })


}