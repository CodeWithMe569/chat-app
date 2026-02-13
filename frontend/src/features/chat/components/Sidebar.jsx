export default function Sidebar({ rooms, select }) {

    return (
        <div className="w-64 bg-slate-800 p-4">

            <h2 className="font-semibold mb-4">
                Rooms
            </h2>

            {rooms.map(r => (
                <div
                    key={r._id}
                    onClick={() => select(r)}
                    className="p-2 mb-2 rounded hover:bg-slate-700 cursor-pointer">
                    {r.name}
                </div>
            ))}

        </div>
    )
}
