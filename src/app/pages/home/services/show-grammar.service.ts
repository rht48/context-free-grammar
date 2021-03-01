import { Injectable } from '@angular/core';
import { Grammar } from 'src/app/models/grammar';

@Injectable({
  providedIn: 'root'
})
export class ShowGrammarService {

  constructor() { }

  getEntryPoint(grammar: Grammar): string {
    if(grammar.getEntryPoint() !== '') {
      return grammar.getEntryPoint();
    }else {
      return 'None';
    }
  }

  getNonTerminals(grammar: Grammar): string {
    if(grammar.getNonTerminals().length > 0) {
      return '{' + grammar.getNonTerminals().join(', ') + '}';
    }else{
      return '&empty;';
    }
  }

  getAlphabet(grammar: Grammar): string {
    if(grammar.getAlphabet().length > 0) {
      return '{' + grammar.getAlphabet().join(', ')  + '}';
    }else {
      return '&empty;';
    }
  }

  getRules(grammar: Grammar): string {
    if(grammar.getRules().length > 0) {
      let str = "";
      
      let rules = {};
      for(const rule of grammar.getRules()) {
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
        str += '<br/>';
      }
      return str;
    }else {
      return '&empty;';
    }
  }
}
