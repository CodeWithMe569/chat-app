export default function MessageList({ messages, currentUserId }) {

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-3">

            {messages.map(m => {
                const isOwnMessage = m.sender && m.sender._id === currentUserId
                
                return (
                    <div key={m._id} className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs ${isOwnMessage ? 'bg-indigo-600' : 'bg-slate-700'} rounded-lg p-3`}>
                            <p className="text-xs text-slate-300 mb-1">
                                {m.sender?.username}
                            </p>
                            <p className="text-white break-words">
                                {m.content}
                            </p>
                            {isOwnMessage && (
                                <p className="text-[10px] text-slate-200 mt-1 text-right">
                                    {m.read ? "Read" : "Sent"}
                                </p>
                            )}
                        </div>
                    </div>
                )
            })}

        </div>
    )
}
