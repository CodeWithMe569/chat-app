import { useState } from "react"
import Input from "../../../components/ui/Input"
import Button from "../../../components/ui/Button"

export default function ChatInput({ send }) {

    const [text, setText] = useState("")

    const handle = () => {
        if (!text.trim()) return
        send(text)
        setText("")
    }

    return (
        <div className="p-3 bg-slate-800 flex gap-2">

            <Input
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Type message..."
                className="flex-1"
            />

            <Button
                full={false}
                className="w-auto px-4"
                onClick={handle}>
                Send
            </Button>

        </div>
    )
}
