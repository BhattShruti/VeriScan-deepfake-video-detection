import { motion } from 'framer-motion'

const LoadingSpinner = ({ size = 60 }) => {
  return (
    <div className="flex justify-center items-center">
      <motion.div
        className="glass rounded-full"
        style={{
          width: size,
          height: size,
          border: '4px solid rgba(255, 255, 255, 0.2)',
          borderTop: '4px solid white'
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </div>
  )
}

export default LoadingSpinner

