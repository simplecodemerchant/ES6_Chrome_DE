import { validateSite, qsa, qs } from './helpers'
import acts from './actions/main'
import qb from './actions/quotabuddy'
import exceptions from './actions/exceptions'
import ans from './actions/answers'


export default class App {
    constructor( options ) {
        this.options = options;

        this.location = {
            onQuota:  App.onQuota(),
            onCamp:   App.onCamp(),
            onTerm:   App.onTerm(),
            onDrop:   App.onDrop(),
            onSurvey: App.onSurvey(),
            onExcept: App.onExcept(),
            onPortal: App.onPortal(),
        };

        this.validSite = validateSite(this.options.sites);
    }
    windowResize(){
        const windowHeight     = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        const beforeExpection  = qs('.exceptions .row.search');
        const exception        = qs('.exceptions .row.result pre');
        exception.style.height = (windowHeight - beforeExpection.getBoundingClientRect().bottom - 60 ) + "px";
    }


    static onQuota() { return window.location.href.indexOf('tab=quota') !== -1 }
    static onCamp(){ return window.location.href.indexOf('tab=email') !== -1 }
    static onTerm(){ return window.location.href.indexOf('tab=terminate') !== -1 }
    static onDrop(){ return window.location.href.indexOf('tab=dropout') !== -1 }
    static onSurvey(){ return !!qsa('body.survey-page').length }
    static onExcept(){ return !!qsa('div.exceptions').length }
    static onPortal(){ return window.location.href.indexOf('apps/portal/#/projects/detail') !== -1 }

    run(){

        if ( this.validSite )   {
            acts();
        }

        if ( this.location.onExcept ){
            this.windowResize();
            exceptions.run();
            window.addEventListener('resize', this.windowResize);
        }

        if ( this.location.onPortal && this.options.showModal ){
            qs('.title-row').classList.add('always-display');
        }

        const body = qs( 'body' );

        if ( this.validSite && ans.GM_getValue( "question" ) ){
            ans.gotoPage();
        } else if ( this.validSite && qsa( '.devToggle.expanded' ).length ){
            qsa( '.surveyInfo, .survey-info' ).forEach((el) => el.style.display = 'block');

        } else if ( this.location.onQuota ) {
            body.classList.add( 'quota-page' );
            if ( this.options.special ) body.classList.add( 'shortcut-page-fix' );
            qb.run()

        } else if ( ( this.location.onCamp || this.location.onTerm || this.location.onDrop ) && this.options.special ){
            body.classList.add( 'shortcut-page-fix' );
        }

    }

}
