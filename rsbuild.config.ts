import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import tailwindConfig from './src/tailwind.config.js';
export default defineConfig({
  tools: {
    // Rsbuild 允许你添加 PostCSS 插件
    postcss: {
      postcssOptions: {
        plugins: [
          require('tailwindcss')(tailwindConfig),
        ],
      }
    },
  },  
  plugins: [pluginReact()],
});
