const net = require('net')

const server = net.createServer( socket =>{
    socket.on('data', data =>{

        socket.write('bon dia')
    })
    socket.on('error', console.log)
})

server.listen(8080)