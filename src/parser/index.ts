import { Program, Token } from "./types";
import { State } from "./state";

/**
 * recursive descent parser
 */
export class Parser {
  state: State = new State()
  token: Token | null

  constructor() {
    this.token = null
  }

  /**
   * 扫描下一个token
   */
  nextToken() {

  }

  /**
   * 扫描完token之后调用，更新 state
   */
  finishToken() {

  }

  parse(input: string): Program | null {
    return null
  }

  getTokenFromCode() {

  }
}