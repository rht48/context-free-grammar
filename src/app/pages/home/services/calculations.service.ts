import { Injectable } from '@angular/core';
import { Grammar } from 'src/app/models/grammar';

@Injectable({
  providedIn: 'root'
})
export class CalculationsService {

  grammar: Grammar = new Grammar();

  constructor() { }

  setGrammar(grammar: Grammar): void {
    this.grammar = grammar;
  }

  getGrammar(): Grammar {
    return this.grammar;
  }

}
