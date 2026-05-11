import { motion } from 'framer-motion'

const ScanningAnimation = () => {
  return (
    <div className="relative w-full h-32 flex items-center justify-center">
      {/* Scanning lines */}
      <motion.div
        className="absolute w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Horizontal scanning line */}
        <motion.div
          className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          style={{ boxShadow: '0 0 10px rgba(0, 212, 255, 0.8)' }}
          animate={{
            y: ['0px', 'calc(100% - 2px)', '0px'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Vertical scanning line */}
        <motion.div
          className="absolute w-0.5 h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
          style={{ boxShadow: '0 0 10px rgba(0, 212, 255, 0.8)' }}
          animate={{
            x: ['0%', 'calc(100% - 2px)', '0%'],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </motion.div>
      
      {/* Corner brackets */}
      <div className="absolute inset-0">
        {/* Top-left */}
        <svg className="absolute top-0 left-0 w-8 h-8" viewBox="0 0 32 32">
          <path
            d="M 4 4 L 4 12 L 12 12"
            stroke="#00d4ff"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        {/* Top-right */}
        <svg className="absolute top-0 right-0 w-8 h-8" viewBox="0 0 32 32">
          <path
            d="M 28 4 L 28 12 L 20 12"
            stroke="#00d4ff"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        {/* Bottom-left */}
        <svg className="absolute bottom-0 left-0 w-8 h-8" viewBox="0 0 32 32">
          <path
            d="M 4 28 L 4 20 L 12 20"
            stroke="#00d4ff"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        {/* Bottom-right */}
        <svg className="absolute bottom-0 right-0 w-8 h-8" viewBox="0 0 32 32">
          <path
            d="M 28 28 L 28 20 L 20 20"
            stroke="#00d4ff"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  )
}

export default ScanningAnimation

