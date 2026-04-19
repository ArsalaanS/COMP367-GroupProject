import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'community_mfe',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.jsx'
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: false },
        'react-dom': { singleton: true, eager: true, requiredVersion: false },
        '@apollo/client': { singleton: true, requiredVersion: false },
        graphql: { singleton: true, requiredVersion: false }
      }
    })
  ],
  optimizeDeps: { include: ['tslib'] },
  build: { target: 'esnext' },
  server: { port: 5002 }
});