import { ReactNode, useEffect, useRef, useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'

export interface CustomSelectProps<T> {
  classname?: string
  options: {
    label: string
    value: T
  }[]
  selected: string
  onSelect: (option: T) => void
  renderItem: (label: string) => ReactNode
}

export const CustomSelect = <T,>({
  classname,
  options,
  selected,
  onSelect,
  renderItem,
}: CustomSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find(
    (opt) => opt.value === selected || opt.label === selected
  )
  const displayKey = selectedOption ? selectedOption.label : selected

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`relative ${classname} font-rajdhani`} ref={selectRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-full flex items-center justify-between px-3 py-2 rounded-md bg-zinc-800 border border-white/10 backdrop-blur-md text-zinc-200 hover:bg-white/5 transition-all cursor-pointer"
      >
        <div className="flex items-center gap-3">{renderItem(displayKey)}</div>
        <MdKeyboardArrowDown
          className={`text-2xl transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <ul className="absolute z-50 w-full mt-2 bg-zinc-900 border border-white/10 rounded-md shadow-2xl max-h-64 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option.label}
              onClick={() => {
                onSelect(option.value)
                setIsOpen(false)
              }}
              className={`flex items-center gap-3 p-3 leading-4 rounded-xs cursor-pointer text-md text-zinc-400 hover:bg-white/10 transition-colors ${
                selected === option.label || selected === option.value
                  ? 'text-zinc-200! bg-white/5'
                  : ''
              }`}
            >
              {renderItem(option.label)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
