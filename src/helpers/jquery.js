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

$.fn.intoColumns = function(selector){
    const columns = [];
    this.each((_, row) => {
        $(row).find(selector).each((i, cell) => {
            if ( typeof columns[i] === 'undefined' ){
                columns.push([cell]);
            } else {
                columns[i].push(cell);
            }
        });
    });
    return columns
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