import fs from 'fs'
import { resolve } from "path";
import { Program } from './src/tokenizer/types';
import { Parser } from './src/parser';

const dir = (...args: Array<string>) => resolve(...args)

let dataFolder = resolve('test/data')

let asts: Array<Program | null> = fs.readdirSync(dataFolder).map(d => dir(dataFolder, d)).map(f => new Parser().parse(fs.readFileSync(f).toString()))