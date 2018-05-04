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
    let prev = tag.previousElementSibling;
    while ( prev && !prev.classList.contains( cls ) ) {
        prev = prev.previousElementSibling
    }
    return prev
};
