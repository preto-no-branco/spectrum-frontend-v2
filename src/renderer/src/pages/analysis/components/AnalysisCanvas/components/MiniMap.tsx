import { MiniMap } from 'react-zoom-pan-pinch'

const CanvasMiniMap = ({ image }: { image: string }) => {
  return (
    <div className="absolute top-2 right-14 bg-white border border-gray-300 rounded-sm shadow-lg z-10">
      <MiniMap borderColor="#333" width={250}>
        <img
          src={image}
          alt="Miniatura da imagem"
          className="w-full h-full object-contain pointer-events-none rounded-sm"
        />
      </MiniMap>
    </div>
  )
}

export default CanvasMiniMap
