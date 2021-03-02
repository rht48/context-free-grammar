import { Injectable } from '@angular/core';
import { Grammar } from 'src/app/models/grammar';

/*
S -> A B C
A -> a | D
B -> b | epsilon
C -> c | epsilon
D -> epsilon
*/

/*
S -> E eof
E -> T E'
E' -> + T E' | - T E' | epsilon
T -> F T'
T' -> x F T' | / F T' | epsilon
F -> ( E ) | id
*/

@Injectable({
  providedIn: 'root'
})
export class CalculationsService {

  grammar: Grammar = new Grammar();

  null_table = {};
  first_table = {};
  follow_table = {}

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

  getFirstTable() {
    return this.first_table;
  }

  getFollowTable() {
    return this.follow_table;
  }

  nullableElement(element: string): boolean {
    if(!this.grammar.isNonTerminal(element) && element !== Grammar.EPSILON) {
      return false;
    }
    if(element === Grammar.EPSILON) {
      return true;
    }
    const size = this.null_table[element].length;
    return this.null_table[element][size - 1] === 1;
  }

  nullableElements(elements: string[]): boolean {
    if(elements.length === 0) {
      return true;
    }
    if(this.nullableElement(elements[0])) {
      return this.nullableElements(elements.slice(1));
    }
    return false;
  }

  firstElement(element: string): string[] {
    if(!this.grammar.isNonTerminal(element) && element !== Grammar.EPSILON) {
      return [element];
    }
    if(element === Grammar.EPSILON) {
      return [];
    }
    const size = this.null_table[element].length;
    return this.first_table[element][size - 1];
  }

  firstElements(elements: string[]): string[] {
    if(elements.length === 0) {
      return [];
    }
    const first = this.firstElement(elements[0]);
    const rest = this.firstElements(elements.slice(1));
    let res = rest;
    for(let elem of first) {
      this.addIfNotPresent(res, elem);
    }
    return res;
  }

  addIfNotPresent(array, element): void {
    if(array.indexOf(element) === -1) {
      array.push(element);
    }
  }

  hasChanged(table, line_number): boolean {
    for(const key of Object.keys(table)) {
      if(JSON.stringify(table[key][line_number]) !== JSON.stringify(table[key][line_number - 1])) {
        return true;
      }
    }
    return false;
  }

  duplicateLastRow(table) {
    for(const key of Object.keys(table)) {
      const index = table[key].length;
      const element = table[key][index - 1];
      table[key].push(JSON.parse(JSON.stringify(element)));
    }
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
    } while(this.hasChanged(table, current_line));
    
    this.null_table = table;
  }

  calculateFirst(): void {
    let table = {};
    let current_line = 0;
    for(const nonterminal of this.grammar.getNonTerminals()) {
      table[nonterminal] = [[]];
    }
    const indexed_rules = this.grammar.getIndexedRules();

    do {
      this.duplicateLastRow(table);
      current_line++;

      for(const nonterminal of this.grammar.getNonTerminals()) {
        for(const rule of indexed_rules[nonterminal]) {
          let index = 0;
          let first;
          do {
            first = rule.getProduction().getTerms()[index];
            if(first !== Grammar.EPSILON) {
              if(!this.grammar.isNonTerminal(first)) {
                this.addIfNotPresent(table[nonterminal][current_line], first);
              }else {
                for(const element of table[first][current_line - 1]) {
                  this.addIfNotPresent(table[nonterminal][current_line], element);
                }
              }
            }
          } while(this.grammar.isNonTerminal(first) && this.nullableElement(first) && ++index < rule.getProduction().getTerms().length);
        }
      }
    } while(this.hasChanged(table, current_line));
    
    this.first_table = table;
  }

  calculateFollow(): void {
    let table = {};
    let current_line = 0;
    for(const nonterminal of this.grammar.getNonTerminals()) {
      table[nonterminal] = [[]];
    }

    do {
      this.duplicateLastRow(table);
      current_line++;
      if(current_line === 1) {
        table[this.grammar.getEntryPoint()][current_line].push('eof');
      }

      for(const nonterminal of this.grammar.getNonTerminals()) {
        for(const rule of this.grammar.getRules()) {
          
          const terms = rule.getProduction().getTerms();
          const index = terms.indexOf(nonterminal);
          if(index !== -1) {
            const next = index + 1;
            const beta = terms.slice(next);
            const beta_nullable = this.nullableElements(beta);

            if(next < terms.length) {
              const firsts = this.firstElements(beta);
              for(const first of firsts) {
                this.addIfNotPresent(table[nonterminal][current_line], first);
              }
            }
            if(next >= terms.length || beta_nullable) {
              for(const term of table[rule.getNonTerminal()][current_line - 1]) {
                this.addIfNotPresent(table[nonterminal][current_line], term);
              }
            }

          }
        }
      }

    } while(this.hasChanged(table, current_line));

    this.follow_table = table;
  }

}
/*
S -> E eof
E -> T E'
E' -> + T E' | - T E' | epsilon
T -> F T'
T' -> x F T' | / F T' | epsilon
F -> ( E ) | id
*/