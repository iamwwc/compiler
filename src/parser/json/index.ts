import * as charcodes from '../../shared/charcodes'
import { isDigit, fromCodePoint, add } from './utils'

type valueType = boolean | number | string | null | JsonObject

class Identifier {
  type!: 'Identifier'
  value!: any
  raw!: any
}

class Property {
  key!: Identifier
  value!: valueType
}


class Program {
  type!: 'Array' | 'Object'
  body: Array<Property | valueType> = []
}


class JsonObject {
  type!: 'Object'
  childrens: Array<Property> = []
}

class Node {
  type!: string | number | boolean
  value: any
  childrens: any
}

const NumState = {
  Start: 1 << 0,
  Digit: 1 << 1,
  Digit0: 1 << 2,
  Negative: 1 << 3,
  // 小数
  Fraction: 1 << 4,
  // 指数
  Exponent: 1 << 5
}

enum TokenType {
  STRING, BOOLEAN, NUMBER,
  // [
  LEFT_SQUARE_BRACKET,
  // ]
  RIGHT_SQUARE_BRACKET,
  // {
  LEFT_CURLY_BRACKET,
  // }
  RIGHT_CURLY_BRACKET,
  // :
  COLON,
  // ,
  COMMA,
  // "
  QUOTATION_MARK,
  // eof
  EOF
}

class Token {
  value: any
  type?: TokenType
  constructor(v?: any, type?: TokenType) {
    this.value = v
    this.type = type
  }
}

class State {
  pos!: number
  token!: Token
  input!: string
}

class Tokenizer {
  state: State
  spaces: Array<number> = [charcodes.space, charcodes.tab, charcodes.lineFeed, charcodes.carriageReturn]
  constructor(state: State) {
    this.state = state
  }

  code (index?:number): number {
    if (typeof index === 'undefined')
      return this.state.input.charCodeAt(this.state.pos)
    return this.state.input.charCodeAt(index)
  }

  nextToken() {
    this.skipSpace()
    switch (this.code()) {
      case charcodes.leftCurlyBrace:
        ++this.state.pos
        return this.finishToken(new Token("{", TokenType.LEFT_CURLY_BRACKET))
      case charcodes.rightCurlyBrace:
        ++this.state.pos
        return this.finishToken(new Token("}", TokenType.RIGHT_CURLY_BRACKET))
      case charcodes.questionMark: // "
        ++this.state.pos
        return this.readToken_String()
      case charcodes.digit1: case charcodes.digit2: case charcodes.digit3:
      case charcodes.digit4: case charcodes.digit5: case charcodes.digit6:
      case charcodes.digit7: case charcodes.digit8: case charcodes.digit9: // 0-9
        return this.readToken_Number()
      case charcodes.dash:{
        this.readToken_Dash()
      }
      // case charcodes.
      default: {
        return this.finishToken(new Token('eof', TokenType.EOF))
      }
    }
  }

  t = () => this.state.token
  s = () => this.state

  raise() {

  }

  startToken() {
    // start a new token without any value
    this.state.token = new Token()
  }

  finishToken(token: Token) {
    this.state.token = token
    return token
  }

  skipSpace() {
    while (this.code() in this.spaces) this.state.pos++
  }

  readToken_String() {

  }

  readToken_Dash() {
    const c = this.code()
    
  }

  readToken_Number() {
    let num_state = NumState.Start
    const withState = (arg: number) => add(num_state, arg)
    const start = this.state.pos
    let step = 1
    this.state.token.value = ''
    iterator: while (this.state.pos <= this.state.input.length) {
      const c = this.code()
      switch (num_state) {
        case NumState.Start: {
          if (c === charcodes.dash) {
            step ++
            num_state = NumState.Negative
            break
          }
          if (isDigit(c)) {
            if (c === charcodes.digit0) {
              step ++
              num_state = NumState.Digit0
            } else {
              // digit0 - 9
              this.state.token.value += fromCodePoint(c)
              num_state = NumState.Digit
            }
            break
          }
          this.raise()
        }
        case NumState.Negative: {
          if (isDigit(c)) {
            if (c === charcodes.digit0) {
              num_state = NumState.Digit0
            }else {
              num_state = NumState.Digit
            }
            break
          }
        }
        case NumState.Digit0:{
          if(num_state === NumState.Digit0) {
            
          }
        }
        case NumState.Digit: {

        }
        case NumState.Fraction: {
          
        }
        case NumState.Exponent: {

        }
      }
      this.state.pos++
    }
    const v_str = this.state.token.value
    const v: number = num_state === NumState.Exponent ? parseInt(v_str) : parseFloat(v_str)
  }
}

/**
 * 递归下降调用需返回结果，由上层进行处理，比如，push到childrens中
 */
export class Parser extends Tokenizer {
  root!: Program
  constructor(input: string) {
    let state = new State()
    state.input = input
    state.pos = 0
    super(state)
  }
  parse() {
    this.nextToken()
    this.parseTopLevel()
    return this.root
  }

  parseTopLevel() {
    let tk = this.state.token
    this.root = new Program()
    if (tk.type === TokenType.LEFT_CURLY_BRACKET) {
      this.root.type = "Object"
      this.root.body = this.parseJsonObject()
    }
    this.root.type = "Array"
    this.root.body = this.parseJsonArray()
  }

  /**
   * 判断下一个token是否为给定的类型
   * 如果是，那么继续往下扫描，否则退出
   * @example
   *  比如扫描 [1, 2, "hello", null, true]
   * 只要元素是合法的element，那么就继续吃掉，否则就退出while，开始处理]符号
   * @param type TokenType
   */
  eat(type: TokenType) {
    if (this.state.token.type === type) {
      this.nextToken()
      return true
    }
    return false
  }

  // start an new node
  startNode() {
    return new Node()
  }

  parseJsonArray(): Array<Property | valueType> {
    return []
  }

  parseJsonObject(): Array<Property | valueType> {
    let obj = new JsonObject()
    return []
  }

  /**
   * Expect current tokentype is t, otherwise an exception will be raised
   * @param t TokenType which you expected
   */
  expect(t: TokenType) {
    if (this.state.token.type === t) 
      return true
    this.raise()
  }
}