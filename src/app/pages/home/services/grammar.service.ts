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

  getEntryPoint(): string {
    if(this.grammar.getEntryPoint() !== '') {
      return this.grammar.getEntryPoint();
    }else {
      return 'None';
    }
  }

  getNonTerminals(): string {
    if(this.grammar.getNonTerminals().length > 0) {
      return '{' + this.grammar.getNonTerminals().join(', ') + '}';
    }else{
      return '&empty;';
    }
  }

  getAlphabet(): string {
    if(this.grammar.getAlphabet().length > 0) {
      return '{' + this.grammar.getAlphabet().join(', ')  + '}';
    }else {
      return '&empty;';
    }
  }

  getRules(): string {
    if(this.grammar.getRules().length > 0) {
      let str = "";
      
      let rules = {};
      for(const rule of this.grammar.getRules()) {
        const nonterminal = rule.getNonTerminal();
        if(Object.keys(rules).indexOf(nonterminal) === -1) {
          rules[nonterminal] = [];
        }
        rules[nonterminal] = rules[nonterminal].concat(rule.getProductions());
      }


      for(const nonterminal of Object.keys(rules)) {
        str += nonterminal + " &xrarr; ";
        for(let i = 0; i < rules[nonterminal].length; i++) {
          const rule = rules[nonterminal][i];
          const terms = rule.getTerms();
          if(terms.length === 1 && terms[0] === Grammar.EPSILON) {
            str += '&epsilon;'
          }else {
            str += rule.getTerms().join(' ');
          }
          if(i < rules[nonterminal].length - 1) {
            str += ' | ';
          }
        }
        // for(let i = 0; i < rules[nonterminal].getProductions().length; i++) {
        //   const terms = rule.getProductions()[i].getTerms();
        //   if(terms.length === 1 && terms[0] === Grammar.EPSILON) {
        //     str += '&epsilon;'
        //   }else {
        //     str += rule.getProductions()[i].getTerms().join(' ');
        //   }
        //   if(i < rule.getProductions().length - 1) {
        //     str += ' | ';
        //   }
        // }
        str += '<br/>';
      }


      return str;
    }else {
      return '&empty;';
    }
  }
}
