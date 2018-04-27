import { qs, misc } from "../helpers"

class Shortcuts {

    url_no_host(){
        return window.location.pathname + window.location.search;
    }

    baseURL(){
        return window.location.protocol + '//' + misc.url_host() + '/';
    }

    startAtPage() {
        const value = prompt('Which question should I start at?', 'Q');
        if (value) {
            this.goTO('survey', `?&start-at=${value}`);
        }
    }

    goToPage() {
        const value = prompt('Which question should I go to?', 'Q');
        if (value) {
            this.goTO('survey', `?&start-at=${value}&stop-at=${value}&debug=flow`);
        }
    }

    goTO(front, back, leading) {
        leading = (leading === undefined || leading === true) ? '/' : '';
        const projectAddress = this.getProject();

        if (projectAddress) {
            const url = this.baseURL() + front + leading + projectAddress + back;
            window.location.href = url;
        }
    }

    getProject() {
        let url = this.url_no_host(),
            urlback;

        if ( url.match(/(takesurvey\/|survey\/|report\/|rep\/|filemanager\/)/) ) {
            url     = window.location.protocol + '//' + window.location.host + window.location.pathname;
            urlback = url.split(/\/filemanager|\/report|\/rep|\/survey|\/takesurvey/)[1];
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

    getState(){
        prompt('Here\'s your state link', location.protocol + '//' + location.host + location.pathname + '?state=' + qs('[name=state]').value);
    }



    run(){

    }
}


const shortcuts = new Shortcuts();
shortcuts.run();

export default shortcuts;