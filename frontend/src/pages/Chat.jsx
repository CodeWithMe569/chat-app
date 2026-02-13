import { useEffect, useState, useRef } from "react"
import { jwtDecode } from "jwt-decode"

import MainLayout from "../layouts/MainLayout"
import Sidebar from "../features/chat/components/Sidebar"
import MessageList from "../features/chat/components/MessageList"
import ChatInput from "../features/chat/components/ChatInput"

import { connectSocket } from "../services/socket"
import { fetchRooms } from "../services/api"
import { fetchMessages } from "../services/api"
import { sendMessage } from "../services/api"

export default function Chat() {

    const socketRef = useRef(null)
    const [room, setRoom] = useState(null)
    const [messages, setMessages] = useState([])
    const [rooms, setRooms] = useState([])
    const [currentUserId, setCurrentUserId] = useState(null)

    // Get current user ID from token
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            try {
                const decoded = jwtDecode(token)
                setCurrentUserId(decoded.id)
            } catch (err) {
                console.error("Error decoding token:", err)
            }
        }
    }, [])

    // Set up socket connection and listeners
    useEffect(() => {
        socketRef.current = connectSocket()

        const handleReceiveMessage = (msg) => {
            setMessages(prevMessages => {
                // Check if message already exists to prevent duplicates
                const messageExists = prevMessages.some(m => m._id === msg._id)
                if (messageExists) {
                    return prevMessages
                }
                return [...prevMessages, msg]
            })
        }

        socketRef.current.on("receive_message", handleReceiveMessage)

        fetchRooms()
            .then(data => {
                console.log("Fetched rooms:", data)
                setRooms(data)
            })
            .catch(err => {
                console.error("Error fetching rooms:", err)
            })

        return () => {
            socketRef.current.off("receive_message", handleReceiveMessage)
            socketRef.current.disconnect()
        }

    }, [currentUserId])

    const selectRoom = async (r) => {

        setRoom(r)
        socketRef.current.emit("join_room", r._id)
        // load history
        const history = await fetchMessages(r._id)
        setMessages(history)
    }


    const send = async (text) => {
        try {
            const messageData = await sendMessage(room._id, text)
            // Emit the saved message to broadcast to all clients (including self for consistency)
            socketRef.current.emit("send_message", messageData)
        } catch (err) {
            console.error("Error sending message:", err)
        }
    }

    return (
        <MainLayout>

            <Sidebar rooms={rooms} select={selectRoom} />

            <div className="flex flex-col flex-1">

                {room && (
                    <div className="bg-slate-800 p-4 border-b border-slate-700">
                        <h1 className="text-white font-semibold text-lg">{room.name}</h1>
                    </div>
                )}

                <MessageList messages={messages} currentUserId={currentUserId} />

                {room && <ChatInput send={send} />}

            </div>

        </MainLayout>
    )
}
