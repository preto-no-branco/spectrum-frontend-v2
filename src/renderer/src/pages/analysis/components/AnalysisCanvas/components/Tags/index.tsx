import EffectsTag from './EffectsTag'
import ZoomTag from './ZoomTag'
import ModeTag from './ModeTag'
import ZoomControls from './ZoomControls'

const Tags = ({
  zoomIn,
  zoomOut,
  resetTransform,
  zoomState,
  mode
}: {
  zoomIn: () => void
  zoomOut: () => void
  resetTransform: () => void
  zoomState: string
  mode: 'MOVE' | 'SELECT' | 'DRAW' | 'ERASE'
}) => {
  return (
    <>
      <ZoomTag zoom={zoomState} />
      <EffectsTag />
      <ModeTag mode={mode} />
      <ZoomControls zoomIn={zoomIn} zoomOut={zoomOut} resetTransform={resetTransform} />
    </>
  )
}

export default Tags
