import { platform } from "os";

console.log('hello')

function testMethod({name = {},array}) {
  let a = {}
  let [b,c] = array
  return Object.keys(a)
}