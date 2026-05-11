import { motion } from 'framer-motion'

const HackingVisual = () => {
  const matrixChars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
  
  return (
    <div className="relative w-full h-48 overflow-hidden rounded-lg glass" style={{
      background: 'rgba(10, 14, 39, 0.8)',
      border: '1px solid rgba(0, 212, 255, 0.2)',
      minHeight: '192px'
    }}>
      {/* Matrix-like falling characters */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-accent-cyan font-mono text-xs opacity-30"
          style={{
            left: `${(i * 5) % 100}%`,
            fontSize: '10px'
          }}
          animate={{
            y: [0, 200],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear"
          }}
        >
          {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
        </motion.div>
      ))}
      
      {/* Scanning grid overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#00d4ff" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      
      {/* Center hexagon */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60">
          <polygon
            points="30,5 50,15 50,35 30,45 10,35 10,15"
            fill="none"
            stroke="#00d4ff"
            strokeWidth="2"
            opacity="0.6"
          />
          <circle cx="30" cy="25" r="3" fill="#00ffff">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </svg>
      </motion.div>
    </div>
  )
}

export default HackingVisual

