export interface Strategy {
    toString(element): string;
}

export class DefaultStrategy implements Strategy {
    toString(element): string {
        return "" + element;
    }
}

export class ArrayStrategy implements Strategy {
    toString(array): string {
        if(array.length === 0) {
            return '&empty;';
        }else {
            return '{' + array.join(', ') + '}';
        }
    }
}

export class Strategies {
    public static DEFAULT = new DefaultStrategy();
    public static ARRAY = new ArrayStrategy();
}