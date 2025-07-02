import AnimatedBreadcrumb from './AnimatedBreadcrumb'
import AvatarMenu from './AvatarMenu'
import { TopbarProps } from './interfaces'
import { useTopbar } from './useTopbar'

const Topbar = ({ isDisabled = false }: TopbarProps) => {
  const { translatedPathname } = useTopbar()

  if (!isDisabled) {
    return (
      <div className="w-full h-auto py-3 px-4 bg-background border border-border-secondary border-l-0 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold text-primary">CREATUS SECURITY</h1>
          <AnimatedBreadcrumb path={translatedPathname} />
        </div>
        <AvatarMenu />
      </div>
    )
  }

  return <></>
}

export default Topbar
