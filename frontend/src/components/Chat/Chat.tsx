import React, {useState} from 'react';
import NewMessageComp from "../newMessageComp/newMessageComp";

interface Chat {
    chatID : number;
}

interface Msg {
    text: string;
    chatID: number;
    time?: number;
}

interface ChatProps {
    chat : Chat | null;
}
const Chat :  React.FC<ChatProps> = ({chat}) => {

    const [msgList, setMsgList] = useState<Msg[]>([]);

    return (
        <div

            style={{
                gap: "40px",
            }}
        >

            <div>
                {msgList.length > 0 &&
                    msgList.map(msg =>
                            <span>
                            <div>
                                {msg.text}
                            </div>
                    </span>
                    )
                }

                {!msgList.length &&
                    <div>
                        Empty chat
                    </div>
                }
            </div>

            <div>
                <NewMessageComp/>
            </div>
</div>

    );
};

export default Chat;