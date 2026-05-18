import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import InteractiveCard from '../components/InteractiveCard'
import FeatureIcons from '../components/FeatureIcons'
import CodeSnippet from '../components/CodeSnippet'
import NetworkNodes from '../components/NetworkNodes'
import gbpuatLogoCircle from '../assets/gbpuat_logo_circle.png'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="container">
      <motion.div
        className="content-wrapper max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <InteractiveCard glowColor="#00d4ff">
          <motion.div
            className="text-center space-y-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="mb-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <motion.div
                  className="rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-white"
                  style={{
                    width: '92px',
                    height: '92px',
                    boxShadow: '0 0 18px rgba(0, 212, 255, 0.45)'
                  }}
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <img
                    src={gbpuatLogoCircle}
                    alt="University Logo"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: 'scale(1.2)',
                      objectPosition: 'center'
                    }}
                  />
                </motion.div>
                <motion.h1
                  className="text-6xl md-text-7xl font-bold bg-gradient-text"
                  style={{ filter: 'drop-shadow(0 0 20px rgba(0, 212, 255, 0.5))' }}
                >
                  VERISCAN
                </motion.h1>
              </div>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="w-3 h-3 rounded-full bg-accent-cyan animate-pulse"></div>
                <span className="text-accent-cyan text-sm font-semibold">AI-POWERED DETECTION</span>
                <div className="w-3 h-3 rounded-full bg-accent-cyan animate-pulse"></div>
              </div>
            </motion.div>

            <motion.p
              className="text-2xl md-text-3xl text-white-90 font-semibold mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Deepfake Video Detection & Verification
            </motion.p>

            <motion.div
              className="max-w-2xl mx-auto mt-8 mb-12"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-lg md-text-xl text-white-70 leading-relaxed mb-4">
                <span className="text-accent-cyan font-semibold">Deepfakes</span> are sophisticated AI-generated videos that can manipulate faces, voices, and actions to create convincing but entirely fabricated content. These synthetic media pose serious risks to trust, security, and information integrity.
              </p>
              <p className="text-base md-text-lg text-white-60 leading-relaxed">
                VERISCAN employs advanced <span className="text-accent-blue">machine learning algorithms</span> to analyze video content frame-by-frame, detecting subtle artifacts and inconsistencies that reveal AI manipulation. Verify authenticity and protect yourself from deception.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={() => navigate('/upload')}
                variant="primary"
                className="text-xl px-12 py-6 font-bold"
              >
                🔍 Scan Video for Deepfakes
              </Button>
            </motion.div>

            <FeatureIcons />

            {/* Code snippet showcase */}
            <motion.div
              className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <CodeSnippet
                code={`def detect_deepfake(video):
    # Extract frames
    frames = extract_frames(video)
    
    # Analyze with AI model
    predictions = model.predict(frames)
    
    # Calculate confidence
    confidence = np.mean(predictions)
    
    return confidence > 0.95`}
                language="python"
              />
              <div className="flex flex-col justify-center">
                <NetworkNodes />
                <p className="text-white-60 text-xs text-center mt-2">
                  Neural Network Analysis
                </p>
              </div>
            </motion.div>
          </motion.div>
        </InteractiveCard>
      </motion.div>
    </div>
  )
}

export default Home

