import { AnimatePresence, motion } from 'framer-motion'

type InputErrorMessageProps = {
  message?: string
}

export function InputErrorMessage({ message }: InputErrorMessageProps) {
  return (
    <AnimatePresence initial={false}>
      {message ? (
        <motion.div
          key="error-message"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="overflow-hidden p-0"
        >
          <span className="text-xs text-destructive">{message}</span>
        </motion.div>
      ) : (
        <motion.div
          key="empty-error-message"
          initial={{ opacity: 1, height: 'auto' }}
          animate={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="overflow-hidden"
        />
      )}
    </AnimatePresence>
  )
}
