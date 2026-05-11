import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const CodeTerminal = ({ lines = 5, animated = true, resultType = 'processing' }) => {
  const [displayedLines, setDisplayedLines] = useState([])
  
  const codeLines = [
    "> Analyzing video frames...",
    "> Extracting facial features...",
    "> Running deepfake detection model...",
    "> Checking for AI artifacts...",
    "> Verifying authenticity...",
    "> Processing complete."
  ]
  
  const resultLines = [
    "> Analysis complete",
    "> Deepfake probability: LOW",
    "> Video appears AUTHENTIC",
    "> Confidence: 95.2%"
  ]
  
  const deepfakeLines = [
    "> Analysis complete",
    "> Deepfake probability: HIGH",
    "> Warning: AI manipulation detected",
    "> Confidence: 87.3%",
    "> Recommendation: Verify source"
  ]
  
  useEffect(() => {
    let linesToShow = codeLines
    if (resultType === 'authentic') linesToShow = resultLines
    if (resultType === 'deepfake') linesToShow = deepfakeLines
    
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayedLines(linesToShow.slice(0, lines))
      }, 500)
      return () => clearTimeout(timer)
    } else {
      setDisplayedLines(linesToShow.slice(0, lines))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines, animated, resultType])

  return (
    <div className="glass rounded-lg p-4 font-mono text-sm" style={{ 
      background: 'rgba(10, 14, 39, 0.9)',
      border: '1px solid rgba(0, 212, 255, 0.3)',
      boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)'
    }}>
      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-white-60 text-xs ml-2">terminal</span>
      </div>
      <div className="space-y-1">
        {displayedLines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="flex items-center gap-2"
          >
            <span className="text-accent-cyan">$</span>
            <span className="text-white-80">{line}</span>
            {index === displayedLines.length - 1 && animated && (
              <motion.span
                className="inline-block w-2 h-4 bg-accent-cyan ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default CodeTerminal

