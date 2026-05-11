import { motion } from 'framer-motion'

const DeepfakeIcon = ({ size = 100 }) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Face outline */}
      <ellipse
        cx="50"
        cy="50"
        rx="35"
        ry="40"
        stroke="url(#faceGradient)"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
      
      {/* Left eye */}
      <motion.circle
        cx="40"
        cy="45"
        r="5"
        fill="#00d4ff"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Right eye */}
      <motion.circle
        cx="60"
        cy="45"
        r="5"
        fill="#00d4ff"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.1
        }}
      />
      
      {/* Distortion waves (indicating manipulation) */}
      <motion.path
        d="M 30 65 Q 50 70 70 65"
        stroke="#ef4444"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M 30 65 Q 50 70 70 65",
            "M 30 65 Q 50 68 70 65",
            "M 30 65 Q 50 72 70 65",
            "M 30 65 Q 50 70 70 65"
          ]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Warning triangles */}
      <motion.polygon
        points="25,30 30,40 20,40"
        fill="#f59e0b"
        opacity="0.8"
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.polygon
        points="75,30 80,40 70,40"
        fill="#f59e0b"
        opacity="0.8"
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3
        }}
      />
      
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="faceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
    </motion.svg>
  )
}

export default DeepfakeIcon

