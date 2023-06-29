import { resolve } from 'path';
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

export default (() => {
  const lessonName = process.env.LESSON_NAME;

  return defineConfig({
    build: {
      rollupOptions: {
        input: {
          'lesson/domOperation': resolve(__dirname, 'src/lesson/domOperation/index.html'),
          'lesson/ajax': resolve(__dirname, 'src/lesson/ajax/index.html'),
          'lesson/promise': resolve(__dirname, 'src/lesson/promise/index.html'),
          practice: resolve(__dirname, 'src/practice/index.html'),
        },
        outDir: 'dist/',
        output: {
          entryFileNames: 'src/[name]/index.js',
          assetFileNames: assetInfo => assetInfo.name,
        }
      },
      polyfillModulePreload: false,
      emptyOutDir: true,
    },
    plugins: [
      legacy({
        targets: ['ie >= 11'],
      }),
    ],
    server: {
      open: `/src/${lessonName}/index.html`,
      port: 8000,
    },
  });
});