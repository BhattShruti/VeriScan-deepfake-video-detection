import { motion } from 'framer-motion'

const Logo = ({ size = 60, animated = true }) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={animated ? { rotate: 0 } : {}}
      animate={animated ? { rotate: 360 } : {}}
      transition={animated ? { duration: 20, repeat: Infinity, ease: "linear" } : {}}
    >
      {/* Outer ring */}
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="url(#gradient1)"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
      {/* Middle ring */}
      <circle
        cx="50"
        cy="50"
        r="35"
        stroke="url(#gradient2)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
      {/* Inner scanning circle */}
      <motion.circle
        cx="50"
        cy="50"
        r="25"
        stroke="#00d4ff"
        strokeWidth="2"
        fill="none"
        opacity="0.8"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Center eye/scan icon */}
      <circle cx="50" cy="50" r="8" fill="#00ffff" opacity="0.9">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="50" cy="50" r="4" fill="#0a0e27" />
      
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ffff" />
          <stop offset="100%" stopColor="#00d4ff" />
        </linearGradient>
      </defs>
    </motion.svg>
  )
}

export default Logo

