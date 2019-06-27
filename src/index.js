import { sync as Sync } from "./store";
import App from './app'
import KB from './actions/kb'
import './styles/styles.scss'
import $ from './helpers/jquery'
// import Prank, { RightDate } from './helpers/prank'


const Index = () => {
    console.log('running');

    Sync.init().then(resp => {
        new App( resp );
        new KB( ['decipher.zendesk.com'] );
    });
};

$(function(){
    Index()
});