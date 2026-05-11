import { motion } from 'framer-motion'

const SecurityBadge = ({ verified = true, size = 80 }) => {
  return (
    <motion.div
      className="relative"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shield background */}
        <path
          d="M50 10 L20 20 L20 45 Q20 65 35 75 L50 85 L65 75 Q80 65 80 45 L80 20 Z"
          fill={verified ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)"}
          stroke={verified ? "#10b981" : "#ef4444"}
          strokeWidth="2"
        />
        
        {/* Checkmark or X */}
        {verified ? (
          <motion.path
            d="M35 50 L45 60 L65 40"
            stroke="#10b981"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        ) : (
          <>
            <motion.path
              d="M40 40 L60 60"
              stroke="#ef4444"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            />
            <motion.path
              d="M60 40 L40 60"
              stroke="#ef4444"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            />
          </>
        )}
        
        {/* Glow effect */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={verified ? "#10b981" : "#ef4444"}
          strokeWidth="1"
          opacity="0.3"
        >
          <animate
            attributeName="r"
            values="45;50;45"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.3;0.1;0.3"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </motion.div>
  )
}

export default SecurityBadge

