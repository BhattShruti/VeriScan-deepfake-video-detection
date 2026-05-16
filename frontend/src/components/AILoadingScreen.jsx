import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STATUS_MESSAGES = [
  { icon: '🔬', text: 'Initializing AI detection engine...' },
  { icon: '🎞️', text: 'Extracting video frames for analysis...' },
  { icon: '🧠', text: 'Running neural network inference...' },
  { icon: '👁️', text: 'Scanning for facial inconsistencies...' },
  { icon: '📊', text: 'Analyzing temporal coherence patterns...' },
  { icon: '🔍', text: 'Detecting deepfake artifacts...' },
  { icon: '⚡', text: 'Processing biometric signatures...' },
  { icon: '🛡️', text: 'Cross-referencing authenticity markers...' },
  { icon: '📡', text: 'AI analysis is running... almost there...' },
]

const AILoadingScreen = () => {
  const [statusIndex, setStatusIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [dots, setDots] = useState('')

  /* Cycle status messages every 3.5 s */
  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex(prev => (prev + 1) % STATUS_MESSAGES.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  /* Fake progress bar — slowly climbs to ~90 % then holds */
  useEffect(() => {
    let current = 0
    const tick = setInterval(() => {
      current += Math.random() * 1.8
      if (current >= 90) {
        current = 90
        clearInterval(tick)
      }
      setProgress(Math.min(current, 90))
    }, 400)
    return () => clearInterval(tick)
  }, [])

  /* Animated trailing dots */
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'))
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const current = STATUS_MESSAGES[statusIndex]

  return (
    <motion.div
      className="ai-loading-root"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.5 }}
    >
      {/* ── Scanner orb ────────────────────────────────────────── */}
      <div className="ai-scanner-orb-wrap">
        {/* Outer glow rings */}
        <div className="ai-ring ai-ring-1" />
        <div className="ai-ring ai-ring-2" />
        <div className="ai-ring ai-ring-3" />

        {/* Rotating scan arc */}
        <motion.div
          className="ai-scan-arc"
          animate={{ rotate: 360 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
        />

        {/* Counter-rotating inner arc */}
        <motion.div
          className="ai-scan-arc-inner"
          animate={{ rotate: -360 }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'linear' }}
        />

        {/* Core eye */}
        <div className="ai-core">
          {/* Horizontal scan line sweeping inside core */}
          <motion.div
            className="ai-core-scanline"
            animate={{ y: ['-40px', '40px', '-40px'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="ai-core-iris" />
          <div className="ai-core-pupil" />
        </div>

        {/* Corner brackets (futuristic HUD) */}
        <svg className="ai-bracket ai-bracket-tl" viewBox="0 0 32 32">
          <path d="M4 4 L4 14 M4 4 L14 4" stroke="#00d4ff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
        <svg className="ai-bracket ai-bracket-tr" viewBox="0 0 32 32">
          <path d="M28 4 L28 14 M28 4 L18 4" stroke="#00d4ff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
        <svg className="ai-bracket ai-bracket-bl" viewBox="0 0 32 32">
          <path d="M4 28 L4 18 M4 28 L14 28" stroke="#00d4ff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
        <svg className="ai-bracket ai-bracket-br" viewBox="0 0 32 32">
          <path d="M28 28 L28 18 M28 28 L18 28" stroke="#00d4ff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      {/* ── Title ───────────────────────────────────────────────── */}
      <div className="ai-loading-title-wrap">
        <h2 className="ai-loading-title">AI Detection in Progress</h2>
        <p className="ai-loading-subtitle">
          Analyzing media, please wait{dots}
        </p>
      </div>

      {/* ── Cycling status message ──────────────────────────────── */}
      <div className="ai-status-wrap">
        <AnimatePresence mode="wait">
          <motion.div
            key={statusIndex}
            className="ai-status-pill"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <span className="ai-status-icon">{current.icon}</span>
            <span className="ai-status-text">{current.text}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Fake progress bar ───────────────────────────────────── */}
      <div className="ai-progress-wrap">
        <div className="ai-progress-header">
          <span className="ai-progress-label">Processing</span>
          <span className="ai-progress-pct">{Math.round(progress)}%</span>
        </div>
        <div className="ai-progress-track">
          <motion.div
            className="ai-progress-fill"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
          {/* Shimmer overlay */}
          <div className="ai-progress-shimmer" />
        </div>
      </div>

      {/* ── Animated data dots row ──────────────────────────────── */}
      <div className="ai-dots-row">
        {[0, 1, 2, 3, 4].map(i => (
          <motion.div
            key={i}
            className="ai-dot"
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.18,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ── Fine-print note ─────────────────────────────────────── */}
      <p className="ai-loading-note">
        ⚡ AI analysis is running — this may take some time depending on video size and system performance.
      </p>
    </motion.div>
  )
}

export default AILoadingScreen
