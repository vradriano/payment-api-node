export function formatValueIfLessThanOne(value: number) {
  if(value > 0 && value < 0.01) {
    return 0.01
  } else {
    return value
  }
}