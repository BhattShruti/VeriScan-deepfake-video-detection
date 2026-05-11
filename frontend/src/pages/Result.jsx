import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import InteractiveCard from '../components/InteractiveCard'
import SecurityBadge from '../components/SecurityBadge'
import DeepfakeIcon from '../components/DeepfakeIcon'
import CodeTerminal from '../components/CodeTerminal'

const Result = () => {
  const [result, setResult] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const storedResult = sessionStorage.getItem('prediction')
    if (storedResult) {
      setResult(JSON.parse(storedResult))
    } else {
      // If no result, redirect to home
      navigate('/')
    }
  }, [navigate])

  if (!result) {
    return null
  }

  const isReal = result.result?.toUpperCase() === 'REAL' || result.result === 0
  const confidence = result.confidence || result.score || 0
  const confidencePercent = typeof confidence === 'number' 
    ? (confidence * 100).toFixed(2) 
    : confidence

  return (
    <div className="container container-padding">
      <motion.div
        className="content-wrapper-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <InteractiveCard glowColor={isReal ? "#10b981" : "#ef4444"}>
          <div className="space-y-8 text-center">
            <motion.div
              className="mb-8"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <div className="flex items-center justify-center gap-4 mb-2">
                <SecurityBadge verified={isReal} size={50} />
                <motion.h2
                  className="text-4xl font-bold text-white"
                >
                  Deepfake Analysis Complete
                </motion.h2>
              </div>
              <motion.p
                className="text-accent-cyan text-sm font-semibold"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Verification results below
              </motion.p>
            </motion.div>

            {/* Video Preview */}
            {result.videoUrl && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <video
                  src={result.videoUrl}
                  controls
                  className="max-w-full max-h-64 mx-auto rounded-lg glass"
                />
              </motion.div>
            )}

            {/* Prediction Result */}
            <motion.div
              className="space-y-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div
                className={`glass rounded-2xl p-8 ${
                  isReal
                    ? 'border-2 bg-authentic-success'
                    : 'border-2 bg-deepfake-alert'
                }`}
                style={{
                  boxShadow: isReal 
                    ? '0 0 30px rgba(16, 185, 129, 0.3)' 
                    : '0 0 30px rgba(239, 68, 68, 0.3)'
                }}
              >
                <div className="flex items-center justify-center gap-4 mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                  >
                    {isReal ? (
                      <SecurityBadge verified={true} size={80} />
                    ) : (
                      <DeepfakeIcon size={80} />
                    )}
                  </motion.div>
                </div>
                <motion.h3
                  className={`text-5xl font-bold mb-2 ${
                    isReal ? 'text-success-green' : 'text-danger-red'
                  }`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    textShadow: isReal 
                      ? '0 0 20px rgba(16, 185, 129, 0.5)' 
                      : '0 0 20px rgba(239, 68, 68, 0.5)'
                  }}
                >
                  {isReal ? 'AUTHENTIC' : 'DEEPFAKE DETECTED'}
                </motion.h3>
                <motion.p
                  className="text-sm text-white-60 mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.55 }}
                >
                  {isReal ? 'Video appears to be genuine' : 'AI manipulation detected'}
                </motion.p>
                <motion.div
                  className="mt-4 pt-4 border-t border-white-30"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="text-lg text-white-80">
                    Confidence Score: <span className={`font-bold ${isReal ? 'text-success-green' : 'text-danger-red'}`}>{confidencePercent}%</span>
                  </p>
                </motion.div>
              </div>

              {/* Code Terminal showing analysis */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.65 }}
              >
                <CodeTerminal 
                  lines={isReal ? 4 : 5} 
                  animated={false}
                  resultType={isReal ? 'authentic' : 'deepfake'}
                />
              </motion.div>

              {/* Info Message */}
              <motion.div
                className="glass rounded-xl p-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <p className="text-white-70 text-lg leading-relaxed">
                  {isReal
                    ? '✅ Our AI analysis found no signs of deepfake manipulation. The video appears to be authentic and unaltered. However, always verify content from trusted sources.'
                    : '⚠️ WARNING: This video has been flagged as a potential deepfake. Our detection system identified signs of AI manipulation. Exercise extreme caution and verify the source before trusting any claims made in this content.'}
                </p>
                {!isReal && (
                  <div className="mt-4 p-3 bg-red-500-20 rounded-lg border border-red-500-50">
                    <p className="text-red-200 text-sm">
                      <strong>Security Alert:</strong> Deepfakes can be used for misinformation, fraud, or identity theft. Do not share personal information or make decisions based on this content.
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex justify-center gap-4 flex-wrap"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  onClick={() => navigate('/upload')}
                  variant="primary"
                >
                  🔍 Scan Another Video
                </Button>
                <Button
                  onClick={() => navigate('/')}
                  variant="secondary"
                >
                  Back to Home
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </InteractiveCard>
      </motion.div>
    </div>
  )
}

export default Result

