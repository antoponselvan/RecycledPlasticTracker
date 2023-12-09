import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy: {
      // "/api":"http://localhost:3000"
      "/api":"https://j5so6wp9z0.execute-api.us-east-1.amazonaws.com/"
    },
  },
  plugins: [react()],

  define: {
    'process.env': {}
  }
})
