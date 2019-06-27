import { getBrowser } from "./helpers";
import produce from 'immer'

const defaultSite = '.*?.decipherinc.com';

const baseState = {
    sites: [],
    special: true,
    specialx2: true,
    showModal: false,
    projects: []
}


class Store {
    constructor(){
        this.store = getBrowser().storage.local;
    }
    get(keys){
        return new Promise(res => {
            this.store.get(keys, resp => {
                res(resp);
            })
        });
    }

    set(d){
        return new Promise(res => {
            this.store.set(d, () => {
                res(true);
            })
        });
    }

    defaults(keys){

        const defaultKeys = {};
        let val;

        // Array
        if (Array.isArray(keys)){

            for (let key of keys){

                defaultKeys[key] = baseState[key] || '';

            }

        // Object
        } else if (typeof keys === 'object'){

            for (let key in keys){
                val = baseState[key];

                if (val === null){

                    defaultKeys[key] = defaultKeys[key] || '';

                } else {

                    defaultKeys[key] = val;

                }

            }

            // String
        } else if (typeof keys === 'string'){

            defaultKeys[keys] = baseState[keys] || '';

        }
        return defaultKeys;
    }

    async add_project(project){

        const current_state = await this.get(this.defaults('projects'));

        return this.set(
            produce(current_state, draft => {
                draft.projects.push(project);
            })
        );

    }

    async remove_project(project){
        const current_state = await this.get(this.defaults('projects'));
;
        return this.set(produce(current_state, draft => {
            draft.projects.splice(draft.projects.findIndex(p => p.survey_path === project), 1);
        }));
    }

    async has_project(project){
        const resp = await this.get(this.defaults('projects'));

        for (let p of resp.projects){
            if (project === p.survey_path){
                return true;
            }
        }
        return false;
    }
}


class Sync extends Store{
    constructor(self){
        super()
        this.store = getBrowser().storage.sync;
    }

    async init(){

        const defaults = this.defaults(['sites', 'special', 'specialx2', 'showModal']);

        const resp =  await this.get(defaults);

        return {
            ...resp,
            sites: this.defaultSite(resp['sites'])
        }
    }
    defaultSite(sites){

        if ( sites.indexOf( defaultSite ) === -1 ){
            sites.push( defaultSite );
        }

        return sites;
    }
}

class Local extends Store{ }


export const sync = new Sync();
export const local = new Local();
