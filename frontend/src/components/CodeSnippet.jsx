import { motion } from 'framer-motion'

const CodeSnippet = ({ code, language = 'python' }) => {
  const lines = code.split('\n')
  
  return (
    <motion.div
      className="glass rounded-lg p-4 font-mono text-xs overflow-hidden"
      style={{
        background: 'rgba(10, 14, 39, 0.9)',
        border: '1px solid rgba(0, 212, 255, 0.3)'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <span className="text-white-60 text-xs">{language}</span>
        </div>
        <span className="text-accent-cyan text-xs" style={{ fontSize: '8px' }}>●</span>
      </div>
      <div className="space-y-1">
        {lines.map((line, index) => (
          <motion.div
            key={index}
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="text-white-60 text-xs select-none">{index + 1}</span>
            <code className="text-white-80 flex-1">
              {line.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (index * 0.1) + (i * 0.02) }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </code>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default CodeSnippet

