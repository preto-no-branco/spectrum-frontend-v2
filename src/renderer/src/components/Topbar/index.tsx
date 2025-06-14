import AnimatedBreadcrumb from './AnimatedBreadcrumb'
import AvatarMenu from './AvatarMenu'
import { useTopbar } from './useTopbar'

const Topbar = () => {
  const { location, routesToNames } = useTopbar()
  return (
    <div className="w-screen h-auto py-6 px-4 bg-background border border-secondary flex justify-between items-center">
      <div className="flex items-center gap-8">
        <h1 className="text-2xl font-bold text-primary">CREATUS SECURITY</h1>
        <AnimatedBreadcrumb path={routesToNames[location.pathname]} />
      </div>
      <AvatarMenu />
    </div>
  )
}

export default Topbar
