export async function loadWasm() {
  const res = await fetch('/assets/opencv.wasm')
  return await res.arrayBuffer()
}