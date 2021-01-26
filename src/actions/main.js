import KeyBinds from '../helpers/keybinds'
import sc from "./shortcuts"
import QuotaBuddy from './quotabuddy'
import ans from './answers'


export default ({onSurvey}) => {
    let keyBinds = [
        { t: 'esc', f: QuotaBuddy.cancel },

        // Go to Survey without variables
        { t: 'alt+t', f: sc.goToSurvey },

        // Go to question in the survey (does not ignore conditions)
        { t: 'alt+s', f: sc.startAtPage },

        // Go to question in the survey (ignores conditions)
        { t: 'alt+h', f: sc.goToPage },

        // Edit quotas if on quota page
        // { t: 'alt+e', f: console.log.bind(null, 'e') },

        // Go to report 2010
        { t: 'alt+r', f: sc.goToRep2010 },

        // Go to survey portal page
        { t: 'alt+p', f: sc.goToPortal },

        // Go to survey quota page
        { t: 'alt+q', f: sc.goToQuota },

        // Go to survey sst page
        { t: 'alt+w', f: sc.goToSST },

        // Go to survey upload manager
        { t: 'alt+u', f: sc.goToUpload },

        // Go to survey version history
        { t: 'alt+v', f: sc.goToVersionHistory },

        // Go to crosstabs
        { t: 'alt+c', f: sc.goToCrosstabs },

        // Set the survey to flow mode
        { t: 'alt+f', f: sc.goToFlow },
    ]
    
    if (onSurvey){
        keyBinds = [ 
            { t: 'ctrl+alt+s', f: sc.getState },

            { t: 'shift+right', f: ans.fillNext.bind(ans) },
            { t: 'shift+down', f: ans.fillPage.bind(ans) },
            { t: 'shift+up', f: ans.nextPage.bind(ans) },

            { t: 'alt+1', f: ans.straightLine.bind(ans,1) },
            { t: 'alt+2', f: ans.straightLine.bind(ans,2) },
            { t: 'alt+3', f: ans.straightLine.bind(ans,3) },
            { t: 'alt+4', f: ans.straightLine.bind(ans,4) },
            { t: 'alt+5', f: ans.straightLine.bind(ans,5) },
            { t: 'alt+6', f: ans.straightLine.bind(ans,6) },
            { t: 'alt+7', f: ans.straightLine.bind(ans,7) },
            { t: 'alt+8', f: ans.straightLine.bind(ans,8) },
            { t: 'alt+9', f: ans.straightLine.bind(ans,9) },

            { t: 'alt+d', f: ans.disableRandomization.bind(ans) },
            { t: 'alt+g', f: ans.AutoMate.bind(ans) },
            ...keyBinds,
        ]
    }
    const kb = new KeyBinds(keyBinds);
    const testKeys = kb.testKeys.bind(kb);

    document.addEventListener('keydown', e => testKeys(e) );
    document.addEventListener('keyup', e => testKeys(e) );

}