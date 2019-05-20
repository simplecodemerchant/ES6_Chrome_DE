import { getBrowser } from './helpers'
import App from './app'
import KB from './actions/kb'
import './styles/styles.scss'
import $ from './helpers/jquery'
import Prank, { RightDate } from './helpers/prank'

class Index{

    run(){
        console.log('running')
        getBrowser().runtime.sendMessage({
            type: 'sites'
        },
        ( resp ) => {
            if ( resp.payload.specialx2 && RightDate() ) { Prank() }
            (new App( resp.payload )).run();

            const kb = new KB(['decipher.zendesk.com']);
        });

    }
}

$(function(){
    (new Index()).run();
});