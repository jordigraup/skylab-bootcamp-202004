


function authenticateUser (email, password, callback){
    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' is not an e-mail')
                
    if (typeof password !== 'string') throw new TypeError(password + ' is not a string')
    if (!password.trim().length) throw new Error('password is empty or blank')

    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth', `{ "username": "${email}", "password": "${password}"  }`,
        { 'Content-type': 'application/json' }, (error, status, response) => {
                    if (error) throw new  Error (console.error(error) )
                    if (status === 200) {
                        const { token } = JSON.parse(response)
    
                        callback(undefined, token)
                    } else {
                        callback(error)
                    }
    
                }
    
    
    )
    //if (!user) throw new Error('wrong credentials')
}



               /* function authenticateUser(email, password) {
                    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
                    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' is not an e-mail')
                
                    if (typeof password !== 'string') throw new TypeError(password + ' is not a string')
                    if (!password.trim().length) throw new Error('password is empty or blank')
                
                    const user = users.find(user => user.email === email && user.password === password)
                
                    if (!user) throw new Error('wrong credentials')
                }
                */