                    // ** TEAM SHARKNADO **


const { find } = require('../data/users')
const fs = require('fs')
const path = require('path')
require('../utils/string')
const Email = require('../utils/email')
const uid = require('../utils/uid')
require('../utils/json')

module.exports = (userId, contact, callback) => {
    String.validate(userId)
    
    Function.validate(callback)

    if (typeof contact !== 'object') throw new TypeError(`${contact} is not an object`)

    const { name, surname, email, phone, birthdate, country } = contact

    if (name)
        String.validate.notVoid(name)

    if (surname)
        String.validate.notVoid(surname)

    if (email) {
        String.validate.notVoid(email)
        Email.validate(email)
    }

    if (phone)
        String.validate.notVoid(phone)

    if (birthdate) {
        String.validate.notVoid(birthdate)
        
    }

    if (country)
        String.validate.notVoid(country)
debugger
        find({userId},(error, [user]) => {
            if (error) return callback(error)
    debugger
            if (!user) return callback(new Error(`user with ID: ${userId} does not exist`))
    
            // if (user.password !== password) return callback(new Error('wrong password'))
            
            contact.user = userId
        
            const id = uid()
        
            contact.id = id
        
            const file = `${id}.json`
            
            fs.writeFile(path.join(__dirname, '..', 'data', 'contacts', file), JSON.prettify(contact), error => {
                if (error) return callback(error)
        
                // callback(null, id)
                callback(null, user.id)
            })
    
        })
}