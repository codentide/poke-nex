'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'

/**
 * Props for the CustomSelect component.
 * @template T - The type of the value being selected.
 */
export interface CustomSelectProps<T> {
  className?: string
  buttonClassName?: string
  options: {
    label: string
    value: T
  }[]
  value: T
  onSelect: (option: T) => void
  renderItem?: (label: string, value: T) => ReactNode
}

/**
 * A stylized dropdown/select component with support for custom rendering.
 */
export const CustomSelect = <T,>({
  className = '',
  buttonClassName = '',
  options,
  value,
  onSelect,
  renderItem,
}: CustomSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  // Find the currently selected option to display its label
  const selectedOption = options.find((opt) => opt.value === value)
  const displayLabel = selectedOption ? selectedOption.label : String(value)

  // Close the dropdown when clicking outside of the component
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

  /**
   * Helper function to determine how to render each item.
   * Priority: custom renderItem prop > default capitalized label.
   */
  const renderContent = (label: string, val: T) => {
    if (renderItem) return renderItem(label, val)
    return <span className="capitalize">{label}</span>
  }

  return (
    <div className={`relative ${className} font-rajdhani`} ref={selectRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-full flex items-center justify-between px-3 py-2 rounded-md bg-zinc-800 border border-white/10 backdrop-blur-md text-zinc-200 hover:bg-white/5 transition-all cursor-pointer ${buttonClassName}`}
      >
        <div className="flex items-center gap-3">
          {selectedOption
            ? renderContent(selectedOption.label, selectedOption.value)
            : displayLabel}
        </div>
        <MdKeyboardArrowDown
          className={`text-2xl transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Options List */}
      {isOpen && (
        <ul className="absolute z-50 w-full mt-2 bg-zinc-900 border border-white/10 rounded-md shadow-2xl max-h-64 overflow-y-auto">
          {options.map((option) => (
            <li
              key={String(option.label)}
              onClick={() => {
                onSelect(option.value)
                setIsOpen(false)
              }}
              className={`flex items-center gap-3 p-3 leading-4 rounded-xs cursor-pointer text-md text-zinc-400 hover:bg-white/10 transition-colors ${
                value === option.value ? 'text-zinc-200! bg-white/5' : ''
              }`}
            >
              {renderContent(option.label, option.value)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
