import React, {useState} from 'react';
import NewMessageComp from "./components/newMessageComp/newMessageComp";
import List from "./components/List/List";
import Chat from "./components/Chat/Chat";

function App() {
    const [currChat, setCurrChat] = useState<Chat | null>(null);
    const handleChatClick = (chat: Chat) => {
        setCurrChat(chat);
    }
    return (
        <span
            style={{
                display: "flex",
                gap: "40px",
            }}
        >
       <List onChatClick={handleChatClick}/>
       <Chat chat={currChat}/>
   </span>
    );
}

export default App;
