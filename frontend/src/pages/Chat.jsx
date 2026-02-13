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

            // If message is not from current user and room is not active, bump unread count
            if (msg.sender?._id && msg.sender._id !== currentUserId) {
                setRooms(prevRooms =>
                    prevRooms.map(r => {
                        if (r._id === msg.room) {
                            const current = r.unreadCount || 0
                            // If this room is currently open, don't increase unread
                            if (room && room._id === r._id) {
                                return { ...r, unreadCount: 0 }
                            }
                            return { ...r, unreadCount: current + 1 }
                        }
                        return r
                    })
                )
            }
        }

        const handleMessagesRead = ({ roomId, readerId }) => {
            // When another user opens the room, mark our sent messages as read
            setMessages(prevMessages =>
                prevMessages.map(m => {
                    if (
                        m.room === roomId &&
                        m.sender &&
                        m.sender._id === currentUserId
                    ) {
                        return { ...m, read: true }
                    }
                    return m
                })
            )
        }

        socketRef.current.on("receive_message", handleReceiveMessage)
        socketRef.current.on("messages_read", handleMessagesRead)

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
            socketRef.current.off("messages_read", handleMessagesRead)
            socketRef.current.disconnect()
        }

    }, [currentUserId])

    const selectRoom = async (r) => {

        setRoom(r)
        socketRef.current.emit("join_room", r._id)
        // load history
        const history = await fetchMessages(r._id)
        setMessages(history)

        // Clear unread count for this room locally
        setRooms(prevRooms =>
            prevRooms.map(roomItem =>
                roomItem._id === r._id
                    ? { ...roomItem, unreadCount: 0 }
                    : roomItem
            )
        )
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

            <Sidebar
                rooms={rooms}
                select={selectRoom}
                onRoomCreated={(newRoom) => {
                    setRooms(prev => [...prev, newRoom])
                }}
                onJoinSuccess={async (joinedRoom) => {
                    setRooms(prev => {
                        const exists = prev.some(r => r._id === joinedRoom._id)
                        return exists ? prev : [...prev, joinedRoom]
                    })

                    setRoom(joinedRoom)
                    if (socketRef.current) {
                        socketRef.current.emit("join_room", joinedRoom._id)
                    }
                    const history = await fetchMessages(joinedRoom._id)
                    setMessages(history)
                }}
            />

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
