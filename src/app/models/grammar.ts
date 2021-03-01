
export class Grammar {

    private entrypoint: string;
    private alphabet: string[];
    private nonterminals: string[];
    private rules: Rule[];

    public static EPSILON = 'epsilon';

    constructor() {
        this.entrypoint = "";
        this.alphabet = [];
        this.nonterminals = [];
        this.rules = [];
     }

    setEntryPoint(entrypoint: string): void {
        this.entrypoint = entrypoint;
    }

    getEntryPoint(): string {
        return this.entrypoint;
    }

    setAlphabet(alphabet: string[]): void {
        this.alphabet = alphabet;
    }

    addToAlphabet(letter: string): void {
        if(!this.isAlphabet(letter)) {
            this.alphabet.push(letter);
        }
    }

    isAlphabet(input: string): boolean {
        return this.alphabet.indexOf(input) !== -1;
    }

    getAlphabet(): string[] {
        return this.alphabet;
    }

    setNonTerminals(nonterminals: string[]): void {
        this.nonterminals = nonterminals;
    }

    addNonTerminal(nonterminal: string): void {
        if(!this.isNonTerminal(nonterminal)) {
            this.nonterminals.push(nonterminal);
        }
    }

    getNonTerminals(): string[] {
        return this.nonterminals;
    }

    isNonTerminal(input: string): boolean {
        return this.nonterminals.indexOf(input) !== -1;
    }

    setRules(rules: Rule[]): void {
        this.rules = rules;
    }

    addRule(rule: Rule): void {
        this.rules.push(rule);
    }

    getRules(): Rule[] {
        return this.rules;
    }

}

export class Rule {

    private nonterminal: string;
    private productions: Production[];

    constructor() {
        this.nonterminal = "";
        this.productions = [];
     }

    setNonTerminal(nt: string): void {
        this.nonterminal = nt;
    }

    getNonTerminal(): string {
        return this.nonterminal;
    }

    setProductions(productions: Production[]): void {
        this.productions = productions;
    }

    addProduction(production: Production): void {
        this.productions.push(production);
    }

    getProductions(): Production[] {
        return this.productions;
    }

}

export class Production {
    private terms: string[];

    constructor() {
        this.terms = [];
     }

    setTerms(terms: string[]): void {
        this.terms = terms;
    }

    addTerm(term: string): void {
        this.terms.push(term);
    }

    getTerms(): string[] {
        return this.terms;
    }
}