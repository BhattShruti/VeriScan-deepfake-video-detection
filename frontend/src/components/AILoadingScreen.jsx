import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STATUS_MESSAGES = [
    'Detecting deepfake artifacts...',
    'Analyzing temporal coherence...',
    'Scanning facial inconsistencies...',
    'Running neural network inference...',
    'Processing biometric signatures...'
]

const AILoadingScreen = () => {
    const [statusIndex, setStatusIndex] = useState(0)
    const [progress, setProgress] = useState(0)
    const [activeDot, setActiveDot] = useState(0)

    /* Cycle status messages */
    useEffect(() => {
        const interval = setInterval(() => {
            setStatusIndex(prev => (prev + 1) % STATUS_MESSAGES.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    /* Simulated progress bar */
    useEffect(() => {
        let current = 0
        const tick = setInterval(() => {
            current += Math.random() * 2
            if (current >= 94) {
                current = 94
                clearInterval(tick)
            }
            setProgress(current)
        }, 400)
        return () => clearInterval(tick)
    }, [])

    /* Dot animation */
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveDot(prev => (prev + 1) % 5)
        }, 600)
        return () => clearInterval(interval)
    }, [])

    return (
        <motion.div
            className="ai-loading-root"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* ── Scanner Orb ── */}
            <div className="ai-scanner-orb-wrap">
                <div className="ai-ring ai-ring-1" />
                <div className="ai-ring ai-ring-2" />
                <div className="ai-ring ai-ring-3" />

                <motion.div
                    className="ai-scan-arc"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                />

                <motion.div
                    className="ai-scan-arc-inner"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                />

                <div className="ai-core">
                    <motion.div
                        className="ai-core-scanline"
                        animate={{ y: ['-45px', '45px', '-45px'] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <div className="ai-core-iris" />
                    <div className="ai-core-pupil" />
                </div>

                {/* HUD Corners */}
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

            <div className="ai-loading-title-wrap">
                <h2 className="ai-loading-title">AI Detection in Progress</h2>
                <p className="ai-loading-subtitle">Analyzing media, please wait..</p>
            </div>

            <div className="ai-status-wrap">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={statusIndex}
                        className="ai-status-pill"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <span className="ai-status-icon">🔍</span>
                        <span className="ai-status-text">{STATUS_MESSAGES[statusIndex]}</span>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="ai-progress-wrap">
                <div className="ai-progress-header">
                    <span className="ai-progress-label">PROCESSING</span>
                    <span className="ai-progress-pct">{Math.round(progress)}%</span>
                </div>
                <div className="ai-progress-track">
                    <div className="ai-progress-fill" style={{ width: `${progress}%` }} />
                </div>
            </div>

            {/* Indicator dots */}
            <div className="ai-dots-row">
                {[0, 1, 2, 3, 4].map(i => (
                    <div key={i} className={`ai-dot ${i === activeDot ? 'active' : ''}`} />
                ))}
            </div>

            <p className="ai-loading-note">
                ⚡ <i>AI analysis is running — this may take some time depending on video size and system performance.</i>
            </p>
        </motion.div>
    )
}

export default AILoadingScreen
