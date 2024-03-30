import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add MUI and Emotion aliases to handle potential CommonJS modules
      '@mui/material': '@mui/material/es',
      '@emotion/react': '@emotion/react/dist/emotion-react.cjs.js',
      '@emotion/styled': '@emotion/styled/dist/emotion-styled.cjs.js'
    }
  }
})
