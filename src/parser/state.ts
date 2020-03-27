import { TokenType, SourceLocation } from "../tokenizer/types"

/**
 * State records state of parser
 */
export class State {
  type!: TokenType
  value: any = null


  location!: SourceLocation

  /**
   * current position offset
   */
  curPos: number = 0

  // 解析token时的起始位置
  start: number = 0

  // 解析token结束后的位置
  end: number = 0


  constructor() {
    
  }
}