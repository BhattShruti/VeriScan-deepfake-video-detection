import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '../components/Button'
import InteractiveCard from '../components/InteractiveCard'
import DeepfakeIcon from '../components/DeepfakeIcon'
import AILoadingScreen from '../components/AILoadingScreen'

const Upload = () => {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      if (selectedFile.type.startsWith('video/')) {
        setFile(selectedFile)
        setError('')

        // Create preview
        const videoUrl = URL.createObjectURL(selectedFile)
        setPreview(videoUrl)
      } else {
        setError('Please select a video file')
        setFile(null)
        setPreview(null)
      }
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a video file first')
      return
    }

    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('video', file)

      // Upload video
      const uploadResponse = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      // Get prediction
      const predictResponse = await axios.get('http://localhost:5000/predict')

      // Store result in sessionStorage and navigate
      sessionStorage.setItem('prediction', JSON.stringify({
        result: predictResponse.data.prediction || predictResponse.data.result,
        confidence: predictResponse.data.confidence || predictResponse.data.score,
        videoUrl: preview,
        analysisStatus: predictResponse.data.analysis_status,
        analysisReason: predictResponse.data.analysis_reason,
        faceCoverage: predictResponse.data.face_coverage,
        probFake: predictResponse.data.prob_fake,
        margin: predictResponse.data.margin,
        modelMode: predictResponse.data.model_mode
      }))

      navigate('/result')
    } catch (err) {
      console.error('Upload error:', err)
      setError(
        err.response?.data?.message ||
        'Failed to process video. Please make sure the backend server is running on http://localhost:5000'
      )
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="container container-padding">
      <motion.div
        className="content-wrapper-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <InteractiveCard glowColor={uploading ? "#00ffff" : "#8b5cf6"}>
          <div className="space-y-8">
            {uploading ? (
              <AILoadingScreen />
            ) : (
              /* Upload Form View */
              <div className="space-y-8">
                <motion.div
                  className="text-center mb-8"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <DeepfakeIcon size={60} />
                    <motion.h2
                      className="text-4xl font-bold text-white"
                    >
                      Upload Video for Analysis
                    </motion.h2>
                  </div>
                  <p className="text-accent-cyan text-sm font-semibold">
                    Our AI will scan your video for deepfake indicators
                  </p>
                </motion.div>

                <div className="space-y-6">
                  {/* File Input */}
                  <motion.div
                    className="relative"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label htmlFor="video-upload" className="block cursor-pointer">
                      <input
                        id="video-upload"
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={uploading}
                      />
                      <div className="glass glass-hover rounded-xl p-8 text-center border-2 border-dashed border-white-30 hover-border-white-50 transition-all">
                        {preview ? (
                          <div className="space-y-4">
                            <video
                              src={preview}
                              controls
                              className="max-w-full max-h-64 mx-auto rounded-lg"
                            />
                            <p className="text-white-80 mt-2">{file.name}</p>
                            <p className="text-white-60 text-sm mt-2">
                              Click to select a different video
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="flex items-center justify-center mb-4">
                              <div className="relative">
                                <div className="text-6xl">🎬</div>
                                <motion.div
                                  className="absolute -top-2 -right-2"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                >
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="#00d4ff" strokeWidth="2" strokeDasharray="4 4" />
                                  </svg>
                                </motion.div>
                              </div>
                            </div>
                            <p className="text-white-90 text-lg font-semibold">
                              Drop video file here or click to browse
                            </p>
                            <p className="text-white-60 text-sm">
                              Supported: MP4, AVI, MOV, MKV, WEBM
                            </p>
                            <div className="mt-4 pt-4 border-t border-white-30">
                              <p className="text-white-60 text-xs">
                                ⚠️ Large files may take longer to process
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </label>
                  </motion.div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      className="glass rounded-xl p-4 bg-red-500-20 border border-red-500-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <p className="text-red-200 text-center">{error}</p>
                    </motion.div>
                  )}

                  <motion.div
                    className="flex justify-center gap-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      onClick={handleUpload}
                      variant="primary"
                      disabled={!file || uploading}
                    >
                      🔍 Start Deepfake Scan
                    </Button>
                    <Button
                      onClick={() => navigate('/')}
                      variant="secondary"
                      disabled={uploading}
                    >
                      Back to Home
                    </Button>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        </InteractiveCard>
      </motion.div>
    </div>
  )
}

export default Upload

