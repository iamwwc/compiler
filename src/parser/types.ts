import { State } from "./state"

// 影响我下手写的就是类型的定义，不定义好类型那么就没办法继续往下
// 而恰恰定义类型又是最麻烦的，没有难度，却最繁琐
// 所谓递归下降就是while循环，然后依次扫描token，继续调用paserXX解析
// parser中又会调用parseXX，从而形成递归

export interface SourceLocation {
  start: {
    line: number
    column: number
  }
  end: {
    line: number
    column: number
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
}

export class TokenType {
  label: string
  keyword:string = false
  constructor(label: string, conf: TokenTypeOptions) {
    this.label = label
    this.keyword = !!conf.keyword
  }
}

export class Token {
  types: TokenType
  value: any
  loc: SourceLocation
  constructor(state: State) {
    this.types = state.type
    this.value = state.value
  }
}

function createKeyword(key: string, options: TokenTypeOptions) {
  return new TokenType(key,options)
}

export const types: { [name: string]: TokenType } = {
  dot: new TokenType('.',{}),

  // keyword token
  _import: createKeyword('import',{})
}
