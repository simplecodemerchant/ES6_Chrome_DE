import { validateSite } from '../helpers'
import $ from '../helpers/jquery'


export default class KB {
    constructor( sites ) {

        this.validSite = validateSite(sites);

        if (this.onKB){
            this.setup()
        }
    }

    get onKB(){
        return this.validSite
    }
    get topSpace(){
        const containerOffset = $('.article-container').offset();

        return containerOffset.top;
    }
    get sections(){
        const sections = [];
        const mainSections = $('.article-body h2');

        let element;
        mainSections.each((_, el) => {
            element = $(el);
            sections.push({
                text: element.text(),
                target: element.closest('.mt-section')
            })
        })

        return sections;
    }

    get container(){
        return $('main .article-container');
    }

    createJumpBox(){
        const self = this;
        this.jumpBox = $('<div/>', {class: 'jump-box'}).css({
                top: self.topSpace,
                right: '5%'
            });
        $('body').append(this.jumpBox);
    }

    setup(){
        this.createJumpBox()
        this.sections.forEach((el) => {
            this.jumpBox.append($('<a/>', {
                href: `#${el.target.attr('id')}`,
                text: el.text,
                class: 'jb-item'
            }));
        })
    }

    run(){


    }

}
