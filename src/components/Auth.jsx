import {useState} from "react"

const Auth = ({joinRoom}) => {
    const [roomId, setRoomID] = useState('')
    const [userName, setUserName] = useState('')

    return (
        <div className='wrapper auth blue lighten-1'>
            <h1>Вход в комнату</h1>
            <input
                placeholder='Название комнаты'
                type="text"
                onChange={(e) => {setRoomID(e.target.value)}}
            />
            <input
                placeholder='Имя'
                type="text"
                onChange={(e) => setUserName(e.target.value)}
            />
            <button onClick={() => {
                joinRoom({roomId, userName})
            }}>Войти</button>
        </div>
    )
}

export default Auth
