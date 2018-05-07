
export default class KeyBinds {
    constructor(tests){
        this.clear = null;
        this.event = null;
        this.mapped = {};

        this.tests = [];

        this.prepTests(tests);

    }

    prepTests(tests){
        for ( let test of tests ) {
            test['t'] = Array.isArray(test['t']) ? test['t'] : [test['t']];
            test['t'] = test['t'].map((t) => {
                return t.split('+').map((key) => {
                    return this.mapToReadable(key.trim());
                });
            });
            this.tests.push(test);
        }
    }

    mapToReadable(key) {
        const alias = {
            //Modifiers
            "shift": 16, "ctrl": 17, "alt": 18, 'esc': 27, 'command': 91, 'rcommand': 93,
            //Digits
            "1" : 49, "2": 50, "3": 51, "4": 52, "5": 53, "6": 54, "7": 55, "8": 56, "9": 57, "0": 48,
            //Letters
            "a"    : 65, "b": 66, "c": 67, "d": 68, "e": 69,
            "f"    : 70, "g": 71, "h": 72, "i": 73, "j": 74,
            "k"    : 75, "l": 76, "m": 77, "n": 78, "o": 79,
            "p"    : 80, "q": 81, "r": 82, "s": 83, "t": 84,
            "u"    : 85, "v": 86, "w": 87, "x": 88, "y": 89, "z": 90,
            "left" : 37, "up" : 38, "right" : 39, "down" : 40
        };
        return alias[key];
    }

    check(){

        for (let items of this.tests) {

            for ( let keys of items.t ){
                const bool = keys.every(k => !!this.mapped[k]);
                if ( bool ){
                    this.event.preventDefault();
                    return items.f();
                }
            }
        }
        return false;
    }

    testKeys(e) {
        clearTimeout(this.clear);
        this.event = e;

        const type = {
            'keydown': true,
            'keyup': false
        };

        this.clear = setTimeout(()=>{
            this.mapped = {};
        }, 1000);

        if ( e.type === 'keydown' && this.mapped[e.keyCode] ){
            return;
        }

        this.mapped[e.keyCode] = type[e.type] || false;
        if ( e.ctrlKey )  this.mapped[this.mapToReadable('ctrl')] = true;
        if ( e.shiftKey ) this.mapped[this.mapToReadable('shift')] = true;
        if ( e.altKey )   this.mapped[this.mapToReadable('alt')] = true;

        if ( e.type === 'keydown' ){
            console.log('wow');
            this.check();
        }
    }

}