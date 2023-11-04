import fs from 'node:fs'
import { Buffer } from 'node:buffer'

// @ts-expect-error No def is ok
import { _wasm } from '../src/assets/wasm'

function decodeAndWrite(base64Str: string, filePath: string): void {
  const buff = Buffer.from(base64Str, 'base64')

  fs.writeFile(filePath, buff, (err: NodeJS.ErrnoException | null) => {
    if (err)
      console.log('Error writing file', err)
    else
      console.log('File written successfully')
  })
}

decodeAndWrite(_wasm, 'src/assets/opencv.wasm')
