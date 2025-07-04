import React from 'react'
import { useEffectsTag } from './useEffectsTag'
import { IoIosArrowForward, IoMdClose } from 'react-icons/io'

const EffectsTag: React.FC = () => {
  const {
    linearMap,
    colorMap,
    effectStack,
    removeEffectFromStack,
    hasROISelected,
    hasHistogramROISelected
  } = useEffectsTag()

  return (
    <div
      className="
        absolute top-2 left-20
        bg-background text-white
        px-2 py-1 rounded-lg z-10
        shadow-md font-semibold text-sm
        border border-border-primary
        flex flex-wrap items-center gap-1
      "
    >
      {hasHistogramROISelected && (
        <>
          <span>Histograma</span>
          <span className="px-1">
            <IoIosArrowForward className="fill-content-tertiary" />
          </span>
        </>
      )}
      {hasROISelected && (
        <>
          <span>ROI</span>
          <span className="px-1">
            <IoIosArrowForward className="fill-content-tertiary" />
          </span>
        </>
      )}
      <span>{linearMap}</span>
      <span className="px-1">
        <IoIosArrowForward className="fill-content-tertiary" />
      </span>
      <span>{colorMap}</span>
      {effectStack.map((effect, idx) => (
        <React.Fragment key={idx}>
          <span className="px-1">
            <IoIosArrowForward className="fill-content-tertiary" />
          </span>
          <button
            onClick={() => removeEffectFromStack(idx)}
            className="
              inline-flex items-center gap-2
              px-1 py-0.5
              rounded-sm
              hover:bg-red-600/20
            "
          >
            <span className="font-bold bg-background-tertiary rounded-full p-0.5">
              <IoMdClose />
            </span>
            <span>{effect}</span>
          </button>
        </React.Fragment>
      ))}
    </div>
  )
}

export default EffectsTag
