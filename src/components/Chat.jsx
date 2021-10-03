import {useEffect, useRef, useState} from "react";

const Chat = ({users, roomId, userName, messages, newMessage}) => {
    const [message, setMessage] = useState('')
    const messagesRef = useRef(null)

    const sendMessage = () => {
        newMessage(message)
        setMessage('')
    }

    useEffect(() => {
        messagesRef.current && messagesRef.current.scrollTo(0, 99999);
    }, [messages])


    return (
        <div className='wrapper chat blue lighten-1'>
            <div className="room">
                <div className="room__info">
                    <span className="room__name">Комната: {roomId}</span>
                    <span className="room__online">Онлайн ({users.length}):</span>
                    <div className="room__users">
                        {
                            users && users.map((user, index) => (
                                <div key={user + index} className="room__user">{user}</div>
                            ))
                        }
                    </div>
                </div>

                <div className="room__chat">
                    <span className='chat__title'>Сообщения</span>

                    {
                        messages.length !== 0
                            ?
                            <div ref={messagesRef} className="chat__messages">

                                {
                                    messages.map(({text, userName}, index) => (
                                        <div key={userName + index} className="message">
                                            <div className="message__author">От кого: <span>{userName}</span></div>
                                            <div className="message__text">{text}</div>
                                        </div>
                                    ))
                                }

                            </div>
                            : <span className='not__messages'>Здесь пока нету сообщений</span>
                    }


                    <div className="chat__send-message">
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            type="text"
                            onKeyDown={(e) => {
                                return e.key === 'Enter' ? sendMessage() : null
                            }}
                        />
                        <button onClick={sendMessage}>
                            Отправить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat
