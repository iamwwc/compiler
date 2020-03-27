import * as charcodes from '../../shared/charcodes'
export function isDigit(c:number) {
  return c >= charcodes.digit0 && c <= charcodes.digit9
}

export function fromCodePoint(c:number) {
  return String.fromCodePoint(c)
}

/**
 * 检测base中是否含有某个位运算位
 * @example
 *  const a = 2
 *  has(a, 1) === false
 *  has(a, 2) === true
 * @param base 要检测的基数
 * @param check 检测的数
 */
export function has(base: number, check :number): boolean {
  return (base & check) > 0
}

export function add(base: number, added: number): number {
  return base | added
}