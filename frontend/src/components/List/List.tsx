import React, {MouseEventHandler, useState} from 'react';
import chat from "../Chat/Chat";
import Chat from "../Chat/Chat";

interface ListProps {
    onChatClick: (chat : Chat) => any;
}
const List : React.FC<ListProps> =  ({onChatClick}) => {

    const [chats, setChats] = useState([]);


    const handleRefr = () => {

    }

    return (
        <div>
            <button
            onClick={handleRefr}
            >
                Refresh
            </button>
            <div>
                {!chats.length &&
                    <div>
                        No chats
                    </div>
                }

                {chats.length > 0 &&
                    <div
                        style={{
                            cursor: "pointer",
                        }}

                    >
                        {
                            chats.map(chat =>
                                <div onClick={
                                    () => {
                                        onChatClick(chat);
                                    }
                                }>

                                </div>
                            )
                        }
                    </div>}
            </div>
        </div>
    );
};

export default List;