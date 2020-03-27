import { Parser } from "../parser"
import { State } from "../parser/state"

// 影响我下手写的就是类型的定义，不定义好类型那么就没办法继续往下
// 而恰恰定义类型又是最麻烦的，没有难度，却最繁琐
// 所谓递归下降就是while循环，然后依次扫描token，继续调用paserXX解析
// parser中又会调用parseXX，从而形成递归

export class Position {
  row: number
  column: number
  constructor(r: number, co: number) {
    this.row = r
    this.column = co
  }
}

export class SourceLocation {
  start: Position
  end!: Position
  filename?: string
  constructor(start: Position, end?: Position) {
    this.start = start
  }
}

export interface NodeBase {
  start: number
  end: number
  loc: SourceLocation
  extra: { [key: string]: any }
}

export interface Statement extends NodeBase {
  [key: string]: any
}

export interface Program extends NodeBase {
  type: "Program"
  body: Array<Statement>
}

export interface Expression extends NodeBase {

}

export interface ReturnStatement extends Statement {
  type: 'Return'
  arguments?: Expression
}

export interface TokenTypeOptions {
  keyword?: string
  beforeExpr?: boolean
  startsExpr?: boolean
  prefix?: boolean
  postfix?: boolean
}

const beforeExpr = true
const startsExpr = true
const prefix = true
const postfix = true

export class TokenType {
  label: string
  keyword?: string
  /**
   * 用于表达式之前
   */

  beforeExpr: boolean
  /**
   * 用于子表达式(sub-expression)的开头
   * [[1+2]]
   *  ^ ------> 子表达式开头
   * https://chortle.ccsu.edu/Java5/Notes/chap09B/ch09B_10.html
   */
  startsExpr: boolean
  prefix: boolean
  postfix: boolean
  constructor(label: string, conf: TokenTypeOptions = {}) {
    this.label = label
    this.keyword = conf.keyword
    this.beforeExpr = !!conf.beforeExpr
    this.startsExpr = !!conf.startsExpr
    this.prefix = !!conf.prefix
    this.postfix = !!conf.postfix
  }
}

export class Token {
  types: TokenType
  value: any
  loc!: SourceLocation
  constructor(state: State) {
    this.types = state.type
    this.value = state.value
  }
}

function createKeyword(key: string, options: TokenTypeOptions) {
  return new TokenType(key, options)
}

export const types: { [name: string]: TokenType } = {
  number: new TokenType("number", { startsExpr }),

  /**
   * << 1 + /qwe/
   * >> 1/qwe/
   */
  regexp: new TokenType("regexp", { startsExpr }),
  string: new TokenType("string", { startsExpr }),
  eof: new TokenType("eof"),

  arrow: new TokenType("=>", { beforeExpr }),
  dot: new TokenType('.', {}),

  // keyword token
  _import: createKeyword('import', {})
}


export class Node implements NodeBase {
  start: number
  end: number
  loc: SourceLocation
  extra!: { [key: string]: any }
  constructor(parser: Parser, pos: number, location: SourceLocation) {
    this.start = pos
    this.loc = location
    this.end = 0
    this.loc.filename = parser.filename
  }
}