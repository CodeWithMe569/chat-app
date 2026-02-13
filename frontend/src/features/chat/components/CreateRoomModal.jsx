import Modal from "../../../components/ui/Modal"
import Button from "../../../components/ui/Button"
import Input from "../../../components/ui/Input"

export default function CreateRoomModal({
  roomName,
  setRoomName,
  error,
  loading,
  onClose,
  onSubmit
}) {
  return (
    <Modal title="Create Room" onClose={onClose}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          label="Room name"
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Enter room name"
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
            Create
          </Button>
        </div>
      </form>
    </Modal>
  )
}

