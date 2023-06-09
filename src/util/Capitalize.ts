export default function (str: string): string {
  const res = str.split('')
  res[0] = res[0].toUpperCase()
  return res.join('')
}
