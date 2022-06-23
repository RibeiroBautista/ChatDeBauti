const express = require('express')
const { Server: IOServer } = require('socket.io')
const path = require('path')
const app = express()
const serverExpress = app.listen(8080, () => console.log('servidor escuchando puerto 8080'))
const io = new IOServer(serverExpress)

const messagesArray = []

app.use(express.static(path.join(__dirname, '../public')))

io.on('connection', socket => {
    console.log(`Se conectó un usuario: ${socket.id}`)
    socket.emit('server:messege', messagesArray)


    socket.on('client:message', messageInfo => {
        messagesArray.push(messageInfo);

        io.emit('server:messege', messagesArray)
    })
})