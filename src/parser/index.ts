import Tokenizer from "@/tokenizer";
import { Node, Program, Token } from "../tokenizer/types";

/**
 * recursive descent parser
 */
export class Parser extends Tokenizer{
  token: Token | null
  constructor() {
    super()
    this.token = null
  }

  

  /**
   * 从当前pos创建新的node
   */
  startNode() {
    // return new Node(this,this.state.curPos, this.state.)
  }

  parse(input: string): Program | null {
    this.input = input
    return null
  }
}