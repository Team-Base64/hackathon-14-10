import React, {useState} from 'react';
import axios from "axios";

interface Message {
    attaches: string[];
    isAuthorTeacher: boolean;
    text: string;
    time: string;
}

interface Chat {
    messages: Message[];
}

function App() {

    const [val, setVal] = useState('');
    const [chats, setChats] = useState<Chat[]>([]);
    const refresh = () => {
        axios.get('http://localhost:8080/api/chats/1')
            .then((resp: any) => {
                    setChats(
                        resp.chats.forEach((chat: any): Chat => {
                            return {
                                messages: chat.messages.forEach((msg: any): Message => {
                                    return {
                                        attaches: [],
                                        isAuthorTeacher: Boolean(msg.isAuthorTeacher),
                                        text: msg.text,
                                        time: String(msg.time),
                                    }
                                })
                            }
                        })
                    );
                }
            )
            .catch(err => console.log(err));
    }

    const changeChat = () => {
    }

    const sendMsg = () => {
        const msg = {
            attaches: [],
            text: val,
        };
        axios.post('http://localhost:8080/api/send', JSON.stringify(msg))
            .then((resp: any) => {
                    const msgForm: Message = {
                        isAuthorTeacher: true,
                        text: msg.text,
                        attaches: [],
                        time: ""
                    }

                    const arr = [...chats];
                    arr[0].messages.push(msgForm);
                    setChats(arr);
                }
            )
            .catch(err => console.log(err));
    }

    return (
        <>
            {/*sidebar*/}
            <div
                style={{
                    display: "flex",
                    gap: "40px",
                }}
            >
                <>
                    <button
                        onClick={refresh}>
                        Refresh
                    </button>


                    {chats &&
                        chats.map(chat => (
                            <div
                                onClick={changeChat}
                            >
                                Name
                            </div>
                        ))
                    }
                </>
            </div>
            {/*sidebar*/}
            {/*messages*/}
            <div>
                {chats[0] &&
                    chats[0].messages.map(msg => (
                        <div>
                            {msg.text}
                        </div>
                    ))
                }
            </div>
            {/*messages*/}

            {/*form*/}
            <div>
                <input
                    onChange={(e) => setVal(e.target.value)}
                />

                <button
                    onClick={sendMsg}
                >
                    Send
                </button>
            </div>
            {/*form*/}
        </>
    );
}

export default App;
