export default function Input({
  label,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-1">

      {label && (
        <label className="text-sm text-slate-300">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`
          w-full px-3 py-2 rounded-lg
          bg-slate-700
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
          ${className}
        `}
      />

      {error && (
        <p className="text-xs text-red-400">
          {error}
        </p>
      )}

    </div>
  )
}
