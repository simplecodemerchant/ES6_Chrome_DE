import $ from '../../helpers/jquery'
import { local } from '../../store'
import getBrowser from '../../helpers/getBrowser'
import ShortCut from '../../actions/shortcuts'

class Projects {
    constructor(){
        this.table = $('#projects').find('table');
        this.browser = getBrowser();
        this.projects = [];
        this.activeMenu = null;
    }

    list_projects(){
        this.table.empty();

        let td, tr;
        this.projects.forEach(item => {
            tr = $('<tr/>');
            td = $('<td/>')
                .addClass('project')
                .data({...item})
                .text(item.title)
                .attr('title', item.survey_path)
                .appendTo(tr);

            this.table.append(tr);
        })
    }

    async get_projects (){
        const projects = await local.get({ projects: [] });
        this.projects = projects.projects;
        this.list_projects();
    }

    menuItem(text, path){
        return $('<div/>')
            .addClass('project-link-items')
            .text(text)
            .data({ path });
    }

    listOfPaths(origin, path){
        return [
            this.menuItem('Report', ShortCut.goToRep2010({ origin, path })),
            this.menuItem('X-Tabs', ShortCut.goToCrosstabs({ origin, path })),
            this.menuItem('Survey', ShortCut.goToSurvey({ origin, path })),
            this.menuItem('Portal', ShortCut.goToPortal({ origin, path })),
        ]
    }

    createProjectMenu({ origin, survey_path }){
        if ( this.activeMenu !== null ){
            this.activeMenu.remove();
        }
        this.activeMenu = $('<div/>')
            .addClass('project-link');

        this.activeMenu.append(this.listOfPaths(origin, survey_path));
        return this.activeMenu;
    }

    handleClick(e){
        const that = $(e.target);
        const options = that.data();

        that.append(this.createProjectMenu(options));

    }

    handleClickProjectLink(e){
        e.stopPropagation();
        const that = $(e.target);
        const option = that.data();

        this.browser.tabs.create({
            active: true,
            url: option.path
        });

    }

    add_events(){
        this.table.on('click', '.project .project-link-items', this.handleClickProjectLink.bind(this));
        this.table.on('click', '.project', this.handleClick.bind(this));
    }

    remove_events(){
        this.table.off('click', '**');
    }

    destroy(){
        this.remove_events()
    }

    run(){
        this.get_projects();
        this.add_events();

    }
}

const projects = new Projects();

export default projects;