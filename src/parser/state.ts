import { TokenType } from "./types"

/**
 * State records state of parser
 */
export class State {
  type: TokenType
  value: any = null


  colNum: number = 0
  rowNum:number = 0

  /**
   * current position offset
   */
  curPos: number = 0

  start: number = 0
  end: number = 0


  constructor() {
    
  }
}