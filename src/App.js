import Auth from "./components/Auth"
import socket from './socket'
import {useEffect, useState} from "react"
import Chat from "./components/Chat";


const App = () => {
    const [isAuth, setAuth] = useState(false)
    const [data, setData] = useState({
        users: [],
        messages: [],
        roomId: null,
        userName: null
    })

    console.log(data)

    const newMessage = (text) => {
        socket.emit('ROOM:NEW_MESSAGE', { userName: data.userName, roomId: data.roomId, text})
    }

    const joinRoom = (obj) => {
        socket.emit('ROOM:JOIN', obj)
        setAuth(true)
        console.log(data)
        setData(data => ({ ...data, userName: obj.userName, roomId: obj.roomId}))
    }

    useEffect(() => {
        socket.on('ROOM:NEW_MESSAGE', messages => setData(data => ({...data, messages})))

        socket.on('ROOM:SET_INFO', ({users, messages}) => {
            setData(data => ({ ...data, users, messages}))
        })
    }, [])



    return (
        <>
            {
                !isAuth
                    ? <Auth joinRoom={joinRoom}/>
                    : <Chat newMessage={newMessage} {...data}/>
            }
        </>
    )
}

export default App
