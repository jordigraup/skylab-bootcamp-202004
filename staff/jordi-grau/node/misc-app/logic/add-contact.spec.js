const addContact = require('./add-contact')
const { random } = Math
const fs = require('fs')
const path = require('path')
const uid = require('../utils/uid')
const { expect } = require('chai')
require('../utils/json')
const { deleteFilesByExtensionFromDirectory } = require('../utils/files')

describe.only('logic - addContact', () => {
    const data = path.join(__dirname, '..', 'data')

    let name, surname, email, password, userId

    beforeEach(done => {
        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)

            deleteFilesByExtensionFromDirectory(path.join(data, 'contacts'), '.json', error => {
                if (error) return done(error)

                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                userId = uid()

                const user = { name, surname, email, password }

                fs.writeFile(path.join(data, 'users', `${userId}.json`), JSON.prettify(user), error => {
                    if (error) return done(error)

                    done()
                })
            })
        })
    })

    it('should succeed on valid data', done => {
        addContact(userId, { name, surname, email }, (error, id) => {
            expect(error).to.be.null

            expect(id).to.be.a('string')

            fs.readFile(path.join(data, 'contacts', `${id}.json`), 'utf8', (error, content) => {
                expect(error).to.be.null

                expect(content).to.exist

                const contact = JSON.parse(content)

                expect(contact.name).to.equal(name)
                expect(contact.surname).to.equal(surname)
                expect(contact.email).to.equal(email)

                done()
            })
        })
    })

    it('should fail on non-string field', () => {
        expect(() => {
            addContact(undefined, surname, email, phone, birthdate, country, function () { })
        }).to.throw(TypeError, 'undefined is not a string')

        expect(() => {
            addContact(1, surname, email, phone, birthdate, country, function () { })
        }).to.throw(TypeError, '1 is not a string')

        expect(() => {
            addContact(true, surname, email, phone, birthdate, country, function () { })
        }).to.throw(TypeError, 'true is not a string')

        expect(() => {
            addContact(name, undefined, email, phone, birthdate, country, function () { })
        }).to.throw(TypeError, 'undefined is not a string')

        expect(() => {
            addContact(name, 1, email, phone, birthdate, country, function () { })
        }).to.throw(TypeError, '1 is not a string')

        expect(() => {
            addContact(name, true, email, phone, birthdate, country, function () { })
        }).to.throw(TypeError, 'true is not a string')

        expect(() => {
            addContact(name, surname, email, undefined, birthdate, country, function () { })
        }).to.throw(TypeError, 'undefined is not a string')

        expect(() => {
            addContact(name, surname, email, 1, birthdate, country, function () { })
        }).to.throw(TypeError, '1 is not a string')

        expect(() => {
            addContact(name, surname, email, true, birthdate, country, function () { })
        }).to.throw(TypeError, 'true is not a string')
    })

    afterEach(done => {
        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)

            deleteFilesByExtensionFromDirectory(path.join(data, 'contacts'), '.json', error => {
                if (error) return done(error)

                done()
            })
        })
    })
})
