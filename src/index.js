import { getBrowser } from './helpers'
import App from './app'
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
        });

    }
}

$(function(){
    (new Index()).run();
});