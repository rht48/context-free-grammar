import { Injectable } from '@angular/core';
import { Grammar, Production, Rule } from 'src/app/models/grammar';

@Injectable({
  providedIn: 'root'
})
export class GrammarService {

  grammar: Grammar = new Grammar();

  constructor() { }

  parse(input: string): void {
    this.grammar = new Grammar();
    const lines = input.split('\n');
    const first = lines[0].split(' -> ');
    if(first.length > 1) {
      this.grammar.setEntryPoint(first[0]);
    }
    let right = [];
    for(const line of lines) {
      const separated = line.split(' -> ');
      if(separated.length > 1) {
        const nonterminal = separated[0];
        const rules = separated[1];
        this.grammar.addNonTerminal(nonterminal);
        right.push(rules);
        for(const r of rules.split(' | ')) {
          let rule = new Rule();
          let production = new Production();
          rule.setNonTerminal(nonterminal);
          for(const element of r.split(' ')) {
            production.addTerm(element);
          }
          rule.addProduction(production);
          this.grammar.addRule(rule);
        }
      }
    }

    for(const r of right) {
      const rules = r.split(' | ');
      for(const rule of rules) {
        const elements = rule.split(' ');
        for(const element of elements) {
          if(element !== '' && !this.grammar.isNonTerminal(element)) {
            if(element !== Grammar.EPSILON) {
              this.grammar.addToAlphabet(element);
            }
          }
        }
      }
    }
  }

  getGrammar(): Grammar {
    return this.grammar;
  }

  setGrammar(grammar: Grammar): void {
    this.grammar = grammar;
  }
  
}
