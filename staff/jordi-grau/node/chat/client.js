const readline = require('readline')
const net = require('net')

const message = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function questions() {
    message.question('type here ', (message) =>{      
        client.write(message)
    })
}
 
const client = net.createConnection({ port: 8080, host: 'localhost'}, () =>{
   questions()
})

client.on('data', data=>{
    console.log(data.toString())
    questions()
})