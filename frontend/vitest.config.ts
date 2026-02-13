import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigpPaths from "vite-tsconfig-paths";
import netlifyReactRouter from "@netlify/vite-plugin-react-router";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    netlifyReactRouter()
    // netlify()

  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './tests/setup.ts',
  },
});
