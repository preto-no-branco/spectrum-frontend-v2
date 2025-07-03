import { IoMdMove } from 'react-icons/io'

const ModeTag = ({ mode }: { mode: 'MOVE' | 'SELECT' | 'DRAW' | 'ERASE' }) => {
  const modes = {
    MOVE: {
      text: 'Mover',
      icon: <IoMdMove className="w-4 h-4" />
    },
    SELECT: {
      text: 'Selecionar',
      icon: <IoMdMove className="w-4 h-4" />
    },
    DRAW: {
      text: 'Desenhar',
      icon: <IoMdMove className="w-4 h-4" />
    },
    ERASE: {
      text: 'Apagar',
      icon: <IoMdMove className="w-4 h-4" />
    }
  }
  return (
    <div
      className="absolute top-12 left-2 bg-background text-white px-2 py-1 rounded-lg z-10
        shadow-md font-semibold text-sm border-1 border-border-primary"
    >
      <div className="flex items-center gap-2">
        {modes[mode].icon}
        <span>{modes[mode].text}</span>
      </div>
    </div>
  )
}

export default ModeTag
