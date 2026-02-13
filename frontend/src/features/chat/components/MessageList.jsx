export default function MessageList({ messages }) {

    return (
        <div className="flex-1 overflow-y-auto p-4">

            {messages.map(m => (
                <div key={m._id} className="mb-2 text-white">
                    {m.content}
                </div>
            ))}

        </div>
    )
}
