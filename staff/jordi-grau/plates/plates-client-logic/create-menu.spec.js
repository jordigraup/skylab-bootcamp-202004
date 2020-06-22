require('dotenv').config()
const {env: {TEST_MONGODB_URL: MONGODB_URL, API_URL, TEST_SECRET}} = process
const { mongoose, models: { User, Restaurant}} = require('plates-data')
global.fetch  = require('node-fetch')
const jwt = require('jsonwebtoken')
require('plates-commons/polyfills/json')
require('plates-commons/polyfills/xhr')
const { DuplicityError, UnexistenceError, VoidError, CredentialsError } = require('plates-commons/errors')
const bcrypt = require('bcrypt')
const { random } = Math
const { expect } = require('chai')
const createMenu = require('./create-menu')
const context = require('./context')
context.API_URL = API_URL
context.storage = {}

describe('client logic: create restaurant', () => {
    let restaurantName, restaurantEmail, cif, address, phone, userEmail, password, userId, restaurantId, dishesIds
    
    before(async () => {
        await mongoose.connect(MONGODB_URL)
        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany(),            
        ])

    })

    beforeEach(async () => {
        restaurantName = `restaurantname-${random()}`
        restaurantEmail = `restaurantemail-${random()}@gmail.com`
        cif = `cif-${random()}`
        address = `address-${random()}`
        phone = random() * 1000000000

        userEmail = `useremail-${random()}@email.com`
        password = `password-${random()}`
        const hash = await bcrypt.hash(password, 10)


        const { id } = await User.create({ email: userEmail, password: hash })
        userId = id

        const token = jwt.sign({ sub: userId }, TEST_SECRET, { expiresIn: '1d' });

        context.storage.token = token;
    })
    
    it('should create a restaurant on correct data', async()=>{
        debugger
        await createRestaurant( restaurantName, restaurantEmail, cif, address, phone)
debugger
        const restaurant = await Restaurant.findOne({name: restaurantName})
        
        console.log(restaurant)
        expect(restaurant).to.exist
        expect(restaurant.name).to.equal(restaurantName)

    })


  

    afterEach(async() => await Promise.all([
        User.deleteMany(),  
        Restaurant.deleteMany()      
    ]))

    after(async () => {
        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany
        ]),
        await mongoose.disconnect();
    })
})

