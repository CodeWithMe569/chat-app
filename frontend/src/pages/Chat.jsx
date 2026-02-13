import { useEffect, useState, useRef } from "react"

import MainLayout from "../layouts/MainLayout"
import Sidebar from "../features/chat/components/Sidebar"
import MessageList from "../features/chat/components/MessageList"
import ChatInput from "../features/chat/components/ChatInput"
import { connectSocket } from "../services/socket"
import { fetchRooms } from "../services/api"


export default function Chat() {

    const socketRef = useRef(null)
    const [room, setRoom] = useState(null)
    const [messages, setMessages] = useState([])
    const [rooms, setRooms] = useState([])

    useEffect(() => {

        socketRef.current = connectSocket()

        socketRef.current.on("receive_message", (msg) => {
            setMessages(m => [...m, msg])
        })

        fetchRooms().then(data => {
            setRooms(data)
        })

        return () => {
            socketRef.current.disconnect()
        }

    }, [])

    const selectRoom = (r) => {
        setRoom(r)
        socketRef.current.emit("join_room", r._id)
    }

    const send = (text) => {
        socketRef.current.emit("send_message", {
            room: room._id,
            content: text
        })
    }

    return (
        <MainLayout>

            <Sidebar rooms={rooms} select={selectRoom} />

            <div className="flex flex-col flex-1">

                <MessageList messages={messages} />

                {room && <ChatInput send={send} />}

            </div>

        </MainLayout>
    )
}
