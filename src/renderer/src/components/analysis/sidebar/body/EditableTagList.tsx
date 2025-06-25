import { useState } from 'react'
import { X } from 'lucide-react'

interface EditableTagListProps {
  values: string[]
  setValues: (values: string[]) => void
  placeholder: string
}

export default function EditableTagList({ values, setValues, placeholder }: EditableTagListProps) {
  const [newValue, setNewValue] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  function handleAdd() {
    if (newValue.trim() && !values.includes(newValue)) {
      setValues([...values, newValue.trim()])
    }
    setNewValue('')
    setIsAdding(false)
  }

  function handleRemove(index: number) {
    const newList = [...values]
    newList.splice(index, 1)
    setValues(newList)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {values.map((value, index) => (
        <div
          key={index}
          className="flex items-center bg-[#0F1112] border border-[#2D3234] rounded-md px-3 py-1"
        >
          <span className="text-[#B3BDC0] text-sm">{value}</span>
          <button className="ml-2" onClick={() => handleRemove(index)}>
            <X className="w-4 h-4 text-[#B3BDC0]" />
          </button>
        </div>
      ))}

      {isAdding ? (
        <div className="flex gap-2">
          <input
            autoFocus
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAdd()
              if (e.key === 'Escape') {
                setNewValue('')
                setIsAdding(false)
              }
            }}
            className="bg-[#0F1112] border border-[#2D3234] text-sm text-[#B3BDC0] px-3 py-1 rounded-md outline-none"
            placeholder={placeholder}
          />
          <button onClick={handleAdd} className="text-sm text-[#00B388] px-2 hover:underline">
            OK
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="text-sm text-[#00B388] px-2 hover:underline w-fit"
        >
          + Adicionar
        </button>
      )}
    </div>
  )
}
