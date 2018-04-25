import KeyBinds from './keybinds'

const escape = () => {
    console.log('escape');
    return false;
};
const escape2 = () => {
    console.log('escape 2');
    return false;
};
const escape3 = () => {
    console.log('escape 3');
    return false;
};
const escape4 = () => {
    console.log('escape 4');
    return false;
};
const escape5 = () => {
    console.log('escape 5');
    return false;
};

export default () => {

    const kb = new KeyBinds([
        { t: ['esc'], f: escape },
        { t: 'shift+a+t', f: escape2 },
        { t: 'ctrl+b+t', f: escape3 },
        { t: 'alt+ctrl+b', f: escape4 },
        { t: 'alt+b', f: escape5 },
    ]);
    const testKeys = kb.testKeys.bind(kb);

    document.addEventListener('keydown', e => testKeys(e) );
    document.addEventListener('keyup', e => testKeys(e) );

}