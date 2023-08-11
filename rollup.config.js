import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { rimrafSync } from 'rimraf'

export default defineConfig(() => {
  const distPath = path.resolve(__dirname, './dist')
  if (existsSync(distPath)) {
    rimrafSync(distPath)
  }
  return [{
    input: './src/index.ts',
    output: [
      {
        format: 'cjs',
        file: 'dist/bundle.cjs.js',
      },
      {
        format: 'esm',
        file: 'dist/bundle.esm.js'
      }
    ],
    plugins: [
      typescript({ declaration: true }),
    ],
  }]
})