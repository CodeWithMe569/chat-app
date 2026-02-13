import { useState, useRef, useEffect, createContext, useContext } from "react"

// Context to share dropdown state
const DropdownMenuContext = createContext()

export function DropdownMenu({ children, className = "" }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <div className={`relative ${className}`} ref={dropdownRef}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  )
}

// DropdownMenuTrigger component
export function DropdownMenuTrigger({ asChild, children, className = "" }) {
  const { isOpen, setIsOpen } = useContext(DropdownMenuContext)

  if (asChild) {
    // Clone the child element and add onClick handler
    return (
      <div
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        className={className}
      >
        {children}
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        setIsOpen(!isOpen)
      }}
      className={className}
    >
      {children}
    </button>
  )
}

// DropdownMenuContent component
export function DropdownMenuContent({
  children,
  align = "end", // "start" | "end"
  className = ""
}) {
  const { isOpen } = useContext(DropdownMenuContext)

  if (!isOpen) return null

  return (
    <div
      className={`
        absolute z-50 mt-2 min-w-[160px]
        bg-slate-800 border border-slate-700
        rounded-lg shadow-lg
        overflow-hidden
        ${align === "end" ? "right-0" : "left-0"}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

// DropdownMenuItem component for individual menu items
export function DropdownMenuItem({
  children,
  onClick,
  className = "",
  disabled = false
}) {
  const { setIsOpen } = useContext(DropdownMenuContext)

  const handleClick = () => {
    if (!disabled) {
      if (onClick) {
        onClick()
      }
      setIsOpen(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`
        w-full text-left px-4 py-2 text-sm
        text-slate-200
        hover:bg-slate-700
        transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  )
}

// DropdownMenuSeparator component for visual separation
export function DropdownMenuSeparator() {
  return <div className="h-px bg-slate-700 my-1" />
}
