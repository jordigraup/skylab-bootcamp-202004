// TODO check list contacts returns an array of valid contacts
// STEPS
// 1. clean data => USE fs.readdir, fs.unlink
// 2. create contacts by hand => USE fs.writeFile
// 3. launch logic
// 4. validate results against data
// 5. clean data ...

const fs = require('fs')
const assert = require('assert')
const listContacts = require('./list-contacts')
const path = require('path')


fs.unlink('./list-contacts.js', (error)=>{
    if(error) throw new Error(error)

    console.log('list-contacts cleared....')
})

fs.readdir('./list.contacts', (error, files =>{
    if(error) throw new Error(error) 
}))


