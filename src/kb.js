import { validateSite } from './helpers'
import $ from './helpers/jquery'


export default class KB {
    constructor( sites ) {

        this.validSite = validateSite(sites);
    }
    get onKB(){
        return this.validSite
    }
    run(){
        const container = $('main .article-container');
        console.log(container);
    }

}
