import { AnimatePresence, motion } from 'framer-motion'
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from '../ui/breadcrumb'

const AnimatedBreadcrumb = ({ path }: { path: string | string[] }) => {
  const breadcrumbItems = path || ['Não encontrado']
  const itemsArray = Array.isArray(breadcrumbItems) ? breadcrumbItems : [breadcrumbItems]

  const baseDuration = 0.2

  return (
    <Breadcrumb className="gap-2 flex items-center">
      <AnimatePresence mode="sync">
        {itemsArray.map((item, index) => {
          const delay = index * baseDuration
          return (
            <motion.div
              key={`${location.pathname}-${item}-${index}`}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { delay } }}
              exit={{ x: 20, opacity: 0, transition: { duration: 0.2 } }}
              className="flex items-center gap-2"
            >
              {index > 0 && (
                <BreadcrumbSeparator>
                  <span className="text-content-primary">{'>'}</span>
                </BreadcrumbSeparator>
              )}
              <BreadcrumbItem
                className={`inline-block ${
                  index === itemsArray.length - 1 ? 'text-content-primary' : 'text-content-tertiary'
                }`}
              >
                {item}
              </BreadcrumbItem>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </Breadcrumb>
  )
}

export default AnimatedBreadcrumb
