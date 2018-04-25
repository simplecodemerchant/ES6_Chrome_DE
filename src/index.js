import { getBrowser } from './helpers'
import App from './app'
import './styles/styles.scss'

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


const entry = new Index();
entry.run();