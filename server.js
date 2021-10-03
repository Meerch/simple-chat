import express from 'express'
import http from 'http'
import {Server} from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const rooms = {}

app.use(express.json())


app.get('/rooms', (req, res) => {
    console.log('req /rooms')
    res.json(rooms)
})

io.on('connection', (socket) => {
    socket.on('ROOM:JOIN', ({roomId, userName}) => {
        socket.join(roomId)
        if (!rooms[roomId]) {
            rooms[roomId] = {}
            rooms[roomId].users = {}
            rooms[roomId].messages = []
        }
        rooms[roomId].users[socket.id] = userName

        io.in(roomId).emit('ROOM:SET_INFO', {
            users: Object.values(rooms[roomId].users),
            messages: rooms[roomId].messages
        })
    })

    socket.on('ROOM:NEW_MESSAGE', ({roomId, userName, text}) => {
        rooms[roomId].messages.push({userName, text})
        io.in(roomId).emit('ROOM:NEW_MESSAGE', rooms[roomId].messages)
    })

    socket.on('disconnect', () => {
        for (const roomId in rooms) {
            if (delete rooms[roomId].users[socket.id]) {
                io.in(roomId).emit('ROOM:SET_USERS', Object.values(rooms[roomId].users))
            }
        }
    })


    console.log('a user connected', socket.id)
})

server.listen('9999', err => {
    if (err) {
        throw Error(err)
    }
    console.log('Server is starting...')
})
