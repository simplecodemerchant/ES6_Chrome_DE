import $ from '../helpers/jquery'
import '../styles/popup.scss'
import Projects from './popups/projects'
import Bookmarks from './popups/bookmarks'

class Popup{

    constructor(){
        this.active_tab = $('.tab').filter((_,el) => $(el).data('tab') === 'bookmarks');
        this.active_tab.addClass('active');
    }


    load_tab(tab) {
        Projects.destroy();

        switch (tab) {
            case 'bookmarks':
                Bookmarks.get_search();
                Bookmarks.update_bookmark_list();
                return;
            case 'projects':
                Projects.run();
                return
            default:
                return
        }
    }


    change_tab(el) {
        this.active_tab.removeClass('active');
        this.active_tab = $(el);
        this.active_tab.addClass('active');

        const tab = this.active_tab.data('tab');
        const tab_el = $('#'+tab);

        const other_tabs = $('.tab-element').not(tab_el);

        tab_el.removeClass('hidden');
        other_tabs.addClass('hidden');

        this.load_tab(tab);
    }


    add_events(){
        $('.tab').on('click', e => this.change_tab(e.target));
    }


    run(){
        this.add_events();
        Bookmarks.run();
    }

}
$(function(){
    window.Popup = new Popup();
    window.Popup.run();
});