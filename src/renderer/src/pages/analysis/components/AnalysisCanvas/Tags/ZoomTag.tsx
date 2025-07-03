const ZoomTag = ({ zoom }: { zoom: string }) => {
  return (
    <div
      className="absolute top-2 left-2 bg-background text-white px-2 py-1 rounded-lg z-10
        shadow-md font-semibold text-sm border-1 border-border-primary"
    >
      {zoom}%
    </div>
  )
}

export default ZoomTag
