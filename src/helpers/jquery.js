import $ from 'jquery'


$.fn.shuffle = function(){
    for(var j, x, i = this.length; i; j = Math.floor(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
    return this;
};

$.fn.maxLength = function( selector ){
    let max = 0;
    this.each((_, el) => {
        let len = $(el).find(selector).length;
        if (len > max)
            max = len;
    })
    return max;
};

$.fn.intoColumns = function( selector ){
    const max = this.maxLength(selector);

    const columns = [];
    let col = [];
    for (let i=0; i<max; i++){
        col = []
        this.each((_, el) => {
            col.push($(el).find( selector ).get(i))
        })
        columns.push(col)
    }
    return columns;
};

$.fn.indexes = function(els){
    const indexes = [];
    let index;
    els.each((_, el) => {
        index = this.index(el);

        if (index > -1){
            indexes.push(index);
        }
    })
    return indexes;
};

$.fn.eqs = function(indexes){
    return this.filter(function(index){
        return indexes.indexOf(index) !== -1;
    });
};

export default $;