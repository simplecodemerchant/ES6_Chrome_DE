import KeyBinds from '../helpers/keybinds'
import sc from "./shortcuts"
import QuotaBuddy from './quotabuddy'
import Answers from './answers'


export default () => {

    const kb = new KeyBinds([
        { t: 'esc', f: QuotaBuddy.cancel },
        
        { t: 'ctrl+alt+s', f: sc.getState },

        { t: 'shift+right', f: console.log.bind(null, 'right') },
        { t: 'shift+down', f: console.log.bind(null, 'down') },
        { t: 'shift+up', f: console.log.bind(null, 'up') },

        { t: 'alt+1', f: console.log.bind(null, '1') },
        { t: 'alt+2', f: console.log.bind(null, '2') },
        { t: 'alt+3', f: console.log.bind(null, '3') },
        { t: 'alt+4', f: console.log.bind(null, '4') },
        { t: 'alt+5', f: console.log.bind(null, '5') },
        { t: 'alt+6', f: console.log.bind(null, '6') },
        { t: 'alt+7', f: console.log.bind(null, '7') },
        { t: 'alt+8', f: console.log.bind(null, '8') },
        { t: 'alt+9', f: console.log.bind(null, '9') },

        { t: 'alt+d', f: console.log.bind(null, 'd') },
        { t: 'alt+g', f: console.log.bind(null, 'g') },

        // Go to Survey without variables
        { t: 'alt+t', f: sc.goTO.bind(sc, 'survey', '?mm') },

        // Go to question in the survey (does not ignore conditions)
        { t: 'alt+s', f: sc.startAtPage.bind(sc) },

        // Go to question in the survey (ignores conditions)
        { t: 'alt+h', f: sc.goToPage.bind(sc) },

        // Edit quotas if on quota page
        { t: 'alt+e', f: console.log.bind(null, 'e') },

        // Go to report 2010
        { t: 'alt+r', f: sc.goTO.bind(sc, 'report', '') },

        // Go to survey portal page
        { t: 'alt+p', f: sc.goTO.bind(sc, 'apps/portal/#/projects/detail', '') },

        // Go to survey quota page
        { t: 'alt+q', f: sc.goTO.bind(sc, 'rep', ':dashboard?tab=quota&split=none') },

        // Go to survey sst page
        { t: 'alt+w', f: sc.goTO.bind(sc, 'admin/sst/list?survey=', '', false) },

        // Go to survey upload manager
        { t: 'alt+u', f: sc.goTO.bind(sc, 'apps/filemanager', '') },

        // Go to survey version history
        { t: 'alt+v', f: sc.goTO.bind(sc, 'admin/vc/list?file=', '/survey.xml', false) },

        // Go to crosstabs
        { t: 'alt+c', f: sc.goTO.bind(sc, 'apps/report', '') },

        // Set the survey to flow mode
        { t: 'alt+f', f: sc.goTO.bind(sc, 'survey', '?&debug=flow') },
    ]);
    const testKeys = kb.testKeys.bind(kb);

    document.addEventListener('keydown', e => testKeys(e) );
    document.addEventListener('keyup', e => testKeys(e) );

}