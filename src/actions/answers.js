import { qs, qsa, tqs, tqsa, gid, getPrev, q } from "../helpers"
import $ from 'jquery'

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
    getQACode( that ) {
        let codes = {
            'ATM': '',
            'ATL': '',
            'MRA': '',
            'AMT': '',
            'UNI': '',
            'EX':  '',
            'VRF': ''
        };

        that.prev('.qaTab').find('sup.qaCode span').each(function(){
            const text = $(this).text();
            let [label, value] = text.split(':');

            if ( codes.hasOwnProperty( label ) ){

                if ( label === 'VRF' ){
                    if ( value !== 'zipcode' ){
                        if ( value.length ){
                            value = value.replace(/range\((\d+),(\d+)\)/g, '$1 $2').split(' ').map(d => parseInt(d));
                        } else {
                            value = [ 0, 10 ];
                        }
                    }
                }

                if ( label === 'UNI' ){
                    value = value.split(',');
                }
                if ( ['ATM','ATL','MRA','AMT','EX'].indexOf(label) !== -1 ){
                    value = parseInt(value);
                }
                codes[label] = value;
            }

        });

        return codes;

    }

    // Unused. Why did I add this
    range( s, e ){
        return Array.from(Array((e-s+1)), (_,x) => x + s);
    }

    fillPage(){
        const self = this;
        // todo make this run per question on page.
        // Only fill dev questions if there is a term
        if ( $('.devContainer').length ){
            if ( $('input:radio:checked').nextAll('.qaCode').has('span:contains("TERM")').length ){
                this.fillRadio();
            }
            return;
        }

        $('.question, .surveyQuestion').not('.survey-q-question').each(function(){

            const question = $(this);

            const {
                AMT,
                ATL,
                MRA,
                ATM,
                UNI,
                VRF,
                EX
            } = self.getQACode( question );

            self.fillText(question)
            self.fillNumber(question, AMT,VRF)
            self.fillFloat(question)
            self.fillCheckBox(question, ATL, ATM, EX)
            self.fillSelect(question, MRA, UNI)
            self.fillRadio(question)
            self.fillTextArea(question)
            self.fillOpenSpecify(question)
        });

    }

    fillText(){

        const text = $('.text').find(".element input:text");
        if ( text.length ){
            let textstr, that;

            text.each(function() {
                that = $(this);
                textstr = that.closest('tr').find('td').text();

                if ( textstr.match(/e-?mail/gi) ){
                    that.val('test@email.com').trigger('change');
                }
                else if ( textstr.match(/phone/gi) ){
                    that.val('5555555555').trigger('change');
                }
                else{
                    that.val(93612).trigger('change');
                }
            });

        }
    }

    //Currently only works for selects
    fillOpenSpecify(){

        const text = $("input:text");
        if ( text.length ){
            let select;

            text.each(function() {
                select = $(this).closest('tr').find('td select');
                if ( select.length && select.val() !== -1 ){
                    $(this).val(93612).trigger('change');
                }
            });
        }
    }

    fillNumber(amount,range){
        const self = this;

        if ( amount ){

            const numbers = $('.number tr:has(input:text), .number tr:has(input[type="tel"])');
            if ( !numbers.length ){
                return false;
            }

            let count      = numbers.length;
            let newamount  = Math.floor( amount / count );
            let lastamount = newamount + ( amount - ( newamount*count ) );
            let num_el;

            if ( $(".groupingRows").length ){

                numbers.each(function(){

                    num_el = $(this).find('.element input:text, .element input[type="tel"]');

                    count = num_el.length;
                    newamount = Math.floor( amount / count );
                    lastamount = newamount + ( amount - ( newamount * count ) );

                    for ( let i=0; i<count; i++ ){

                        if ( i === ( count - 1 ) ){
                            num_el.eq(i).val(lastamount).trigger('change');
                        } else{
                            num_el.eq(i).val(newamount).trigger('change');
                        }

                    }
                });
            }
            else{

                for ( let i=0; i<count; i++ ){

                    numbers.eq(i).find('.row-legend input:text, .row-legend input[type="tel"]').val(lastamount).trigger('change');

                    if ( i === ( count-1 ) ){
                        numbers.eq(i).find('.element input:text, .element input[type="tel"]').val(lastamount).trigger('change');
                    }
                    else{
                        numbers.eq(i).find('.element input:text, .element input[type="tel"]').val(newamount).trigger('change');
                    }

                }
            }

        }
        else{

            const numbers = $(".number").find('input:text, input[type="tel"]');
            if ( numbers.length ){

                const qtext = $('.survey-q-question-text, .question-text').text();
                if ( numbers.length === 1 && qtext.match(/(age|old are you)/gi) ){
                    numbers.val('33').trigger('change');
                } else {
                    numbers.each(function() {
                        $(this).val( self.getRandomInt(range[0],range[1]) ).trigger('change');
                    });
                }
            }
        }

    }

    fillFloat(){
        const float = $(".float input:text");

        if ( !float.length ){
            return false;
        }
        float.val(10).trigger('change');
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    fillOE(tr){
        const text = tr.find("input:text");
        if ( text.length ){
            text.each(function() {
                $(this).val(93612).trigger('change');
            });
        }
    }

    fillTextArea(){
        const textarea = $('textarea');
        if ( textarea.length ){
            textarea.val('Autofill');
        }
    }

    fillRadio(){
        const self = this;
        const tableheaders = $('.col-legend, .survey-q-grid-collegend');

        const ans = $('.answers');

        ans.each(function(){
            const tr = $(this).find(".even:has('input:radio'), .odd:has('input:radio')");

            tr.find("input:radio").prop('checked', false).trigger('change');

            if ( tableheaders.length ){

                const badheaders = tableheaders.has("span:contains('TERM')").map(function(){
                    return tableheaders.index( $(this) );
                });


                tr.each(function(){

                    self.fillOE( $(this) );

                    let radio = $(this).find("input:radio");
                    if ( badheaders.length && ( badheaders.length !== radio.length ) ){
                        radio = radio.filter( function(i) {
                            return badheaders.index(i) === -1;
                        });
                    }

                    radio = radio.eq( Math.floor(Math.random()*radio.length));
                    radio.siblings('.fir-icon').length ? radio.siblings('.fir-icon').click() : radio.click();

                });
            } else{

                const allterms = tr.has("span:contains('TERM')").not(tr.has("input:text"));
                const notterms = allterms.has("span[title*='not']");
                const noterms = tr.not(tr.has("span:contains('TERM')")).not(tr.has("input:text"));
                let rows = noterms;

                if ( notterms.length ){
                    rows = notterms;
                }

                if ( rows.length ) {
                    let radio = rows.eq(Math.floor(Math.random()*rows.length)).find('input:radio');
                    radio.siblings('.fir-icon').length ? radio.siblings('.fir-icon').click() : radio.click();
                }
            }
        });
    }

    shuffleArray(arr){
        return arr.sort(function() { return 0.5 - Math.random() });
    }


    fillCheckBox(atleast=1, atmost=atleast, exactly){
        const self = this;

        if ( exactly ){
            atleast = atmost = exactly;
        }

        $('.answers').each(function(){
            const tr = $(this).find(".even, .odd");
            tr.find("input:checkbox:checked").click();

            const allCheckbox = tr.has("input:checkbox");

            const allterms = allCheckbox.has("span:contains('TERM')");
            const notTerms = allterms.has("span[title*='not']");
            const notTermsnotNoAnswers = notTerms.not(notTerms.find(".naRow, .no-answer"));
            let trs = allCheckbox.not(allCheckbox.has("span:contains('TERM')"));
            const notNoAnswers = trs.not(allCheckbox.has(".naRow, .no-answer"));


            if ( notTermsnotNoAnswers.length ){
                trs = notTermsnotNoAnswers;
            }else if ( notTerms.length ){
                trs = notTerms;
            }else{
                trs = notNoAnswers;
            }


            notexclusive = trs.has('input:checkbox:not(.exclusive)');

            if ( notexclusive.length ){
                trs = notexclusive;
            }


            const tableheaders = $('.survey-q-grid-collegend, .col-legend');
            if ( tableheaders.length ){
                const colError = $('.col-legend.hasError');

                // todo: Need to test this. Seem like it shouldn't work
                if ( $("h3.survey-q-error-text:contains('in this column')").length || ( ( colError.length !== $('.col-legend').length ) && colError.length ) ){
                    for ( let i=0; i<atmost; i++ ){
                        trs.eq(i).each(function(){
                            self.fillOE($(this));
                            $(this).find("input:checkbox").click();
                        });
                    }
                }else{
                    trs.each(function(){
                        self.fillOE($(this));
                        for ( let i=0; i<atmost; i++ ){
                            $(this).find("input:checkbox").eq(i).click();
                        }
                    });
                }

            }
            else{
                trs = self.shuffleArray(trs);
                for ( let i=0; i<atmost; i++ ){
                    trs.eq(i).each(function(){

                        self.fillOE($(this));
                        $(this).find("input:checkbox").click();
                    });
                }
            }
        });
    }

    fillSelect(maxranks, unique){
        const select = $('select');

        if ( maxranks ){
            for ( let i=0; i<=maxranks; i++ ){
                select.eq(i).val(i);
            }

        } else if ( unique === 'cols' ){

            for ( let i=0; i<=select.length; i++){
                select.eq(i).val(i);
            }

        } else{
            select.val($('select option').eq(1).val());
        }
    }

    fillNext(){

        this.fillPage();
        this.nextPage();

    }

    nextPage(){
        $('input:submit, button:submit').removeAttr('disabled').click();

        //for quotas popups
        $('button.ui-button').click()
    }

    straightLine(index){
        let radio;
        index -= 1;
        $('.even, .odd').each(function(){
            radio = $(this).find('input:radio').eq(index);
            radio.siblings('.fir-icon').length ? radio.siblings('.fir-icon').click() : radio.click();
        });
    }

    toggleRandomization(){
        this.disableRandomization();
    }

    disableRandomization(){

        function isNum(x){
            return isNaN(x-0);
        }
        let rows = $('.even, .odd');
        const parent = rows.parent();

        rows = rows.sort(function(a,b){
            let x = $(a).find('.qaCode').text().trim().replace("[r","").replace(/].*|\n\r*.*/g, '');
            let y = $(b).find('.qaCode').text().trim().replace("[r","").replace(/].*|\n\r*.*/g, '');

            return parseInt(x) > parseInt(y) ? 1 : -1;
        });

        parent.append(rows);

    }


}

export default new Answers()


