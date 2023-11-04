export async function loadWasm() {
  console.log('loading wasm')
  const res = await fetch('/assets/opencv.wasm')
  const buf = await res.arrayBuffer()
  console.log(res, buf)
  return buf
}