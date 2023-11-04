import { defineBuildConfig } from 'unbuild'
import type { Plugin } from 'vite'
import { transform } from 'esbuild'
import fs from "node:fs";
import path from "node:path";

function copyFile(from: string, to: string, overwrite = false) {
  return {
    name: 'copy-files',
    generateBundle() {
      const log = (msg: string) => console.log('\x1b[36m%s\x1b[0m', msg)
      log(`copy file: ${from} → ${to}`)
      fs.copyFileSync(
        path.resolve(from),
        path.resolve(to)
      )
    }
  }
}

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/wasm',
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: false,
    cjsBridge: false,
  },
  hooks: {
    'rollup:options': function (ctx, options) {
      options.plugins ||= []
      // @ts-expect-error force
      options.plugins.push(copyFile('./src/assets/opencv.wasm', './dist/opencv.wasm'))
    },
  },
})
