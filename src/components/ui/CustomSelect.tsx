import { ReactNode, useEffect, useRef, useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'

interface Props<T> {
  options: {
    key: string
    value: T
  }[]
  selected: string
  onSelect: (option: T) => void
  renderItem: (key: string) => ReactNode
  classname?: string
}

export const CustomSelect = <T,>({
  options,
  selected,
  onSelect,
  renderItem,
  classname,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find(
    (opt) => opt.value === selected || opt.key === selected
  )
  const displayKey = selectedOption ? selectedOption.key : selected

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`relative ${classname}`} ref={selectRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-md bg-zinc-900/50 border border-white/10 backdrop-blur-md text-white hover:bg-white/5 transition-all"
      >
        {/* Usamos displayKey para asegurar que se vea la llave */}
        <div className="flex items-center gap-3">{renderItem(displayKey)}</div>
        <MdKeyboardArrowDown
          className={`text-2xl transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <ul className="absolute z-50 w-full mt-2 p-2 bg-zinc-900 border border-white/10 rounded-md shadow-2xl max-h-64 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option.key}
              onClick={() => {
                onSelect(option.value)
                setIsOpen(false)
              }}
              className={`flex items-center gap-3 px-3 py-2 rounded-xs cursor-pointer text-md hover:bg-white/10 transition-colors ${
                selected === option.key || selected === option.value ? 'bg-white/5' : ''
              }`}
            >
              {renderItem(option.key)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
