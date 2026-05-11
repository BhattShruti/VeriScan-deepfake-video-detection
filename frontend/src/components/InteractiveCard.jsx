import { motion } from 'framer-motion'
import { useState } from 'react'

const InteractiveCard = ({ children, className = '', glowColor = '#00d4ff' }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <motion.div
      className={`glass rounded-2xl p-8 relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        boxShadow: isHovered 
          ? `0 20px 60px rgba(0, 212, 255, 0.4), 0 0 40px ${glowColor}40`
          : '0 8px 32px rgba(0, 0, 0, 0.6)'
      }}
    >
      {/* Animated glow effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
            width: 200,
            height: 200,
            background: `radial-gradient(circle, ${glowColor}20 0%, transparent 70%)`,
            borderRadius: '50%'
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          border: `1px solid ${glowColor}`,
          opacity: isHovered ? 0.6 : 0.2,
          boxShadow: isHovered ? `0 0 20px ${glowColor}60` : 'none'
        }}
        animate={{
          opacity: isHovered ? [0.6, 0.8, 0.6] : 0.2
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0
        }}
      />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}

export default InteractiveCard

