const express = require('express')
const app = express()

// set the template engine ejs
app.set('view engine', 'ejs')

// middlewares
app.use(express.static('public'))

// routes
app.get('/', (req, res) => {
    res.render('index')
})

//listen to port 3000
server = app.listen(3000)

// socket.io instantiation
const io = require('socket.io')(server)

//listen to every connection
io.on('connection', (socket) => {
    console.log('user connected');

    socket.username = 'Anonymous'

    socket.on('change_username', (data) => {
        socket.username = data.username
        console.log('user changed nickname to:' + data.username)
    })

    socket.on('new_message', (data) => {
        console.log(data)
        io.sockets.emit('new_message', {message : data.message, username : socket.username})
    })
})