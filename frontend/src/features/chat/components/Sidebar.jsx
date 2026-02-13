import { useState } from "react"
import { Plus, LogIn } from "lucide-react"
import { createRoom, joinRoom as joinRoomApi } from "../../../services/api"
import CreateRoomModal from "./CreateRoomModal"
import JoinRoomModal from "./JoinRoomModal"

export default function Sidebar({ rooms, select, onRoomCreated, onJoinSuccess }) {

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [roomName, setRoomName] = useState("")
    const [createError, setCreateError] = useState("")
    const [isCreating, setIsCreating] = useState(false)

    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)
    const [joinRoomId, setJoinRoomId] = useState("")
    const [joinError, setJoinError] = useState("")
    const [isJoining, setIsJoining] = useState(false)

    const openCreateModal = () => {
        setRoomName("")
        setCreateError("")
        setIsCreateModalOpen(true)
    }

    const closeCreateModal = () => {
        if (isCreating) return
        setIsCreateModalOpen(false)
    }

    const openJoinModal = () => {
        setJoinRoomId("")
        setJoinError("")
        setIsJoinModalOpen(true)
    }

    const closeJoinModal = () => {
        if (isJoining) return
        setIsJoinModalOpen(false)
    }

    const handleCreateRoom = async (e) => {
        e.preventDefault()
        const trimmed = roomName.trim()

        if (!trimmed) {
            setCreateError("Room name cannot be empty.")
            return
        }

        try {
            setIsCreating(true)
            setCreateError("")
            const newRoom = await createRoom(trimmed)

            if (onRoomCreated) {
                onRoomCreated(newRoom)
            }

            setIsCreateModalOpen(false)
            setRoomName("")
        } catch (err) {
            console.error("Error creating room:", err)
            setCreateError("Failed to create room. Please try again.")
        } finally {
            setIsCreating(false)
        }
    }

    const handleJoinRoom = async (e) => {
        e.preventDefault()
        const trimmedId = joinRoomId.trim()

        if (!trimmedId) {
            setJoinError("Room ID cannot be empty.")
            return
        }

        try {
            setIsJoining(true)
            setJoinError("")
            const result = await joinRoomApi(trimmedId)

            if (result.err) {
                setJoinError(result.err || "Failed to join room.")
                return
            }

            if (onJoinSuccess) {
                await onJoinSuccess(result)
            }

            setIsJoinModalOpen(false)
            setJoinRoomId("")
        } catch (err) {
            console.error("Error joining room:", err)
            setJoinError("Failed to join room. Please try again.")
        } finally {
            setIsJoining(false)
        }
    }

    return (
        <div className="w-64 bg-slate-800 p-4 relative">

            <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold">
                    Rooms
                </h2>
                <div className="flex items-center space-x-1">
                    <button
                        type="button"
                        onClick={openJoinModal}
                        className="p-1 rounded hover:bg-slate-700 text-slate-100 cursor-pointer"
                        aria-label="Join room by ID"
                    >
                        <LogIn className="w-5 h-5" />
                    </button>
                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="p-1 rounded hover:bg-slate-700 text-slate-100 cursor-pointer"
                        aria-label="Create room"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {rooms.map(r => (
                <div
                    key={r._id}
                    onClick={() => select(r)}
                    className="p-2 mb-2 rounded hover:bg-slate-700 cursor-pointer">
                    {r.name}
                </div>
            ))}

            {isCreateModalOpen && (
                <CreateRoomModal
                    roomName={roomName}
                    setRoomName={(value) => {
                        setRoomName(value)
                        if (createError) setCreateError("")
                    }}
                    error={createError}
                    loading={isCreating}
                    onClose={closeCreateModal}
                    onSubmit={handleCreateRoom}
                />
            )}

            {isJoinModalOpen && (
                <JoinRoomModal
                    roomId={joinRoomId}
                    setRoomId={(value) => {
                        setJoinRoomId(value)
                        if (joinError) setJoinError("")
                    }}
                    error={joinError}
                    loading={isJoining}
                    onClose={closeJoinModal}
                    onSubmit={handleJoinRoom}
                />
            )}

        </div>
    )
}
