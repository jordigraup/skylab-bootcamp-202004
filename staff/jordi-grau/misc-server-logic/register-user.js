require('misc-commons/polyfills/string')
const { Email } = require('misc-commons/utils')
require('misc-commons/polyfills/json')
const { DuplicityError } = require('misc-commons/errors')
const { mongoose, model: {User} } = require('misc-data')
const bcrypt = require ('bcryptjs')


module.exports = (name, surname, email, password) => {
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

        return User.findOne({ email })
                .then(user => {
                    if (user) throw new DuplicityError(`user with e-mail ${email} already exists`)

                    return User.create({ name, surname, email, password })
                })
        
}