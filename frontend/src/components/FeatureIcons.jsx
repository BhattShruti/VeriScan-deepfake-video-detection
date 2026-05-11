import { motion } from 'framer-motion'

const FeatureIcons = () => {
  const features = [
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
      title: "AI Analysis",
      color: "#00d4ff"
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
      title: "Secure",
      color: "#10b981"
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      title: "Accurate",
      color: "#8b5cf6"
    }
  ]

  return (
    <div className="flex justify-center gap-8 mt-8">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 + index * 0.1 }}
        >
          <motion.div
            className="p-3 rounded-lg glass"
            style={{ color: feature.color }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {feature.icon}
          </motion.div>
          <span className="text-white-70 text-xs font-semibold">{feature.title}</span>
        </motion.div>
      ))}
    </div>
  )
}

export default FeatureIcons

