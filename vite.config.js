import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // This path MUST match the final URL subdirectory for this specific app
  base: '/DiGoConsultancy-Website/RinkSynch/',
  plugins: [react()],
})