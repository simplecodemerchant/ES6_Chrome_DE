import $ from '../helpers/jquery'
import { url_origin } from '../helpers/misc'

class Exceptions {

    clickable(){
        $('.result-meta .col-xs-6').eq(0).find('.ng-binding').on('click', function(){
            const location = $(this).text();
            window.location.href = `${url_origin()}/apps/portal/#/projects/detail/${location}`;
        });
    }

    run(){
        this.clickable();
    }
}

export default new Exceptions();