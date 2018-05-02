import { qs, qsa, tqs, tqsa, gid, getPrev } from "../helpers"


class Answers {
    constructor() {
        this.timeout = 5000
    }

    GM_getValue( key, def ) {
        return localStorage.getItem( key ) || def
    }

    GM_setValue( key, value ) {
        return localStorage.setItem( key, value )
    }

    GM_deleteValue( key, callback ) {
        return localStorage.removeItem( key )
    }

    clearValues() {
        this.GM_deleteValue( "question" )
        this.GM_deleteValue( "qlabel" )
        this.GM_deleteValue( "dupecount" )
        this.GM_deleteValue( "time" )
    }

    AutoMate() {
        this.clearValues()
        let value = prompt( 'Which question do I stop at?', 'Q' )
        if ( value ) {
            const d = new Date()
            const n = d.getTime()
            this.GM_setValue( "time", n )
            this.GM_setValue( "question", value )
            this.gotoPage()
        }
    }

    gotoPage() {

        const time = this.GM_getValue( "time", 0 )

        const d = new Date()
        const n = d.getTime()

        this.GM_setValue( "time", n )

        //quit if timed out
        if ( !time || ( ( n - time ) > this.timeout ) ) {
            return this.clearValues()
        }

        // Quit if no question set
        if ( !this.GM_getValue( "question" ) ) {
            return this.clearValues()
        }

        let value = this.GM_getValue( "question" )

        //Check the new page against the old page to make sure we are progressing
        const oldlabel = this.GM_getValue( "qlabel", '' )
        let newlabel   = qs( "dt a" ).innerText

        if ( !newlabel ) {
            newlabel = qs( "dt" ).innerText
        }
        this.GM_setValue( "qlabel", newlabel )

        let dupecount = this.GM_getValue( "dupecount", 0 )

        //If fails to complete page 4 times then quit
        if ( oldlabel === newlabel && newlabel.indexOf( "Quota sheet:" ) === -1 ) {
            if ( dupecount < 3 ) {
                dupecount = dupecount + 1
                this.GM_setValue( "dupecount", dupecount )
            }
            else {
                console.log( "Failed to complete page" )
                console.log( dupecount )
                this.clearValues()
                return
            }
        }
        else {
            this.GM_setValue( "dupecount", 0 )
        }

        //if at page then stop
        if ( qs( "dt a" ).innerText === `[${value}]` ) {
            return this.clearValues()
        }

        this.fillNext()

    }


    //returns qacode value after the : so MRK:16 returns 16
    getQACode( tag, letters ) {
        const els = [...tqsa( tag, "dd sup span" )]
        for ( let el of els ){
            const spantext = el.innerText

            if ( spantext.includes( `${letters}:` ) ) {
                return spantext.replace( `${letters}:`, '' )
            }
        }
    }

    // Todo: is this used
    range( start, end ){
        let array = [];
        for( let i = start; i < end; i++ ){
            array.push(i);
        }
        return array;
    }

    fillPage(){
        // Only fill dev questions if there is a term
        // Todo
        // const devContainer =  qsa('.devContainer')
        // if ( tqsa(devContainer, 'div.surveyQuestion, div.question').length ){
        //
        //     if ( $('input:radio:checked').closest('.even, .odd').has("span:contains('TERM')").length ){
        //         this.fillRadio();
        //     }
        //     return;
        // }

        const atmost = this.getQACode( 'ATM' )
        const atleast = this.getQACode( 'ATL' )
        const maxranks = this.getQACode( 'MRA' )
        let   range = this.getQACode( 'VRF' )
        const amount = this.getQACode( 'AMT' )
        const unique =  this.getQACode( 'UNI' )
        const exactly =  this.getQACode( 'EX' )
        const zipcode = ( range === 'zipcode' )

        if ( !zipcode ){
            // Get number range
            if ( range.length ){
                range = range.replace(/range\((\d+),(\d+)\)/g, '$1,$2').split(',')
            }
            else{
                // Default number range is 0-10
                range = [ 0, 10 ]
            }
        }

        this.fillText()
        this.fillNumber(amount,range)
        this.fillFloat()
        this.fillCheckBox(atmost,atleast,exactly)
        this.fillSelect(maxranks,unique)
        this.fillRadio()
        this.fillTextArea()
        this.fillOpenSpecify()

    }




}

const ans = new Answers()

// const arr = [...qsa('.question')];
// arr.forEach((el)=> {
//     let prev = getPrev( el, 'qaTab' )
//     // console.log( ans.getQACode( prev, 'ATL' ) )
//     // console.log( ans.getQACode( prev, 'ATM' ) )
//     // console.log( ans.getQACode( prev, 'VRF' ) )
// });

export default ans


/*
















            fillText: function(){

                var text = $('.text').find(".element input:text");
                if (text.length){
                    text.each(function() {
                        text = $(this).closest('tr').find('td').text();
                        if (text.toLowerCase().indexOf("email") != -1 || text.toLowerCase().indexOf("e-mail") != -1){
                            $(this).val('garbage@thedump.com').trigger('change');
                        }
                        else if (text.toLowerCase().indexOf("phone") != -1){
                            $(this).val('5555555555').trigger('change');
                        }
                        else{
                            $(this).val(93612).trigger('change');
                        }
                    });
                    return true;
                }
            },

            //Currently only works for selects
            fillOpenSpecify: function(){

                var text = $("input:text");
                if (text.length){
                    text.each(function() {
                        var select = $(this).closest('tr').find('td select');
                        if (select.length && select.val() != -1){
                            $(this).val(93612).trigger('change');
                        }
                    });
                    return true;
                }
            },


            fillNumber: function(amount,range){
                var that = this;
                if ( amount ){

                    var amountleft = amount;
                    var numbers = $('.number tr:has(input:text), .number tr:has(input[type="tel"])');
                    if (!numbers.length){
                        return false;
                    }
                    var count = numbers.length;
                    var newamount = Math.floor(amount/count);
                    var lastamount = newamount + (amount - (newamount*count));
                    var num_el;

                    if ( $(".groupingRows").length ){

                        numbers.each(function(){

                            num_el = $(this).find('.element input:text, .element input[type="tel"]');

                            count = num_el.length;
                            newamount = Math.floor(amount/count);
                            lastamount = newamount + (amount - (newamount*count));

                            for (var i=0;i<count;i++){

                                if (i==count-1){
                                    num_el.eq(i).val(lastamount).trigger('change');
                                } else{
                                    num_el.eq(i).val(newamount).trigger('change');
                                }

                            }
                        });
                    }
                    else{

                        newamount = Math.floor(amount/count);
                        lastamount = newamount + (amount - (newamount*count));

                        for (var i=0;i<count;i++){

                                numbers.eq(i).find('.row-legend input:text, .row-legend input[type="tel"]').val(lastamount).trigger('change');

                            if (i==count-1){
                                numbers.eq(i).find('.element input:text, .element input[type="tel"]').val(lastamount).trigger('change');
                            }
                            else{
                                numbers.eq(i).find('.element input:text, .element input[type="tel"]').val(newamount).trigger('change');
                            }

                        }
                    }

                }
                else{

                    var numbers = $(".number").find('input:text, input[type="tel"]');
                    if (numbers.length){

                        qtext = $('.survey-q-question-text, .question-text').text();
                        if ( ( numbers.length === 1 && qtext.toLowerCase().indexOf("age") >= 0 ) || ( qtext.toLowerCase().indexOf("old are you") !== -1 ) ){
                            numbers.val('33').trigger('change');
                        } else {
                            numbers.each(function() {
                                $(this).val( that.getRandomInt(range[0],range[1]) ).trigger('change');
                            });
                        }
                        return true;
                    }
                }

            },

            fillFloat: function(){
                var float = $(".float input:text");

                if (!float.length){
                    return false;
                }
                float.val(10).trigger('change');
            },

            getRandomInt: function(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            },




            fillOE: function(tr){
                var text = tr.find("input:text");
                if (text.length){
                    text.each(function() {
                        $(this).val(93612).trigger('change');
                    });
                    return true;
                }
            },



            fillTextArea: function(){
                if ($('textarea').length){
                    $('textarea').val('Autofill');
                    return true;
                }
            },

            fillRadio: function(){
                var _this = this;
                var tableheaders = $('.col-legend, .survey-q-grid-collegend');

                var ans = $('.answers');

                ans.each(function(){
                    var tr = $(this).find(".even:has('input:radio'), .odd:has('input:radio')");
                    tr.find("input:radio").prop('checked', false).change();

                    if (tableheaders.length){

                        var badheaders = tableheaders.has("span:contains('TERM')");
                        badheaders = badheaders.map(function(){
                            return tableheaders.index($(this));
                        });


                        tr.each(function(){

                            _this.fillOE($(this));
                            var radio = $(this).find("input:radio");
                            if (badheaders.length && (badheaders.length != radio.length)){
                                radio = $($.grep(radio, function(n, i) {
                                    return $.inArray(i, badheaders) == -1;
                                }));
                            }

                            radio = radio.eq(Math.floor(Math.random()*radio.length));
                            radio.siblings('.fir-icon').length ? radio.siblings('.fir-icon').click() : radio.click();

                        });
                    } else{

                        var allterms = tr.has("span:contains('TERM')").not(tr.has("input:text"));
                        var notterms = allterms.has("span[title*='not']");
                        var noterms = tr.not(tr.has("span:contains('TERM')")).not(tr.has("input:text"));
                        var rows = noterms;
                        if ( notterms.length ){
                            rows = notterms;
                        }
                        if ( rows.length ) {
                            var radio = rows.eq(Math.floor(Math.random()*rows.length)).find('input:radio');
                            radio.siblings('.fir-icon').length ? radio.siblings('.fir-icon').click() : radio.click();
                        }
                    }
                });
            },

            shuffleArray: function(arr){
                return arr.sort(function() { return 0.5 - Math.random() });
            },

            fillCheckBox: function(atmost,atleast,exactly){
                var _this = this;

                if (exactly){
                    atleast = atmost = exactly;
                }
                if (!atleast){
                    atleast=1;
                }
                if (!atmost){
                    atmost=atleast;
                }
                var ans = $('.answers');
                ans.each(function(){
                    var tr = $(this).find(".even, .odd");
                    tr.find("input:checkbox:checked").click();

                    var allCheckbox = tr.has("input:checkbox");

                    var allterms = allCheckbox.has("span:contains('TERM')");
                    var notTerms = allterms.has("span[title*='not']");
                    var notTermsnotNoAnswers = notTerms.not(notTerms.find(".naRow, .no-answer"));
                    var trs = allCheckbox.not(allCheckbox.has("span:contains('TERM')"));
                    var notNoAnswers = trs.not(allCheckbox.has(".naRow, .no-answer"));


                    if (notTermsnotNoAnswers.length){
                        trs = notTermsnotNoAnswers;
                    }else if (notTerms.length){
                        trs = notTerms;
                    }else{
                        trs = notNoAnswers;
                    }


                    notexclusive = trs.has('input:checkbox:not(.exclusive)');

                    if (notexclusive.length){
                        trs = notexclusive;
                    }


                    var tableheaders = $('.survey-q-grid-collegend, .col-legend');
                    if (tableheaders.length){

                        if ( $("h3.survey-q-error-text:contains('in this column')").length || ( ( $('.col-legend.hasError').length != $('.col-legend').length ) && $('.col-legend.hasError').length ) ){
                            for (var i=0;i<atmost;i++){
                                trs.eq(i).each(function(){
                                    _this.fillOE($(this));
                                    $(this).find("input:checkbox").click();
                                });
                            }
                        }else{
                            trs.each(function(){
                                _this.fillOE($(this));
                                for (var i=0; i<atmost; i++){
                                    $(this).find("input:checkbox").eq(i).click();
                                }
                            });
                        }

                    }
                    else{
                        trs = _this.shuffleArray(trs);
                        for (var i=0; i<atmost; i++){
                            trs.eq(i).each(function(){

                                _this.fillOE($(this));
                                $(this).find("input:checkbox").click();
                            });
                        }
                    }
                });
            },

            fillSelect: function(maxranks,unique){
                if (maxranks){

                    for (var i=0;i<=maxranks;i++){
                        $('select').eq(i).val(i);
                    }

                } else if (unique == 'cols'){

                    for (var i=0;i<=$('select').length;i++){
                        $('select').eq(i).val(i);
                    }

                } else{

                    $('select').val($('select option').eq(1).val());

                }
            },


            fillNext: function(){

                this.fillPage();
                this.nextPage();

            },

            nextPage: function(){
                $('input:submit, button:submit').removeAttr('disabled').click();

                //for quotas popups
                $('button.ui-button').click()
            },

            straightLine: function(index){
                var radio;
                index -= 1;
                $('.even, .odd').each(function(){
                    radio = $(this).find('input:radio:eq(' + index + ')');
                    radio.siblings('.fir-icon').length ? radio.siblings('.fir-icon').click() : radio.click();
                });
            },

            toggleRandomization: function(){
                this.disableRandomization();
            },

            disableRandomization: function(){
                javascript:jQuery.fn.sortElements=(function(){
                    var sort=[].sort;
                    return function(comparator,getSortable){
                        getSortable=getSortable||function(){
                            return this;
                        };
                        var placements=this.map(function(){
                            var sortElement=getSortable.call(this),parentNode=sortElement.parentNode,nextSibling=parentNode.insertBefore(document.createTextNode(""),sortElement.nextSibling);
                            return function(){
                                if(parentNode===this){
                                    throw new Error("Cannot disable random rows.");
                                }
                                parentNode.insertBefore(this,nextSibling);
                                parentNode.removeChild(nextSibling);
                            };
                        });
                        return sort.call(this,comparator).each(function(i){
                            placements[i].call(getSortable.call(this));
                        });
                    };
                })();

                if (true){
                    $(".even").add(".odd").sortElements(function(a,b){
                        function isNum(x){
                            return isNaN(x-0);
                        }
                        x=$(a).text().trim().replace("[r","").replace(new RegExp("].*|\n\r*.*","g"),"");
                        y=$(b).text().trim().replace("[r","").replace(new RegExp("].*|\n\r*.*","g"),"");
                        if(isNum(x)){
                            return x>y?1:-1;
                        }
                        else{
                            return parseInt(x)>parseInt(y)?1:-1;
                        }
                    });void(0);
                }
            },

* */