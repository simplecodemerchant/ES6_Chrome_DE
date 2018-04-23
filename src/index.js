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
            console.log(resp);
            const app = new App( resp.payload );
            app.run();
        });

    }
}


const entry = new Index();
entry.run();