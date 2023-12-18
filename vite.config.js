import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createServer as createViteServer } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: './certificates/key.pem',
      cert: './certificates/cert.pem',
    },
  },
})
