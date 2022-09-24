import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import Join from "./components/Join";
import MessageInput from "./components/MessageInput";
import Messages from "./components/Messages";
import Sidebar from "./components/Sidebar";


interface Messages {
    name: string;
    text: string;
}

function App() {
    const [socket, setSocket] = useState<Socket>();
    const [messages, setMessages] = useState<Array<Messages>>([]);
    const [joined, setJoined] = useState(false);
    const [name, setName] = useState("");
    const [typingDisplay, setTypingDisplay] = useState("");

    let timeout;

    const emitTyping = () => {
        socket?.emit("typing", {
            isTyping: true,
        });
        timeout = setTimeout(
            () => socket?.emit("typing", { isTyping: false }),
            2000
        );
    };

    const join = () => {
        if (name === "") return;
        socket?.emit("join", { name: name }, () => {
            setJoined(true);
        });
    };

    const send = (value: string) => {
        socket?.emit("createMessage", { text: value });
    };

    useEffect(() => {
        const newSocket = io("http://localhost:3001");
        newSocket.emit("findAllMessages", {}, (res: Array<Messages>) => {
            setMessages(res);
        });
        setSocket(newSocket);
    }, [setSocket]);

    const messageListener = (message: Messages) => {
        setMessages([...messages, message]);
        if (message.text === "#/clear") {
            setMessages([]);
            return;
        }

        socket?.on("typing", ({ name, isTyping }) => {
            if (isTyping) {
                setTypingDisplay(`${name} is tying...`);
            } else {
                setTypingDisplay("");
            }
        });
    };

    useEffect(() => {
        socket?.on("message", messageListener);
        return () => {
            socket?.off("message", messageListener);
        };
    }, [messageListener]);

    return (
        <>
            {!joined ? (
                <Join setName={setName} join={join} />
            ) : (
                <div className="flex h-screen antialiased text-gray-800">
                    <div className="flex flex-row h-full w-full overflow-x-hidden">
                        <Sidebar currUserName={name} />
                        <div className="flex flex-col flex-auto h-full p-6">
                            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                                <div className="flex flex-col h-full overflow-x-auto mb-4">
                                    <div className="flex flex-col h-full">
                                        <Messages
                                            currUserName={name}
                                            messages={messages}
                                        />
                                    </div>
                                </div>
                                <span className="text-gray-700">
                                    {typingDisplay && typingDisplay}
                                </span>

                                <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                                    <MessageInput
                                        emitTyping={emitTyping}
                                        send={send}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default App;

