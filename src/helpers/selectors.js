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
}



export const q = function(sel) {
    let selector = sel;
    let el       = [ ...document.querySelectorAll( selector ) ];

    const obj = {
        find: function ( s ) {
            el.splice( 0, el.length );

            for ( let el in this.el ) {

                let found = el.querySelectorAll( s );

                for ( let f in found ) {
                    if ( this.el.indexOf( f ) === -1 ) this.el.push( f )
                }

            }
            return obj;
        },

        init: function ( s ) {
            Array.prototype.push.apply( el, document.querySelectorAll( s ) );
        },

    };

    function spread(elements){
        if (elements == null) {
            return { 0: elements };
        }
        if ( typeof elements[Symbol.iterator] === 'function' ){
            let objElements = {};
            let i = 0;
            for ( let k in elements ){
                objElements[i] = elements[k]
                i++;
            }
            return objElements;
        }

    }
    let spreadels = spread(el);
    console.log(spreadels);
    return {
        ...spreadels,
        selector,

    };
};