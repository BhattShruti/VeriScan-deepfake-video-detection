# VERISCAN - Deepfake Video Detection Frontend

A modern, beautiful React frontend for deepfake video detection with glassmorphism design and smooth animations.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Navigate to frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   The app will automatically open at `http://localhost:3000`

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.jsx       # Animated button component
│   │   ├── Card.jsx         # Glassmorphism card component
│   │   └── LoadingSpinner.jsx # Loading animation
│   ├── pages/               # Page components
│   │   ├── Home.jsx         # Landing page
│   │   ├── Upload.jsx       # Video upload page
│   │   └── Result.jsx       # Results display page
│   ├── App.jsx              # Main app with routing
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Features

- **Modern 3D UI**: Glassmorphism design with gradients and soft shadows
- **Smooth Animations**: Powered by Framer Motion
- **3D Hover Effects**: Interactive elements with CSS transforms
- **Responsive Design**: Works on all screen sizes
- **Video Preview**: See your video before uploading
- **Real-time Feedback**: Loading states and error handling

## 🔌 API Integration

The frontend expects a backend API running on `http://localhost:5000` with the following endpoints:

- **POST** `/upload` - Upload video file
  - Body: `FormData` with `video` field
  - Response: Upload confirmation

- **GET** `/predict` - Get prediction result
  - Response: 
    ```json
    {
      "prediction": "REAL" | "DEEPFAKE" | 0 | 1,
      "confidence": 0.95
    }
    ```

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Framer Motion** - Animation library
- **Axios** - HTTP client
- **CSS3** - Custom styling with glassmorphism

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎯 Pages

### Home Page (`/`)
- Welcome message and description
- Call-to-action button to upload video

### Upload Page (`/upload`)
- Video file selection
- Video preview
- Upload and analysis button

### Result Page (`/result`)
- Prediction result (REAL/DEEPFAKE)
- Confidence score
- Color-coded display
- Option to upload another video

## 🎨 Design System

- **Colors**: Purple gradient theme with glassmorphism
- **Typography**: System fonts for clean, modern look
- **Spacing**: Consistent padding and margins
- **Animations**: Smooth spring-based transitions

## 🔧 Customization

You can customize the design by modifying:
- `src/index.css` - Global styles and CSS variables
- Component files - Individual component styles
- Color gradients in `:root` CSS variables

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🐛 Troubleshooting

**Backend connection error:**
- Make sure your backend server is running on `http://localhost:5000`
- Check CORS settings on your backend

**Video upload fails:**
- Ensure the video file is a valid video format
- Check file size limits on backend

**Styling issues:**
- Clear browser cache
- Ensure all dependencies are installed

## 📄 License

MIT

