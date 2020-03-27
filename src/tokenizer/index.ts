import BaseParser from "@/parser/base";
import * as charCodes from "@/shared/charcodes";
export default class Tokenizer extends BaseParser {
  constructor() {
    super()
  }

  getTokenFromCode(code: number) {
    switch (code) {
      case charCodes.dot:
        this.readToken_dot()
        return
      case charCodes.backslash:

    }
  }

  readToken_dot() {

  }

  next() {
    this.skipWhiteSpace()
    this.nextToken()
  }

  /**
 * 扫描下一个token
 */
  nextToken() {
    this.state.start = this.state.curPos
    this.getTokenFromCode(this.input.charCodeAt(this.state.curPos))
  }

  /**
   * 扫描完token之后调用，更新 state
   */
  finishToken() {

  }
  /**
   * skip all whitespace from current position
   */
  skipWhiteSpace() {
    while (this.input.charCodeAt(this.state.curPos++) == charCodes.space) { }
  }
}