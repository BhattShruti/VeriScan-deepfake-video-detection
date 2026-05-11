import { motion } from 'framer-motion'

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false }) => {
  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
      color: '#0a0e27',
      boxShadow: '0 4px 15px rgba(0, 212, 255, 0.4)'
    },
    secondary: {
      background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
      color: 'white',
      boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)'
    },
    success: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)'
    }
  }

  return (
    <motion.button
      className={`glass glass-hover px-8 py-4 rounded-xl font-semibold text-lg ${className}`}
      style={{
        ...variants[variant],
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1
      }}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  )
}

export default Button

