import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell_app',
      remotes: {
        auth_mfe: 'http://localhost:5001/assets/remoteEntry.js',
        community_mfe: 'http://localhost:5002/assets/remoteEntry.js'
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: false },
        'react-dom': { singleton: true, eager: true, requiredVersion: false }
      }
    })
  ],
  build: { target: 'esnext' },
  server: { port: 3000 }
});