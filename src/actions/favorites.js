import $ from 'jquery'
import Shortcuts from './shortcuts'
import { local } from '../store'
import uuid from 'uuid/v1'


export default class Favorites {
    html = $(`<div id="favorite-project"><i class="favorite-icon fa-star fa-icon-star"></i></div>`);

    constructor(){
        this.header = $('#fv-nav').find('.gh-title-support-row');
        this.title  = $('.gh-survey-name').text();
        this.origin = window.location.origin;
        this.survey_path = Shortcuts.getProject();
        this.run()
    }

    addStar(){
        this.header.prepend(this.html);
    }

    add_project(){
        local.add_project({
            id: uuid(),
            origin: this.origin,
            title: this.title,
            survey_path: this.survey_path
        });
    }

    remove_project(){
        local.remove_project(this.survey_path);
    }

    checkStatus(){
        local.has_project(this.survey_path).then(resp =>{
            if (resp){
                this.html.addClass('selected')
            }
        })
    }


    addEvents(){
        const self = this;

        this.html.on('click', function(){
            const that = $(this);
            const selected = that.hasClass('selected');

            if (selected){
                that.removeClass('selected');
                self.remove_project();
            } else {
                that.addClass('selected');
                self.add_project();
            }
        })
    }

    run(){
        this.addStar();
        this.checkStatus();
        this.addEvents();
    }
}