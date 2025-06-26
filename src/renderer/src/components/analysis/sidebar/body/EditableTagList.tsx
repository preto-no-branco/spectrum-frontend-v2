import { useState } from 'react'
import { X } from 'lucide-react'
import { Input } from '@renderer/components/ui/input'

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
        <Input
          key={index}
          autoFocus
          type="text"
          value={value}
          onChange={(e) => setNewValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAdd()
            if (e.key === 'Escape') {
              setNewValue('')
              setIsAdding(false)
            }
          }}
          className="h-7 dark:bg-background"
          placeholder={placeholder}
        />
      ))}

      {isAdding ? (
        <div className="flex gap-2">
          <Input
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
            className="h-7 dark:bg-background"
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
