export default function screenWidth () {
  if (typeof window !== 'undefined') {
    // browser code
    return window.addEventListener('resize', window.innerWidth)
  }
  return false
}
