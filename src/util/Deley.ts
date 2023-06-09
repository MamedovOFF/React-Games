export default function (ms: number, callback: () => any) {
  setTimeout(callback, ms)
}
