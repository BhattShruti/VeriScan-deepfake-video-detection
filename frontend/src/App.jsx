import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Upload from './pages/Upload'
import Result from './pages/Result'
import BackgroundPattern from './components/BackgroundPattern'

function App() {
  return (
    <>
      <BackgroundPattern />
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </>
  )
}

export default App

