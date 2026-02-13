import Modal from "../../../components/ui/Modal"
import Button from "../../../components/ui/Button"
import Input from "../../../components/ui/Input"

export default function JoinRoomModal({
  roomId,
  setRoomId,
  error,
  loading,
  onClose,
  onSubmit
}) {
  return (
    <Modal title="Join Room by ID" onClose={onClose}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          label="Room ID"
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter room ID"
          autoFocus
          error={error}
        />

        <div className="flex justify-end space-x-2 pt-2">
          <Button
            type="button"
            full={false}
            className="px-3 py-1.5 text-sm border border-slate-600 bg-transparent hover:bg-slate-800"
            onClick={onClose}
            loading={false}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            full={false}
            className="px-3 py-1.5 text-sm"
            loading={loading}
          >
            Join
          </Button>
        </div>
      </form>
    </Modal>
  )
}

