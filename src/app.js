import { validateSite, qsa, qs } from './helpers'
import acts from './actions/main'
import qb from './actions/quotabuddy'
import exceptions from './actions/exceptions'
import ans from './actions/answers'
import Favorites from './actions/favorites'
import { checkExistence } from './helpers/checkExistence'
import Clips from './clips'


export default class App {
    constructor( options ) {
        this.options = options;

        this.validSite = validateSite(this.options.sites);

        this.run();
    }
    windowResize(){
        const windowHeight     = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        const beforeExpection  = qs('.exceptions .row.search');
        const exception        = qs('.exceptions .row.result pre');
        exception.style.height = (windowHeight - beforeExpection.getBoundingClientRect().bottom - 60 ) + "px";
    }


    static get onQuota() { return window.location.href.indexOf('tab=quota') !== -1 }
    static get onCamp(){ return window.location.href.indexOf('tab=email') !== -1 }
    static get onTerm(){ return window.location.href.indexOf('tab=terminate') !== -1 }
    static get onDrop(){ return window.location.href.indexOf('tab=dropout') !== -1 }
    static get onSurvey(){ return !!qsa('body.survey-page').length }
    static get onXMLEditor(){ return window.location.href.indexOf(':xmledit') !== -1 }
    static get onExcept(){ return !!qsa('div.exceptions').length }
    static get onPortal(){ return window.location.href.indexOf('apps/portal/#/projects/detail') !== -1 }
    static get onDashboard(){ return window.location.href.indexOf('apps/dashboard') !== -1 }

    run(){

        checkExistence('#fv-nav',5,function(){
            new Favorites();
        })

        if ( App.onXMLEditor ){
            return Clips();
        }

        if ( App.onDashboard ) return;

        if ( this.validSite ) {
            acts({
                onSurvey: App.onSurvey
            });
        }

        if ( App.onExcept ){
            this.windowResize();
            exceptions.run();
            window.addEventListener('resize', this.windowResize);
        }

        if ( App.onPortal && this.options.showModal ){
            qs('.title-row').classList.add('always-display');
        }

        const body = qs( 'body' );

        if ( this.validSite && ans.GM_getValue( "question" ) ){
            ans.gotoPage();
        } else if ( this.validSite && qsa( '.devToggle.expanded' ).length ){
            qsa( '.surveyInfo, .survey-info' ).forEach((el) => el.style.display = 'block');

        } else if ( App.onQuota ) {
            body.classList.add( 'quota-page' );
            if ( this.options.special ) body.classList.add( 'shortcut-page-fix' );
            qb.run()

        } else if ( ( App.onCamp || App.onTerm || App.onDrop ) && this.options.special ){
            body.classList.add( 'shortcut-page-fix' );
        }

    }

}
