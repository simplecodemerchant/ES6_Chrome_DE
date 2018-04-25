import { validateSite, qsa, qs } from './helpers'
import acts from './actions/main'

export default class App {
    constructor( payload ) {
        this.options = payload;

        this.location = {
            onQuota:  (window.location.href.indexOf('tab=quota') !== -1),
            onCamp:   (window.location.href.indexOf('tab=email') !== -1),
            onTerm:   (window.location.href.indexOf('tab=terminate') !== -1),
            onDrop:   (window.location.href.indexOf('tab=dropout') !== -1),
            onSurvey: (!!qsa('body.survey-page').length),
            onExcept: (!!qsa('div.exceptions').length),
            onPortal: (window.location.href.indexOf('apps/portal/#/projects/detail') !== -1),
        };

        this.validSite = validateSite(this.options.sites);
    }
    windowResize(){
        const windowHeight     = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        const beforeExpection  = qs('.exceptions .row.search');
        const exception        = qs('.exceptions .row.result pre');
        exception.style.height = (windowHeight - beforeExpection.getBoundingClientRect().bottom - 60 ) + "px";
    }

    run(){

        if ( this.validSite )   {
            acts();
        }

        if ( this.location.onExcept ){
            this.windowResize();
            window.addEventListener('resize', this.windowResize);
        }

        if ( this.onPortal && this.options.showModal ){
            document.querySelector('.title-row').classList.add('always-display');
        }

        const body = qs( 'body' );

        //todo
        // if ( this.validSite && afm.GM_getValue( "question" ) ){
        if ( this.validSite && false){
            // todo
            // afm.gotoPage();

        } else if ( this.validSite && qsa( '.devToggle.expanded' ).length ){
            qsa( '.surveyInfo, .survey-info' ).forEach((el) => el.style.display = 'block');

        } else if ( this.location.onQuota ) {
            body.classList.add( 'quota-page' );
            if ( this.options.special ) body.classList.add( 'shortcut-page-fix' );
            //todo
            // var qb = QuotaBuddy;
            // qb.init();

        } else if ( ( this.location.onCamp || this.location.onTerm || this.location.onDrop ) && this.options.special ){
            body.classList.add( 'shortcut-page-fix' );
        }

        function escape() {
            if ( this.location.onQuota ) {
                // todo
                // qb.cancel()
            }
        }

    }

}
