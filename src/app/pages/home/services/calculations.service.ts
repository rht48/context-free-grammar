import { Injectable } from '@angular/core';
import { Grammar } from 'src/app/models/grammar';

@Injectable({
  providedIn: 'root'
})
export class CalculationsService {

  grammar: Grammar = new Grammar();

  null_table = {};

  constructor() { }

  setGrammar(grammar: Grammar): void {
    this.grammar = grammar;
  }

  getGrammar(): Grammar {
    return this.grammar;
  }

  getNullTable() {
    return this.null_table;
  }

  hasChanged(table, line_number): boolean {
    for(const key of Object.keys(table)) {
      if(table[key][line_number] !== table[key][line_number - 1]) {
        return true;
      }
    }
    return false;
  }

  calculateNull(): void {
    let table = {};
    let current_line = 0;
    for(const nonterminal of this.grammar.getNonTerminals()) {
      table[nonterminal] = [0];
    }
    const indexed_rules = this.grammar.getIndexedRules();

    do {
      current_line++;

      for(const nonterminal of this.grammar.getNonTerminals()) {
        let res = 0;
        for(const rule of indexed_rules[nonterminal]) {
          let counter = 0;
          const terms = rule.getProduction().getTerms();
          for(const term of terms) {
            
            if(term === Grammar.EPSILON && terms.length === 1) {
              res = 1;
              break;
            }

            if(this.grammar.isNonTerminal(term) && table[term][current_line - 1] === 1) {
              counter++;
              if(counter === terms.length) {
                res = 1;
                break;
              }
            }
          }
          if(res !== 0) {
            break;
          }
        }
        table[nonterminal].push(res);
      }
    } while(this.hasChanged(table, current_line))
    
    this.null_table = table;
  }

}
