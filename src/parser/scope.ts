export class Scope {
  functions: string[] = []
  lexical: string[] = []
  var: string[] = []
  flags: number
  constructor(flags: number) {
    this.flags = flags
  }
}

export class ScopeHandler {
  scopeStack: Array<Scope>
  constructor() {
    this.scopeStack = []
  }

  /**
   * enter a new scrope
   * @param scopeFlags scope type
   */
  enter(scopeFlags: number) {
    this.scopeStack.push(this.createScope(scopeFlags))
  }

  /**
   * exit current scope
   */
  exit() {
    this.scopeStack.pop()
  }

  createScope(flags: number) {
    return new Scope(flags)
  }
}

export enum flags {
  SCOPE_PROGRAM,
  SCOPE_FUNCTION,
  SCOPE_BLOCK
}