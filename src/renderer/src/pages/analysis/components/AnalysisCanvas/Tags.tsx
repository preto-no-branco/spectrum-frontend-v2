const Tags = ({
  zoomIn,
  zoomOut,
  resetTransform,
  zoomState
}: {
  zoomIn: () => void
  zoomOut: () => void
  resetTransform: () => void
  zoomState: string
}) => {
  return (
    <>
      <div className="absolute top-2 left-2 bg-background text-white px-2 py-1 rounded-lg z-10 shadow-md font-semibold text-sm">
        {zoomState}%
      </div>
      <div
        onClick={() => resetTransform()}
        className="absolute top-2 right-2 bg-background text-white px-2 py-1 rounded-lg z-10 shadow-md font-semibold text-sm"
      >
        reset
      </div>
      <div
        onClick={() => zoomOut()}
        className="absolute top-12 right-2 bg-background text-white px-2 py-1 rounded-lg z-10 shadow-md font-semibold text-sm"
      >
        -
      </div>
      <div
        onClick={() => zoomIn()}
        className="absolute top-22 right-2 bg-background text-white px-2 py-1 rounded-lg z-10 shadow-md font-semibold text-sm"
      >
        +
      </div>
    </>
  )
}

export default Tags
