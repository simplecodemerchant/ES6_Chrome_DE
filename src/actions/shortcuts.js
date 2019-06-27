import { qs, misc } from "../helpers"

class Shortcuts {

    static url_no_host(){
        return window.location.pathname + window.location.search;
    }

    static baseURL(){
        return window.location.protocol + '//' + misc.url_host() + '/';
    }

    static startAtPage() {
        const value = prompt('Which question should I start at?', 'Q');
        if (value) {
            Shortcuts.goTO('survey', `?&start-at=${value}`);
        }
    }

    static goToPage() {
        const value = prompt('Which question should I go to?', 'Q');
        if (value) {
            Shortcuts.goTO('survey', `?&start-at=${value}&stop-at=${value}&debug=flow`);
        }
    }

    static goTO(front, back, options={}) {
        const leading = ( options.leading === undefined || options.leading === true ) ? '/' : '';

        let projectAddress;
        if (options.path){
            projectAddress = options.path;
        } else {
            projectAddress = Shortcuts.getProject();
        }

        if (options.origin){
            return options.origin + '/' + front + leading + projectAddress + back;
        } else {
            window.location.href = Shortcuts.baseURL() + front + leading + projectAddress + back;
        }
    }

    static goToSurvey(options={}){
        return Shortcuts.goTO( 'survey', '?mm', { ...options })
    }
    static goToRep2010(options={}){
        return Shortcuts.goTO('report', '', { ...options })
    }
    static goToPortal(options={}){
        return Shortcuts.goTO('apps/portal/#/projects/detail', '', { ...options })
    }
    static goToQuota(options={}){
        return Shortcuts.goTO('rep', ':dashboard?tab=quota&split=none', { ...options })
    }
    static goToSST(options={}){
        return Shortcuts.goTO('admin/sst/list?survey=', '', { leading: false, ...options })
    }
    static goToUpload(options={}){
        return Shortcuts.goTO('apps/filemanager', '', { ...options })
    }
    static goToVersionHistory(options={}){
        return Shortcuts.goTO('admin/vc/list?file=', '/survey.xml', { leading: false, ...options })
    }
    static goToCrosstabs(options={}){
        return Shortcuts.goTO('apps/report', '', { ...options })
    }
    static goToFlow(options={}){
        return Shortcuts.goTO('survey', '?&debug=flow', { ...options })
    }


    static getProject() {
        let url = Shortcuts.url_no_host(),
            urlback;

        if ( url.match(/(takesurvey\/|survey\/|report\/|rep\/|filemanager\/|dashboard\/)/) ) {
            url     = window.location.protocol + '//' + window.location.host + window.location.pathname;
            urlback = url.split(/\/filemanager|\/report|\/rep|\/survey|\/takesurvey|\/dashboard/)[1];
            urlback = urlback.split('?')[0];
            urlback = urlback.split(':')[0];

            return urlback.replace(/^[\/]+|[\/]+$/, '');;

        } else if ( url.match(/(\/admin\/vc\/list|detail\/|admin\/sst\/list)/) ) {
            url = window.location.href;
            urlback = url.split(/file\=|survey\=|\/detail/)[1];

            if ( url.match(/(\/admin\/vc\/list)/) ) {
                urlback = urlback.substring( 0, urlback.lastIndexOf("/") );
            }

            return urlback.replace(/^[\/]+|[\/]+$/, '');

        } else if ( window.location.href.match( 'projects\/detail' ) ){
            url = window.location.hash;
            urlback = url.split(/projects\/detail/)[1];
            urlback = urlback.split('?')[0];
            urlback = urlback.split(':')[0];

            return urlback.replace(/^[\/]+|[\/]+$/, '');

        }

        return "";
    }

    static getState(){
        prompt('Here\'s your state link', location.protocol + '//' + location.host + location.pathname + '?state=' + qs('[name=state]').value);
    }

}

export default Shortcuts;