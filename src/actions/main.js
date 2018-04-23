import KeyBinds from './keybinds'

const escape = () => {
    console.log('escape');
    return false;
};
const escape2 = () => {
    console.log('escape 2');
    return false;
};

export default () => {

    const kb = new KeyBinds([
        { t: ['esc'], f: escape },
        { t: 'shift+a+t', f: escape },
        { t: 'ctrl+b+t', f: escape },
    ]);
    const testKeys = kb.testKeys.bind(kb);

    document.addEventListener('keydown', (e) => testKeys(e) );
    document.addEventListener('keyup', (e) => testKeys(e) );

    // function keyFunctions(e) {
    //
    //     if (e.keyCode === 27) {
    //         escape();
    //     }
    //     if (onPage) {
    //         if (e.ctrlKey && e.shiftKey && e.altKey && e.metaKey) {
    //         }
    //         else if (e.ctrlKey && e.shiftKey && e.altKey) {
    //         }
    //         else if (e.ctrlKey && e.altKey) {
    //             if (kb.test_keys('s')) {
    //                 kb.foundMatch(sc.getState.bind(sc), {ev: e, cond: onSurvey});
    //             }
    //         }
    //         else if (e.ctrlKey && e.shiftKey) {
    //         }
    //         else if (e.shiftKey && e.altKey) {
    //         }
    //         else if (e.shiftKey) {
    //             if (kb.test_keys('right')) {
    //                 kb.foundMatch(afm.fillNext.bind(afm), {ev: e, cond: onSurvey});
    //             }
    //             else if (kb.test_keys('down')) {
    //                 kb.foundMatch(afm.fillPage.bind(afm), {ev: e, cond: onSurvey});
    //             }
    //             else if (kb.test_keys('up')) {
    //                 kb.foundMatch(afm.nextPage.bind(afm), {ev: e, cond: onSurvey});
    //             }
    //         }
    //         else if (e.ctrlKey) {
    //         }
    //         else if (e.altKey) {
    //             // Straight line a question
    //             if (kb.test_keys('1')) {
    //                 kb.foundMatch(afm.straightLine.bind(afm, 1), {ev: e, cond: onSurvey});
    //             }
    //             else if (kb.test_keys('2')) {
    //                 kb.foundMatch(afm.straightLine.bind(afm, 2), {ev: e, cond: onSurvey});
    //             }
    //             else if (kb.test_keys('3')) {
    //                 kb.foundMatch(afm.straightLine.bind(afm, 3), {ev: e, cond: onSurvey});
    //             }
    //             else if (kb.test_keys('4')) {
    //                 kb.foundMatch(afm.straightLine.bind(afm, 4), {ev: e, cond: onSurvey});
    //             }
    //             else if (kb.test_keys('5')) {
    //                 kb.foundMatch(afm.straightLine.bind(afm, 5), {ev: e, cond: onSurvey});
    //             }
    //             else if (kb.test_keys('6')) {
    //                 kb.foundMatch(afm.straightLine.bind(afm, 6), {ev: e, cond: onSurvey});
    //             }
    //             else if (kb.test_keys('7')) {
    //                 kb.foundMatch(afm.straightLine.bind(afm, 7), {ev: e, cond: onSurvey});
    //             }
    //             else if (kb.test_keys('8')) {
    //                 kb.foundMatch(afm.straightLine.bind(afm, 8), {ev: e, cond: onSurvey});
    //             }
    //             else if (kb.test_keys('9')) {
    //                 kb.foundMatch(afm.straightLine.bind(afm, 9), {ev: e, cond: onSurvey});
    //             }
    //             // Derandomize rows
    //             else if (kb.test_keys('d')) {
    //                 kb.foundMatch(afm.toggleRandomization.bind(afm), {ev: e, cond: onSurvey});
    //             }
    //             // Does the survey for you up until the question you enter
    //             else if (kb.test_keys('g')) {
    //                 kb.foundMatch(afm.AutoMate.bind(afm), {ev: e, cond: onSurvey});
    //             }
    //             // Go to survey start ( no variables )
    //             else if (kb.test_keys('t')) {
    //                 kb.foundMatch(sc.goTO.bind(sc, 'survey', '?mm'), {ev: e});
    //             }
    //             // Go to question in the survey (does not ignore conditions)
    //             else if (kb.test_keys('s')) {
    //                 kb.foundMatch(sc.startAtPage.bind(sc), {ev: e});
    //             }
    //             // Go to question in the survey (ignores conditions)
    //             else if (kb.test_keys('h')) {
    //                 kb.foundMatch(sc.goToPage.bind(sc), {ev: e});
    //             }
    //             // Edit quotas if on quota page
    //             else if (kb.test_keys('e')) {
    //                 kb.foundMatch(sc.edit.bind(sc), {ev: e});
    //             }
    //             // Go to report 2010
    //             else if (kb.test_keys('r')) {
    //                 kb.foundMatch(sc.goTO.bind(sc, 'report', ''), {ev: e});
    //             }
    //             // Go to survey portal page
    //             else if (kb.test_keys('p')) {
    //                 kb.foundMatch(sc.goTO.bind(sc, 'apps/portal/#/projects/detail', ''), {ev: e});
    //             }
    //             // Go to survey quota page
    //             else if (kb.test_keys('q')) {
    //                 kb.foundMatch(sc.goTO.bind(sc, 'rep', ':dashboard?tab=quota&split=none'), {ev: e});
    //             }
    //             // Go to survey sst page
    //             else if (kb.test_keys('w')) {
    //                 kb.foundMatch(sc.goTO.bind(sc, 'admin/sst/list?survey=', '', false), {ev: e});
    //             }
    //             // Go to survey upload manager
    //             else if (kb.test_keys('u')) {
    //                 kb.foundMatch(sc.goTO.bind(sc, 'apps/filemanager', ''), {ev: e});
    //             }
    //             // Go to survey version history
    //             else if (kb.test_keys('v')) {
    //                 kb.foundMatch(sc.goTO.bind(sc, 'admin/vc/list?file=', '/survey.xml', false), {ev: e});
    //             }
    //             // Go to crosstabs
    //             else if (kb.test_keys('c')) {
    //                 kb.foundMatch(sc.goTO.bind(sc, 'apps/report', ''), {ev: e});
    //             }
    //             // Set the survey to flow mode
    //             else if (kb.test_keys('f')) {
    //                 kb.foundMatch(sc.goTO.bind(sc, 'survey', '?&debug=flow'), {ev: e});
    //             }
    //         }
    //     }
}