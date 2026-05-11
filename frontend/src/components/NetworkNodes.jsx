import { motion } from 'framer-motion'

const NetworkNodes = () => {
  const nodes = [
    { id: 1, x: 20, y: 30, delay: 0 },
    { id: 2, x: 50, y: 20, delay: 0.2 },
    { id: 3, x: 80, y: 30, delay: 0.4 },
    { id: 4, x: 20, y: 70, delay: 0.6 },
    { id: 5, x: 50, y: 80, delay: 0.8 },
    { id: 6, x: 80, y: 70, delay: 1.0 }
  ]

  const connections = [
    [1, 2], [2, 3], [1, 4], [2, 5], [3, 6], [4, 5], [5, 6]
  ]

  return (
    <div className="relative w-full h-64" style={{ minHeight: '200px' }}>
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {/* Connection lines */}
        {connections.map(([from, to], index) => {
          const fromNode = nodes[from - 1]
          const toNode = nodes[to - 1]
          return (
            <motion.line
              key={`line-${from}-${to}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="#00d4ff"
              strokeWidth="0.5"
              opacity="0.3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: index * 0.1, repeat: Infinity, repeatDelay: 2 }}
            />
          )
        })}
        
        {/* Nodes */}
        {nodes.map((node) => (
          <motion.g key={node.id}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="3"
              fill="#00d4ff"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                delay: node.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="6"
              fill="none"
              stroke="#00d4ff"
              strokeWidth="0.5"
              opacity="0.5"
              animate={{
                r: [6, 10, 6],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                delay: node.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.g>
        ))}
      </svg>
    </div>
  )
}

export default NetworkNodes

