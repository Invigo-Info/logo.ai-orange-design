// imagetracerjs ships no TypeScript types. We only use imagedataToSVG, which
// turns an ImageData into a real (path-based) SVG string. Options is a loose
// numeric/boolean/string bag (the library's documented preset keys).
declare module 'imagetracerjs' {
  type ImageTracerOptions = Record<string, number | string | boolean>
  const ImageTracer: {
    imagedataToSVG(imgd: ImageData, options?: ImageTracerOptions | string): string
    imagedataToTracedata(imgd: ImageData, options?: ImageTracerOptions | string): unknown
  }
  export default ImageTracer
}
