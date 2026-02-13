export default function Button({
  children,
  loading=false,
  full=true,
  className="",
  ...props
}) {
  return (
    <button
      {...props}
      disabled={loading}
      className={`
        ${full ? "w-full" : ""}
        py-2 rounded-lg
        bg-indigo-600
        hover:bg-indigo-700
        transition
        disabled:opacity-60
        cursor-pointer
        ${className}
      `}
    >
      {loading ? "..." : children}
    </button>
  )
}
