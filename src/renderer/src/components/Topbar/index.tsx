import AnimatedBreadcrumb from './AnimatedBreadcrumb'
import AvatarMenu from './AvatarMenu'
import { useTopbar } from './useTopbar'

const Topbar = () => {
  const { translatedPathname } = useTopbar()

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

export default Topbar
