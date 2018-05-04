export const isIterable = (item) => {
    if ( item == null ) {
        return false;
    }
    return typeof item[Symbol.iterator] === 'function';
};


function spread(elements){
    if (elements == null) {
        return {};
    }
    if ( isIterable(elements) ){
        let objElements = {};
        let i = 0;
        for ( let k in elements ){
            objElements[i] = elements[k];
            i++;
        }
        return objElements;
    }
    return { 0: elements };

}

export const qsa = (query) => {
    return document.querySelectorAll(query);
};
export const qs = (query) => {
    return document.querySelector(query);
};

export const tqsa = (tag, query) => {
    return tag.querySelectorAll(query);
};
export const tqs = (tag, query) => {
    return tag.querySelector(query);
};

export const gid = (id) => {
    return document.getElementById(id);
};

export const getClosest = ( elem, selector ) => {
    for ( ; elem && elem !== document; elem = elem.parentNode ) {
        if ( elem.matches( selector ) ) return elem;
    }
    return null;
};

export const getPrev = ( tag, cls ) => {
    let prev = tag.previousElementSibling
    while ( prev && !prev.classList.contains( cls ) ) {
        prev = prev.previousElementSibling
    }
    return prev
};


//
// export const q = function(sel) {
//
//     const obj = {
//         n: [],
//         selector: null,
//
//         pObj: function(){
//             const publicObj = {
//                 find: obj.find,
//                 has: obj.has
//             };
//             let i = 0;
//             for ( let k in obj.n ) {
//                 publicObj[i] = obj.n[k];
//                 i++;
//             }
//
//             return publicObj;
//         },
//
//         updateSelector: function(s){
//             return this.selector.split(',').map((c) => {
//                 return `${c.trim()} ${s.trim()}`
//             }).join(', ');
//         },
//
//         search: function(s){
//             let newEls = [];
//
//             for ( let el of this.n ) {
//                 newEls = [ ...newEls, ...el.querySelectorAll( s ) ];
//             }
//             return newEls;
//         },
//
//         find: function( s ){
//             this.selector = this.updateSelector(s);
//
//             this.n = this.search(s);
//             return this.pObj();
//         },
//
//         has: function(){
//
//         },
//
//         init: function(s){
//             this.selector = s;
//             this.n = [ ...document.querySelectorAll( s ) ];
//
//             return this.pObj();
//         }
//
//     };
//     return obj.init(sel);
// };


export const q = function(sel) {

    const allowedKeys = ['selector'];

    function QObj() {
        this.n = [];
        this.selector = 'test';
    }

    QObj.prototype.spread = function(){
        let i = 0;
        for ( let k in this.n ){
            this[i] = this.n[k];
            i++;
        }
    };

    QObj.prototype.updateSelector = function(s){
        return this.selector.split(',').map((c) => {
            return `${c.trim()} ${s.trim()}`
        }).join(', ');
    };

    QObj.prototype.search = function(s){
        let newEls = [];

        for ( let el of this.n ) {
            newEls = [ ...newEls, ...el.querySelectorAll( s ) ];
        }
        return newEls;
    };

    QObj.prototype.find = function(s){
        this.selector = this.updateSelector(s);
        this.n = this.search(s);
        return this;
    };

    QObj.prototype.init = function(s){
        this.selector = s;
        this.n = [ ...document.querySelectorAll( s ) ];
        this.spread();
        Object.keys(this).forEach((k) => {
            console.log(`${k}: ${ !isNaN(k) || allowedKeys.indexOf(k) !== -1 }`);
        });
        return this;
    };


    const publicqobj = new QObj();
    return publicqobj.init(sel);
};
