export default function AuthLayout({ title, children }) {
    return (
        <div className="min-h-screen bg-[#181227] flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-xl p-8">

                {title && (
                    <h1 className="text-2xl font-semibold mb-6 text-center">
                        {title}
                    </h1>
                )}

                {children}

            </div>

        </div>
    )
}
