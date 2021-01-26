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

    get allSections(){
        return $('.mt-section');
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

        this.sections.forEach((el) => {
            this.jumpBox.append($('<a/>', {
                href: `#${el.target.attr('id')}`,
                text: el.text,
                class: 'jb-item'
            }));
        })
    }

    createDirectClick(){
        const clickFunction = function(e){
            e.stopPropagation();

            const id = $(this).closest('.mt-section').attr('id');
            const { origin, pathname } = window.location;

            window.location.href = `${origin}${pathname}#${id}`;
        }

        this.allSections.on('click', 'h2', clickFunction);
        this.allSections.on('click', 'h3', clickFunction);
        this.allSections.on('click', 'h4', clickFunction);
    }

    setup(){
        this.createJumpBox();
        this.createDirectClick();
    }

}
