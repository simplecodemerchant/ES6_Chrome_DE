import { getBrowser } from './helpers'
import App from './app'
import './styles/styles.scss'
import $ from 'jquery'


class Index{

    constructor(){
        this.browser = getBrowser();
    }

    run(){
        this.browser.runtime.sendMessage({
            type: 'sites'
        },
        ( resp ) => {
            (new App( resp.payload )).run();
        });

    }
}

$(function(){
    (new Index()).run();
});