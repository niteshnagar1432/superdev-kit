// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    outDir: 'dist',
    splitting: false,
    clean: true,
    target: 'esnext'
});
