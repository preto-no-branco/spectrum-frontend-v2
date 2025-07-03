import { BiMinus, BiPlus, BiTargetLock } from "react-icons/bi"

const ZoomControls = ({
  zoomIn,
  zoomOut,
  resetTransform
}: {
  zoomIn: () => void
  zoomOut: () => void
  resetTransform: () => void
}) => {
  return (
    <>
      <div
        onClick={() => resetTransform()}
        className="absolute top-2 right-2 bg-background text-white px-1 py-1 rounded-lg
                z-10 shadow-md font-semibold text-sm border-1 border-border-primary"
      >
        <BiTargetLock className="w-5 h-5" />
      </div>
      <div
        className="flex flex-col gap-2 justify-center items-center absolute top-12
                right-2 bg-background text-white px-1 py-1 rounded-lg z-10 shadow-md font-semibold
                text-sm border-1 border-border-primary"
      >
        <BiMinus onClick={() => zoomOut()} className="w-5 h-5" />
        <div className="border-t border-gray-600 w-4"></div>
        <BiPlus onClick={() => zoomIn()} className="w-5 h-5" />
      </div>
    </>
  )
}
export default ZoomControls
